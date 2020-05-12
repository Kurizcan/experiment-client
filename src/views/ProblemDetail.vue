<template>
  <div v-loading="loading">
    <!-- problemId:{{ this.$route.params.problemId }}
    groupId: {{ this.$route.query.groupId }}
    title: {{this.$route.query.title}}-->
    <h2 style="margin-top:5%;">{{ this.$route.params.problemId }} . {{ title }}</h2>
    <el-card class="card">
      <el-row>
        <el-col :span="12" class="title">Status:</el-col>
        <el-col :span="12" v-if="correct === true" class="accept">ACCEPT</el-col>
        <el-col :span="12" v-else class="wrong">WRONG ANSWER</el-col>
      </el-row>
      <el-row class="deatilRow">
        <el-col :span="12" class="title">Score:</el-col>
        <el-col :span="12" class="title">{{ score }}</el-col>
      </el-row>
      <el-row class="deatilRow">
        <el-col class="title">Your SQL</el-col>
      </el-row>
      <el-row class="deatilRow">
        <el-col>
          <code>{{ submit }}</code>
        </el-col>
      </el-row>
      <div v-if="correct === false">
        <el-row class="deatilRow">
          <el-col class="errortitle">Runtime Error Message:</el-col>
        </el-row>
        <el-row class="deatilRow">
          <el-col class="errormsg">
            <code>{{ errorMsg }}</code>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style>
.card {
  margin-top: 2%;
  margin-left: 15%;
  margin-right: 15%;
  margin-bottom: 5%;
  width: 70%;
}
.errorCard {
  margin-left: 15%;
  margin-right: 15%;
  margin-bottom: 5%;
  width: 70%;
}
.accept {
  color: rgb(30, 128, 0);
  font-weight: bold;
}
.wrong {
  color: red;
  font-weight: bold;
}
.title {
  font-weight: bolder;
}
.deatilRow {
  margin-top: 30px;
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
import problem from "../api/problem";

export default {
  data() {
    return {
      submit: "",
      correct: true,
      errorMsg: "",
      score: 0,
      title: this.$route.query.title,
      loading: true
    };
  },
  created: function() {
    this.getDetail(
      this,
      this.$route.params.problemId,
      this.$route.query.groupId
    );
  },
  methods: {
    getDetail: (self, problemId, groupId) => {
      problem.getProblemDetail(problemId, groupId).then(
        res => {
          console.log(res);
          if (res.code === 0 && res.data) {
            self.submit = res.data.submit;
            self.correct = res.data.correct;
            self.score = res.data.score;
            self.errorMsg = res.data.error;
            self.loading = false;
          } else if (res.code === 20007) {
            self.$message({
              type: "error",
              message: "运行中，请稍等"
            });
            self.$router.back();
          } else {
            self.$message({
              type: "error",
              message: "获取失败或者未曾提交此题目"
            });
            self.$router.back();
          }
        },
        error => {
          console.log(error);
          self.$message({
            type: "error",
            message: "获取失败或者未曾提交此题目"
          });
          self.$router.back();
        }
      );
    }
  }
};
</script>
