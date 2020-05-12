<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Header class="header-wrapper">
        <el-row>
          <el-col :span="4">
            <el-link :underline="false" href="/" divided>Experiment System</el-link>
          </el-col>
          <el-col :span="12">
            <Icon
              :class="triggerClassed"
              @click.native="handleCollapsed"
              type="md-menu"
              :size="64"
            />
          </el-col>
          <el-col :span="4">
            <p>你好，{{ userName }}</p>
          </el-col>
          <el-col :span="4">
            <el-dropdown>
              <el-button icon="el-icon-user-solid" size="medium" circle />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-link :underline="false" href="/info" divided>个人信息</el-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-link :underline="false" @click="handleLogout" divided>退出登录</el-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </Header>
      <Layout>
        <Sider collapsible hide-trigger breakpoint="sm" v-model="collapsed">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="rgba(0, 0, 0, 0.1)"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1" @click="handleMyClass" v-if="use_type === '1'">
              <i class="el-icon-menu"></i>
              <span slot="title">我的班级</span>
            </el-menu-item>
            <el-menu-item index="1" @click="handleMyExperiment" v-if="use_type === '0'">
              <i class="el-icon-menu"></i>
              <span slot="title">我的实验</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleExperiment" v-if="use_type === '1'">
              <i class="el-icon-document"></i>
              <span slot="title">发布实验</span>
            </el-menu-item>
            <el-menu-item index="3" @click="handleProlemUpload" v-if="use_type === '1'">
              <i class="el-icon-document"></i>
              <span slot="title">上传题目</span>
            </el-menu-item>
            <el-menu-item index="4" @click="handleInfo">
              <i class="el-icon-document"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
          </el-menu>
        </Sider>
        <Layout>
          <Content class="content-con">
            <Card shadow class="page-card">
              <router-view />
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import util from "../lib/util";

export default {
  data() {
    return {
      collapsed: false,
      userName: util.user.getUserName(),
      use_type: util.user.getType()
    };
  },
  computed: {
    triggerClassed() {
      return ["trigger-icon", this.collapsed ? "rotate" : ""];
    }
  },
  methods: {
    ...mapActions(["logout"]),
    handleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    handleLogout() {
      this.logout();
      this.$router.push({
        name: "Login"
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
    handleMyExperiment() {
      this.$router.push({
        path: "/experiment/list"
      });
    }
  }
};
</script>

<style lang="less">
.layout-wrapper,
.layout-outer {
  height: 100%;
  .ivu-layout-header {
    padding: 0 0px;
  }
  .ivu-icon {
    float: left;
  }
  .header-wrapper {
    background: #fff;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0 0;
    .trigger-icon {
      // 鼠标放上去有小手的样式
      cursor: pointer;
      transition: transform 0.3s ease;
      &.rotate {
        transform: rotateZ(-90deg);
        transition: transform 0.3s ease;
      }
    }
    .user-icon {
      float: right;
    }
  }
}
.content-con {
  padding: 5px;
  background: rgba(0, 0, 0, 0.1);
}
.page-card {
  min-height: ~"calc(100vh - 75px)";
  background: whitesmoke;
}
</style>

