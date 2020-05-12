<template>
  <div v-loading="loading">
    <el-row :gutter="5">
      <el-col :span="12">
        <el-card>
          <el-table
            :data="realList"
            style="width: 100%"
            align="center"
            class="table"
            @row-click="handleExperimentInfo"
          >
            <el-table-column prop="group_id" label="实验编号" width="200"></el-table-column>
            <el-table-column prop="group_name" label="实验名称" width="200"></el-table-column>
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
      </el-col>

      <el-col :span="12">
        <el-card class="cardcss">
          <div slot="header">
            <span>班级信息</span>
          </div>
          <el-row :gutter="10" class="user-bio">
            <el-col :span="13" class="user-bio-section-body">专业：</el-col>
            <el-col :span="9" class="text-muted">{{ major }}</el-col>
          </el-row>
          <el-row :gutter="10" class="user-bio">
            <el-col :span="13" class="user-bio-section-body">年级：</el-col>
            <el-col :span="9" class="text-muted">{{ grade }}</el-col>
          </el-row>
          <el-row :gutter="10" class="user-bio">
            <el-col :span="13" class="user-bio-section-body">班级：</el-col>
            <el-col :span="9" class="text-muted">{{ classNumber }}</el-col>
          </el-row>
          <el-row :gutter="10" class="user-bio">
            <el-col :span="13" class="user-bio-section-body">人数：</el-col>
            <el-col :span="9" class="text-muted">{{ number }}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import classHandler from "../api/classes";
export default {
  data() {
    return {
      class_id: this.$route.params.classId,
      grade: 0,
      classNumber: 0,
      major: "",
      number: 0,
      list: [],
      realList: [],
      curPage: 1,
      totalPage: 1,
      pageSize: 15,
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
    this.getClassInfo(this, this.class_id);
  },
  methods: {
    getClassInfo(self, classId) {
      classHandler.getClassDetail(classId).then(
        res => {
          console.log(res);
          if (res.code === 0 && res.data) {
            self.list = res.data.list;
            self.totalPage = Math.ceil(res.data.list.length / self.pageSize);
            self.grade = res.data.grade;
            self.classNumber = res.data.class;
            self.number = res.data.number;
            self.major = res.data.major;
            self.getPage(1);
            self.loading = false;
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
    handleExperimentInfo(row) {
      console.log(row);
      this.$router.push({
        path: '/class/experiment/detail',
        query: {
          groupId: row.group_id,
          classId: row.class_id,
          groupName: row.group_name
        }
      })
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

<style  lang="less">
.box-center {
  margin: 0 auto;
  display: table;
}

.clearfix {
  background: peachpuff;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
.cardcss {
  width: 60%;
  float: right;
  margin-top: 0;
  margin-right: 20%;
}
</style>
