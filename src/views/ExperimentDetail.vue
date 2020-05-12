<template>
  <div>
    <h1 style="margin-top:25px;">{{ group_name }}</h1>
    <el-card class="card">
      <el-table
        :data="list"
        style="width: 100%"
        align="center"
        @row-click="handleDetail"
        class="table"
      >
        <el-table-column prop="problem_id" label="题目编号" width="200"></el-table-column>
        <el-table-column prop="title" label="题目名称" width="300"></el-table-column>
        <el-table-column prop="score" label="分数" width="200"></el-table-column>
      </el-table>
      <h2 class="all">总分： {{ score }}</h2>
    </el-card>
  </div>
</template>

<script>
import experiment from '../api/experiment'
export default {
  data() {
    return {
      group_name: this.$route.query.group_name,
      score: 0,
      list: []
    };
  },
  created: function() {
    this.getResult(this, this.$route.params.groupId);
  },
  methods: {
    getResult(self, groupId) {
      experiment.submitEXperiment(groupId).then(
        res => {
          console.log(res);
          if ((res.code === 0 && res.data)) {
            self.score = res.data.score;
            self.list = res.data.list;
          } else if (res.code === 20007) {
            setTimeout(() => {
              self.getResult(self, groupId);
            }, 2000);
          } else {
            self.$message({
              type: "error",
              message: "获取失败"
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    // 进入结果详情页面
    handleDetail(row) {
      this.$router.push({
        path: `/experiment/problem/detail/${row.problem_id}`,
        query: { groupId: this.$route.params.groupId, title: row.title }
      });
      console.log(row);
    }
  }
};
</script>

<style lang="less">
.all {
  text-align: right;
  margin-top: 20px;
}
</style>
