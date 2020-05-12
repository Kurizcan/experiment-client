<template>
  <div v-loading="loading">
    <h1 style="text-align:left">1. 上传题目信息:</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="题目名称" style="margin-top:10px">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="题目描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="标准答案">
        <el-input type="textarea" v-model="form.solution"></el-input>
      </el-form-item>

      <el-tag type="success">
        <span>
          <h4>
            提示：输入前请参考样例：
            <el-link
              type="primary"
              style="font-size:15px"
              href="https://github.com/Kurizcan/experiment-client/blob/master/example.md"
              target="_blank"
            >输入输出样例</el-link>，请输入 json 数据，并且字段必须使用双引号，为了保证数据格式的正确，可以在此进行格式化：
            <el-link type="primary" href="https://www.json.cn/" target="_blank">https://www.json.cn/</el-link>
          </h4>
        </span>
      </el-tag>

      <el-form-item label="表格样例">
        <editor ref="example"></editor>
      </el-form-item>
      <el-form-item label="输出样例">
        <editor ref="output"></editor>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>-->
    </el-form>

    <el-divider></el-divider>
    <h1 style="text-align:left">2. 上传数据源:</h1>
    <el-upload
      class="upload-demo"
      drag
      action="123"
      :before-upload="beforeUpload"
      name="data"
      style="margin-top:30px"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传 sql 文件</div>
    </el-upload>

    <el-divider></el-divider>
    <el-row>
      <el-col :span="4">
        <h2 style="text-align:left; font-size:25px">3. 发布题目：</h2>
      </el-col>
      <el-col :span="20">
        <el-button
          type="success"
          style="float:left; margin-bottom: 0px"
          size="middle"
          @click="onSubmit"
        >点击发布</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import editor from "../components/Edit";
import problemHandler from "../api/problem";
import { baseURL } from "../config";
export default {
  components: {
    editor
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
        solution: ""
      },
      params: new FormData(),
      loading: false
    };
  },
  methods: {
    onSubmit() {
      if (
        this.form.title == "" ||
        this.form.description == "" ||
        this.form.solution == "" ||
        this.$refs.example.code == "" ||
        this.$refs.output.code == "" ||
        !this.params.has("data")
      ) {
        this.$message({
          type: "error",
          message: "请按照步骤完善信息后再提交"
        });
        return;
      }
      var exampleJson;
      var outputJson;
      try {
        exampleJson = JSON.parse(this.$refs.example.code);
        outputJson = JSON.parse(this.$refs.output.code);
      } catch (e) {
        console.log("Caught:" + e.message);
        this.$message({
          type: "error",
          message: "请检查输入输出例子的 json 格式数据是否正确"
        });
        return;
      }

      console.log(exampleJson);
      console.log(outputJson);
      console.log(this.params.get("data"));

      let self = this;
      self.loading = true;
      problemHandler
        .uploadProblem({
          title: self.form.title,
          description: self.form.description,
          example: exampleJson,
          output: outputJson,
          solution: self.form.solution
        })
        .then(
          res => {
            console.log(res);
            if (res.code === 0 && res.data) {
              // 上传数据源
              self.uploadData(self, res.data.problemId, self.params);
            } else {
              self.loading = false;
              self.$message({
                type: "error",
                message: "上传题目信息失败，请检查数据格式是否正确，稍后重试"
              });
            }
          },
          error => {
            self.loading = false;
            self.$message({
              type: "error",
              message: "上传题目信息失败，请检查数据格式是否正确，稍后重试"
            });
          }
        );
    },
    beforeUpload(file) {
      let params = new FormData();
      params.append("data", file);
      console.log(params.get("data"));
      this.params = params;
    },
    uploadData(self, problemId, data) {
      problemHandler.uploadDataSource(problemId, data).then(
        res => {
          if (res.code === 0) {
            self.loading = false;
            self.$message({
              type: "success",
              message: "上传成功"
            });
          } else {
            self.loading = false;
            self.$message({
              type: "error",
              message: "上传失败，请检查数据后重试"
            });
          }
        },
        error => {
          self.loading = false;
          self.$message({
            type: "error",
            message: "上传失败，请联系客服"
          });
        }
      );
    }
  }
};
</script>
