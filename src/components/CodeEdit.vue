<template>
  <div>
    <div style="width: 100%">
      <codemirror v-model="code" :options="cmOptions" @ready="onCmReady" class="code_edit" />
    </div>
    <el-tag
      v-if="result === 2"
      class="tag"
      type="success"
      v-loading="loading"
      element-loading-text
      element-loading-spinner="el-icon-loading"
    >ACCEPT</el-tag>
    <el-tag
      v-else-if="result === 3"
      class="tag"
      type="danger"
      v-loading="loading"
      element-loading-text
      element-loading-spinner="el-icon-loading"
    >WRONG ANSWER</el-tag>
    <el-tag
      v-else
      class="tag"
      color="white"
      v-loading="loading"
      element-loading-text
      element-loading-spinner="el-icon-loading"
    ></el-tag>
    <div class="submit">
      <el-button
        type="info"
        @click="handleDetail"
        plain
        size="medium"
        :disabled="disabledDetail"
      >查看详情</el-button>
      <el-button
        type="info"
        @click="handleRun"
        size="medium"
        :disabled="!(status == 0) || disabledRun"
      >提交运行</el-button>
    </div>
  </div>
</template>
<script>
// interfaceCode
// import CodeMirror from "codemirror";
import { codemirror } from "vue-codemirror";
import problem from "../api/problem";

// hightlight
import "codemirror/mode/sql/sql";
// show hint needed
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/show-hint";

// import theme style
import "codemirror/theme/3024-night.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/addon/hint/show-hint.css";

export default {
  name: "codeEdit",
  components: {
    codemirror
  },
  props: ["problemId", "groupId", "title", "status"],
  data() {
    return {
      code: "",
      cmOptions: {
        tabSize: 2,
        lineNumbers: true,
        line: true,
        indentWithTabs: true,
        smartIndent: true,
        autofocus: false,
        mode: "sql",
        theme: "erlang-dark",
        hintOptions: {
          completeSingle: false
        }
      },
      result: 0, // ACCEPT:2，WRONG:3
      runId: 0,
      loading: false,
      disabledRun: false,
      disabledDetail: false
    };
  },
  methods: {
    onCmReady(cm) {
      cm.on("keypress", () => {
        cm.showHint();
      });
    },
    handleRun() {
      // 传递提交的 code 给父组件处理
      // this.$emit("submit", this.code);
      let self = this;
      if (self.code == "") {
        self.$message({
          type: "error",
          message: "不能提交空代码"
        });
        return;
      }
      problem
        .submitProblem({
          group_id: parseInt(self.groupId),
          problem_id: self.problemId,
          submit: self.code
        })
        .then(
          res => {
            console.log(res);
            if (res.code === 0 && res.data) {
              self.runId = res.data.run_id;
              // 设置为运行中状态
              self.loading = true;
              // 禁止按钮行为
              self.disabledRun = true;
              self.disabledDetail = true;
              // 获取提交结果
              self.getStatus();
            } else if (res.code === 20007) {
              self.$message({
                type: "error",
                message: "你提交次数过多，请稍后重试"
              });
            }
          },
          error => {
            console.log(error);
          }
        )
        .catch(error => {
          console.log("catch error");
        });
    },
    handleDetail() {
      this.$router.push({
        path: `/experiment/problem/detail/${this.problemId}`,
        query: { groupId: this.groupId, title: this.title }
      });
    },
    getStatus() {
      let self = this;
      console.log(self.runId, "get status");
      problem.getStatueOfSubmit(self.runId).then(
        res => {
          if (res.code === 0 && res.data) {
            self.result = res.data.status;
            if (self.result === 1) {
              // 运行中，隔 2s 再次请求
              setTimeout(() => {
                self.getStatus();
              }, 2000);
            } else {
              self.loading = false;
              self.disabledDetail = false;
              self.disabledRun = false;
            }
          } else {
            console.log("请求出错");
          }
        },
        error => {
          console.log(error);
          self.$message({
            type: "error",
            message: "服务出错"
          });
        }
      );
    }
  }
};
</script>
<style lang="less">
@import "~codemirror/lib/codemirror.css";
.CodeMirror-line {
  text-align: left;
}
.submit {
  margin-top: 5px;
  float: right;
}
.tag {
  margin-top: 5px;
  float: left;
  width: 55%;
}
.CodeMirror {
  height: 650px;
  border: 1px solid #eee;
}
</style>
