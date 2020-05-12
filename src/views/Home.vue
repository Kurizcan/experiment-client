<template>
  <div class="home">
    <el-row v-if="type" class="rowsTeacher">
      <el-col :span="12">
        <Card class="card">
          <div style="text-align:center">
            <img src="../assets/logo.png" @click="handleMyExperiment" />
            <h3>我的实验</h3>
          </div>
        </Card>
      </el-col>
      <el-col :span="12">
        <Card class="card">
          <div style="text-align:center">
            <img src="../assets/logo.png" @click="handleInfo" />
            <h3>个人信息</h3>
          </div>
        </Card>
      </el-col>
    </el-row>

    <div v-else>
      <el-row>
        <el-col :span="12">
          <Card class="card">
            <div style="text-align:center">
              <img src="../assets/logo.png" @click="handleMyClass" />
              <h3>我的班级</h3>
            </div>
          </Card>
        </el-col>
        <el-col :span="12">
          <Card class="card">
            <div style="text-align:center">
              <img src="../assets/logo.png" @click="handleExperiment" />
              <h3>发布实验</h3>
            </div>
          </Card>
        </el-col>
      </el-row>
      <el-row class="rowsTeacher">
        <el-col :span="12">
          <Card class="card">
            <div style="text-align:center">
              <img src="../assets/logo.png" @click="handleProlemUpload" />
              <h3>上传题目</h3>
            </div>
          </Card>
        </el-col>
        <el-col :span="12">
          <Card class="card">
            <div style="text-align:center">
              <img src="../assets/logo.png" @click="handleInfo" />
              <h3>个人信息</h3>
            </div>
          </Card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import util from "../lib/util";

export default {
  name: "Home",
  data() {
    return {
      type: util.user.getType() === "0"
    };
  },
  components: {
    // HelloWorld
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push({
        name: "Login"
      });
    },
    handleInfo() {
      this.$router.push({
        path: "/info"
      });
    },
    handleProlemUpload() {
      this.$router.push({
        path: "/problem/upload"
      });
    },
    handleMyClass() {
      this.$router.push({
        path: "/class/list/" + util.user.getUserId()
      });
    },
    handleExperiment() {
      this.$router.push({
        path: "/class/experiment/distributed/"
      });
    },
    handleMyExperiment() {
      this.$router.push({
        path: '/experiment/list'
      })
    }
  }
};
</script>

<style lang="less">
.home {
  .el-col {
    height: 150px;
    background-clip: content-box;
  }
  .card {
    width: 320px;
    background: ghostwhite;
    cursor: pointer;
  }
  .rowsTeacher {
    margin-top: 15%;
  }
}
</style>
