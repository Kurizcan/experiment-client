<template>
  <div style="text-align:center" v-loading="loading">
    <h1 style="margin-top:25px;">{{ group_name }}</h1>
    <el-card class="card">
      <el-table
        :data="realData"
        style="width: 100%"
        align="center"
        :row-class-name="tableRowClassName"
        class="table"
        @row-click="handleProblem"
      >
        <el-table-column prop="problem_id" label="题目编号" width="300"></el-table-column>
        <el-table-column prop="title" label="题目名称" width="500"></el-table-column>
      </el-table>

      <div style="margin-top: 1%">
        <el-button
          round
          type="success"
          size="medium"
          :disabled="submit_disabled"
          @click="experimentSubmit"
        >提交实验</el-button>
      </div>

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

<style lang="scss">
.el-table .success-row {
  background: #f0f9eb;
}
.table {
  margin-top: 0%;
}
.card {
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 15%;
  margin-bottom: 5%;
  width: 70%;
}
.el-table--enable-row-hover .el-table__body tr:hover {
  cursor: pointer;
}
</style>

<script>
import experiment from "../api/experiment";
export default {
  data() {
    return {
      tableData: [],
      realData: [],
      groupId: 0,
      group_name: "",
      curPage: 1,
      totalPage: 1,
      loading: true,
      pageSize: 10,
      submit_disabled: false
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
    this.submit_disabled = this.$route.query.status == 3? true:false;
    console.log("submit_disabled:", this.submit_disabled)
    this.getProblemList(this, this.$route.params.groupId);
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if ((rowIndex & 1) === 0) {
        return "success-row";
      }
      return "";
    },
    getProblemList(self, groupId) {
      experiment.getExperimentProblemList(groupId).then(
        res => {
          console.log(res);
          if (res.code === 0 && res.data) {
            self.tableData = res.data.list;
            self.totalPage = Math.ceil(res.data.list.length / self.pageSize);
            self.groupId = res.data.group_id;
            self.group_name = res.data.group_name;
            self.loading = false;
            self.getPage(1);
            console.log(self.totalPage);
          } else {
            self.$message({
              type: "error",
              message: "获取失败或者实验不存在"
            });
            self.loading = false;
          }
        },
        error => {
          console.log(error);
          self.loading = false;
        }
      );
    },
    getPage(index) {
      this.realData = [];
      var start = (index - 1) * this.pageSize;
      for (var i = start; i < this.tableData.length; i++) {
        if (i - start >= this.pageSize) {
          break;
        }
        this.realData.push(this.tableData[i]);
        console.log(this.tableData[i]);
      }
    },
    // 返回上一页
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
    },
    // 进入题目详情页面
    handleProblem(row) {
      this.$router.push({
        path: "/experiment/" + this.groupId + "/" + row.problem_id,
        query: {
          status: this.$route.query.status
        }
      });
      console.log(row);
    },
    // 提交实验
    experimentSubmit() {
      // 进入结果页
      this.$router.push({
        path: "/result/" + this.groupId,
        query: {
          group_name: this.group_name
        }
      });
    }
  }
};
</script>
