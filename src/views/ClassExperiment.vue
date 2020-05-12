<template>
  <div v-loading="loading">
    <div slot="header" style="margin-top:10px">
      <h1>{{ grade }}级{{ major }}{{ classNumber }}班 - 实验：{{ groupName }}</h1>
    </div>
    <el-card class="card">
      <el-table :data="realList" style="width: 100%" align="center">
        <el-table-column prop="number" label="学号" width="300"></el-table-column>
        <el-table-column prop="name" label="姓名" width="300"></el-table-column>
        <el-table-column prop="score" label="得分" width="300"></el-table-column>
        <el-table-column type="expand" label="详情">
          <template slot-scope="props">
            <el-card>
              <el-row>
                <el-col :span="8">题号</el-col>
                <el-col :span="8">状态</el-col>
                <el-col :span="8">得分</el-col>
              </el-row>

              <el-row v-if="props.row.problems.length === 0">
                <h2 style="text-align: center; color: red;">暂无数据，该生未提交实验</h2>
              </el-row>

              <el-row
                v-else
                :key="value.problem_id"
                v-for="value in props.row.problems"
                class="problemRow"
              >
                <div @click="showDetail(value)">
                  <el-col :span="8">{{ value.problem_id }}</el-col>
                  <el-col :span="8" v-if="value.correct" style="color:green">ACCEPT</el-col>
                  <el-col :span="8" v-else style="color:red">ERROR</el-col>
                  <el-col :span="8">{{ value.score }}</el-col>
                  <div>
                    <el-dialog
                      title="作答详情"
                      :visible.sync="dialogDetailVisible"
                      :append-to-body="true"
                    >
                      <el-row>
                        <h2>SQL:</h2>
                      </el-row>
                      <el-row class="deatilRow">
                        <code>{{ submit }}</code>
                      </el-row>
                      <div v-if="showError">
                        <el-row class="deatilRow">
                          <h3 class="errortitle">Errors:</h3>
                        </el-row>
                        <el-row class="deatilRow">
                          <h4 class="errormsg">{{ error }}</h4>
                        </el-row>
                      </div>
                    </el-dialog>
                  </div>
                </div>
              </el-row>
            </el-card>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top: 1%">
        <el-button
          type="primary"
          round
          size="medium"
          style="float:left"
          :disabled="pre_disabled"
          @click="handlePre"
        >上一页</el-button>
        <el-tag color="white">{{ curPage }} / {{ totalPage }}</el-tag>
        <el-button
          type="primary"
          round
          size="medium"
          style="float:right"
          :disabled="next_disabled"
          @click="handleNext"
        >下一页</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.problemRow {
  margin-top: 20px;
}
.title {
  font-weight: bolder;
}
.deatilRow {
  margin-top: 10px;
}
.errormsg {
  color: red;
  font-weight: bold;
}
.errortitle {
  color: red;
  font-weight: bolder;
}
</style>

<script>
import classHandler from "../api/classes";
export default {
  data() {
    return {
      classId: this.$route.query.classId,
      groupId: this.$route.query.groupId,
      groupName: this.$route.query.groupName,
      classNumber: 0,
      grade: 0,
      major: "",
      number: 0,
      submit: "",
      error: "",
      showError: false,
      list: [],
      realList: [],
      curPage: 1,
      totalPage: 1,
      pageSize: 10,
      dialogDetailVisible: false,
      loading: false
    };
  },
  computed: {
    pre_disabled() {
      return this.curPage === 1;
    },
    next_disabled() {
      return this.curPage === this.totalPage;
    }
  },
  created: function() {
    this.getClassExperiment(this, this.classId, this.groupId);
  },
  methods: {
    getClassExperiment: (self, classId, groupId) => {
      self.loading = true;
      classHandler.getClassExperiment(classId, groupId).then(
        res => {
          if (res.code === 0 && res.data) {
            self.list = res.data.list;
            self.grade = res.data.grade;
            self.major = res.data.major;
            self.number = res.data.number;
            self.classNumber = res.data.class_id;
            self.totalPage = Math.ceil(res.data.list.length / self.pageSize);
            self.getPage(1);
          } else {
            self.$message({
              type: "error",
              message: "获取失败或未曾授权班级管理"
            });
          }
          self.loading = false;
        },
        error => {
          self.$message({
            type: "error",
            message: "获取失败或未曾授权班级管理"
          });
          self.loading = false;
        }
      );
    },
    showDetail(value) {
      this.submit = value.submit;
      this.error = value.error;
      this.showError = !value.correct;
      this.dialogDetailVisible = !this.dialogDetailVisible;
    },
    getPage(index) {
      this.realList = [];
      var start = (index - 1) * this.pageSize;
      for (var i = start; i < this.list.length; i++) {
        if (i - start >= this.pageSize) {
          break;
        }
        this.realList.push(this.list[i]);
      }
    },
    handlePre() {
      if (this.pre_disabled) {
        return;
      }
      this.getPage(this.curPage - 1);
      this.curPage--;
    },
    handleNext() {
      if (this.next_disabled) {
        return;
      }
      this.getPage(this.curPage + 1);
      this.curPage++;
    }
  }
};
</script>
