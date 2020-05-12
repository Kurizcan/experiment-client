<template>
  <div>
    <el-card class="clearfix" v-loading="loading">
      <div slot="header">
        <span>个人信息</span>
      </div>

      <div class="user-profile">
        <div class="box-center">
          <div class="user-name text-center">{{ userInfo.name }}</div>
        </div>
      </div>

      <el-row :gutter="10" class="user-bio">
        <el-col :span="13" class="user-bio-section-body"> 学院：</el-col>
        <el-col :span="9" class="text-muted">
          {{ userInfo.college }}
        </el-col>
      </el-row>
      <el-row :gutter="10" class="user-bio" v-if="type">
        <el-col :span="13" class="user-bio-section-body"> 专业：</el-col>
        <el-col :span="9" class="text-muted">
          {{ userInfo.major }}
        </el-col>
      </el-row>
      <el-row :gutter="10" class="user-bio" v-if="type">
        <el-col :span="13" class="user-bio-section-body"> 年级：</el-col>
        <el-col :span="9" class="text-muted">
          {{ userInfo.grade }}
        </el-col>
      </el-row>
      <el-row :gutter="10" class="user-bio" v-if="type">
        <el-col :span="13" class="user-bio-section-body"> 班级：</el-col>
        <el-col :span="9" class="text-muted">
          {{ userInfo.class }}
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import user from '../api/user'
import util from '../lib/util'
export default {
  data: () => ({
    userInfo: {
      name: '-',
      college: '-',
      major: '-',
      grade: 0,
      class: 0,
    },
    type: util.user.getType() === '0',
    loading: true
  }),
  created: function() {
    this.getUserInfo(this)
  },
  methods: {
    // self 传入当前对象
    getUserInfo: (self) => {
      let userNumber = util.user.getUserNumber()
      user.getUserInfo(userNumber).then(res => {
        if (res.code === 0 && res.data) {
          self.userInfo = {
            name: res.data.username,
            college: res.data.college,
            major: res.data.major,
            grade: res.data.grade,
            class: res.data.class
          }
        } else {
          self.$message({
            type: 'error',
            message: '获取失败'
          })
        }
        console.log(res)
        self.loading = false
      }, error => {
        console.log(error)
        self.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.clearfix{
  background:peachpuff;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
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
</style>
