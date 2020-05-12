<template>
  <div>
    <el-table :data="realTable" style="width: 100%" v-loading="loading">
      <el-table-column prop="group_id" label="实验编号" width="200"></el-table-column>
      <el-table-column prop="group_name" label="实验名称" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="200">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="medium" type="warning">待完成</el-tag>
          <el-tag v-else size="medium" type="success">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="得分" width="200"></el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button size="medium " @click="handleEdit(scope.$index, scope.row)">实验</el-button>
          <el-button size="medium " type="primary " @click="handleRead(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      layout="total, sizes, prev, pager, next"
      :page-size="pageSize"
      background
      @current-change="pagechange"
    />
  </div>
</template>

<script>
import experiment from "../api/experiment";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pageSize: 10,
      realTable: [],
      loading: true
    };
  },
  created: function() {
    this.getMyExperimentList(this);
  },
  methods: {
    getMyExperimentList(self) {
      self.loading = true;
      experiment.getMyExperiment().then(
        res => {
          if (res.code === 0 && res.data) {
            self.tableData = res.data;
            self.total = res.data.length;
          } else {
            self.$message({
              type: "error",
              message: "获取失败"
            });
          }
          console.log(res);
          // 获取首页
          self.getPageData(1);
          self.loading = false;
        },
        error => {
          self.loading = false;
          console.log(error);
        }
      );
    },
    pagechange(val) {
      this.realTable = [];
      this.getPageData(val);
    },
    getPageData(index) {
      var start = (index - 1) * this.pageSize;
      for (var i = start; i < this.tableData.length; i++) {
        if (i - start >= this.pageSize) {
          break;
        }
        this.realTable.push(this.tableData[i]);
      }
      console.log(this.realTable.length);
    },
    handleEdit(index, row) {
      this.$router.push({
        path: "/experiment/problems/" + row.group_id,
        query: {
          status: row.status
        }
      });
      console.log(index, row);
      console.log(row.group_id);
    },
    // 查看实验详情
    handleRead(index, row) {
      this.$router.push({
        path: "/result/" + row.group_id,
        query: {
          group_name: row.group_name
        }
      });
    }
  }
};
</script>
