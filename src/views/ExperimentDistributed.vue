<template>
  <div v-loading="loading">
    <el-card>
      <h2 style="text-align:left; font-size:25px">1. 选择实验的题目：</h2>
      <el-table
        ref="multipleTable"
        :data="problemsdata"
        tooltip-effect="dark"
        style="width: 100%; margin-top:20px; margin-left:5%; margin-right:10%"
        :row-key="getRowKeysOfProblem"
        @selection-change="handleSelectionProblemChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column prop="problem_id" label="题号" width="300"></el-table-column>
        <el-table-column prop="title" label="题目名称" width="300"></el-table-column>
        <el-table-column prop="poster" label="上传者" width="300"></el-table-column>
        <el-table-column type="expand" label="详情">
          <template slot-scope="props">
            <el-form label-position="left">
              <el-form-item label="问题描述">
                <br />
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="标准答案">
                <br />
                <span>{{ props.row.solution }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="problemsTotal"
        @current-change="getPageOfProblems"
      ></el-pagination>

      <el-divider></el-divider>
      <h2 style="text-align:left; font-size:25px">2. 选择班级发布：</h2>
      <el-table
        ref="multipleTable"
        :data="realClassLists"
        tooltip-effect="dark"
        style="width: 100%; margin-top:20px; margin-left:5%; margin-right:10%"
        :row-key="getRowKeysOfClass"
        @selection-change="handleSelectionClassChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column prop="college" label="学院" width="300"></el-table-column>
        <el-table-column prop="major" label="专业" width="300"></el-table-column>
        <el-table-column prop="grade" label="年级" width="200"></el-table-column>
        <el-table-column prop="class" label="班级" width="200"></el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="classesTotal"
        :page-size="pageSizeOfClasses"
        @current-change="getPageOfClasses"
      ></el-pagination>

      <el-divider></el-divider>
      <el-row>
        <el-col :span="5">
          <h2 style="text-align:left; font-size:25px">3. 输入实验名称：</h2>
        </el-col>
        <el-col :span="19">
          <el-input v-model="groupName" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <el-row>
        <el-col :span="4">
          <h2 style="text-align:left; font-size:25px">4. 发布实验：</h2>
        </el-col>
        <el-col :span="20">
          <el-button
            type="success"
            style="float:left; margin-bottom: 0px"
            size="middle"
            @click="distributed"
          >点击发布</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
</style>

<script>
import problemHandler from "../api/problem";
import classesHandler from "../api/classes";
import experiment from "../api/experiment";
import util from "../lib/util";
export default {
  data() {
    return {
      groupName: "",
      problemsdata: [],
      classLists: [],
      realClassLists: [],
      problemsTotal: 0,
      classesTotal: 0,
      pageSizeOfClasses: 10,
      selectProblems: [],
      selectClasses: [],
      indexOfProblem: 1,
      limitOfProblem: 10,
      loading: false,
      getRowKeysOfProblem(row) {
        return row.problem_id;
      },
      getRowKeysOfClass(row) {
        return row.class_id;
      }
    };
  },
  created: function() {
    this.getProblemList(this, this.indexOfProblem, this.limitOfProblem);
    this.getProblemTotal(this);
    this.getClassesList(this);
  },
  methods: {
    // 获取题目列表
    getProblemList(self, index, limit) {
      problemHandler.getProblemList(index, limit).then(
        res => {
          if (res.code === 0 && res.data) {
            self.problemsdata = res.data;
          } else {
            self.$message({
              type: "error",
              message: "获取失败，请稍后再试"
            });
          }
        },
        error => {
          self.$message({
            type: "error",
            message: "获取失败"
          });
          console.log(error);
        }
      );
    },
    getProblemTotal(self) {
      problemHandler.getTotal().then(
        res => {
          if (res.code === 0 && res.data) {
            self.problemsTotal = res.data.count;
          } else {
            self.$message({
              type: "error",
              message: "获取失败"
            });
          }
        },
        error => {
          self.$message({
            type: "error",
            message: "获取失败"
          });
          console.log(error);
        }
      );
    },
    // 获取班级列表
    getClassesList(self) {
      classesHandler.getClassList(util.user.getUserId()).then(
        res => {
          if (res.code === 0 && res.data) {
            self.classLists = res.data.list;
            self.classesTotal = res.data.list.length;
            self.getPageOfClasses(1);
          } else {
            self.$message({
              type: "error",
              message: "获取失败"
            });
          }
        },
        error => {
          self.$message({
            type: "error",
            message: "获取失败"
          });
          console.log(error);
        }
      );
    },

    handleSelectionProblemChange(val) {
      this.selectProblems = val;
      console.log("this.problemIds", this.selectProblems);
    },
    handleSelectionClassChange(val) {
      this.selectClasses = val;
      console.log("this.selectClasses", this.selectClasses);
    },
    getPageOfClasses(index) {
      console.log(index);
      this.realClassLists = [];
      var start = (index - 1) * this.pageSizeOfClasses;
      for (var i = start; i < this.classLists.length; i++) {
        if (i - start >= this.pageSizeOfClasses) {
          break;
        }
        this.realClassLists.push(this.classLists[i]);
      }
    },
    getPageOfProblems(index) {
      this.getProblemList(
        this,
        (index - 1) * this.limitOfProblem,
        this.limitOfProblem
      );
    },
    distributeExperiment(group_id, class_list) {
      return experiment.distributedExperiment({
        group_id,
        class_list
      });
    },
    makeExperiment(problems, group_name) {
      return experiment.makeExperiemnt({
        problems,
        group_name
      });
    },
    distributed() {
      var problems = [];
      var class_list = [];
      var group_name = this.groupName;
      for (var i = 0; i < this.selectProblems.length; i++) {
        problems.push(this.selectProblems[i].problem_id);
      }
      for (var i = 0; i < this.selectClasses.length; i++) {
        class_list.push(this.selectClasses[i].class_id);
      }
      console.log("problems:", problems);
      console.log("class_list", class_list);
      console.log("groupName", group_name);
      if (
        problems.length === 0 ||
        class_list.length === 0 ||
        group_name === ""
      ) {
        this.$message({
          type: "error",
          message: "请按照步骤填写完整再发布实验"
        });
      }
      let self = this;
      self.loading = true;
      // 组成实验
      self.makeExperiment(problems, group_name).then(
        res => {
          if (res.code === 0 && res.data) {
            var group_id = res.data.group_id;
            // 发布实验
            self.distributeExperiment(group_id, class_list).then(
              res => {
                if (res.code === 0) {
                  self.loading = false;
                  self.$message({
                    type: "success",
                    message: "实验：" + group_name + "创建成功！"
                  });
                } else {
                  self.loading = false;
                  this.$message({
                    type: "error",
                    message: "发布失败，请稍后再试"
                  });
                }
              },
              error => {
                self.loading = false;
                this.$message({
                  type: "error",
                  message: "发布失败，请稍后再试"
                });
                console.log(error);
              }
            );
          }
        },
        error => {
          self.loading = false;
          this.$message({
            type: "error",
            message: "发布失败，请稍后再试"
          });
        }
      );
    }
  }
};
</script>
