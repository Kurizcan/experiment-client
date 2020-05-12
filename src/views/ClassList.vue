<template>
  <div>
    <el-card class="card">
      <el-table
        :data="realList"
        style="width: 100%"
        align="center"
        class="table"
        @row-click="handleClassInfo"
      >
        <el-table-column prop="class_id" label="班级编号" width="200"></el-table-column>
        <el-table-column prop="college" label="学院" width="200"></el-table-column>
        <el-table-column prop="major" label="专业" width="200"></el-table-column>
        <el-table-column prop="grade" label="年级" width="200"></el-table-column>
        <el-table-column prop="class" label="班级" width="100"></el-table-column>
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

<script>
import classesHandler from "../api/classes";
import util from "../lib/util";
export default {
  data() {
    return {
      teacherId: util.user.getUserId(),
      list: [],
      realList: [],
      curPage: 1,
      totalPage: 1,
      pageSize: 10,
      loading: true
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
    this.getClassedInfo(this, this.teacherId);
  },
  methods: {
    getClassedInfo(self, tid) {
      classesHandler.getClassList(tid).then(
        res => {
          if (res.code === 0 && res.data) {
            self.list = res.data.list;
            self.totalPage = Math.ceil(res.data.list.length / self.pageSize);
            self.loading = false;
            self.getPage(1);
          } else {
            self.$message({
              type: "error",
              message: "获取失败或未曾授权班级管理"
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
      this.realList = [];
      console.log(this.realList);
      console.log(this.realList.length);
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
    },
    handleClassInfo(row) {
      this.$router.push({
        path: "/class/detail/" + row.class_id
      });
    }
  }
};
</script>

<style lang="less">
.card {
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 15%;
  margin-bottom: 5%;
  width: 90%;
}
.el-table--enable-row-hover .el-table__body tr:hover {
  cursor: pointer;
}
</style>
