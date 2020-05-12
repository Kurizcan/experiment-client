<template>
  <div class="homeBox">
    <el-row :gutter="5">
      <el-col :span="14">
        <el-row :gutter="12">
          <el-col :span="12">
            <h3 style="text-align:left">{{ problemId }} . {{ title }}</h3>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" style="float:right" @click="backToList">返回题目列表</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <h4 class="descp">Here are tables (the names of tables are all lowercase):</h4>
        <div
          :key="tableName"
          v-for="(tableName, index) in example.headers.table"
          style="margin-top:2%"
        >
          <span style="float:left">Table {{ tableName }}:</span>
          <br />
          <table border="5">
            <tr>
              <td
                class="rowcss"
                :key="value"
                v-for="value in example.headers.field[index]"
              >{{value}}</td>
            </tr>
            <tr :key="row" v-for="row in example.rows[index]">
              <td class="rowcss" :key="v" v-for="v in row">{{v}}</td>
            </tr>
          </table>
        </div>

        <p class="descp">{{ description }}</p>
        <p class="descp">For example, according to the above table, we should output:</p>

        <div>
          <table border="5">
            <tr>
              <td class="rowcss" :key="value" v-for="value in output.headers">{{value}}</td>
            </tr>
            <tr :key="row" v-for="row in output.rows">
              <td class="rowcss" :key="v" v-for="v in row">{{v}}</td>
            </tr>
          </table>
        </div>
      </el-col>
      <el-col :span="10">
        <codeEdit
          :problemId="problemId"
          :groupId="groupId"
          :title="title"
          :status="this.$route.query.status"
        ></codeEdit>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import codeEdit from "../components/CodeEdit";
import problem from "../api/problem";
export default {
  components: {
    codeEdit
  },
  data() {
    return {
      groupId: this.$route.params.groupId,
      problemId: this.$route.params.problemId,
      title: "",
      description: "",
      example: {
        headers: {
          table: [],
          field: []
        },
        rows: []
      },
      output: {
        headers: [],
        rows: []
      },
      poster: ""
    };
  },
  created: function() {
    this.getProblemInfo(this, this.$route.params.problemId);
  },
  methods: {
    getProblemInfo: (self, problemId) => {
      problem.getProblemInfo(problemId).then(
        res => {
          if (res.code === 0 && res.data) {
            self.problemId = res.data.problem_id;
            self.title = res.data.title;
            self.description = res.data.description;
            self.example.headers.table = res.data.example.headers.table;
            self.example = res.data.example;
            self.output = res.data.output;
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
    backToList() {
      this.$router.push({
        path: "/experiment/problems/" + this.groupId,
        query: {
          status: this.$route.query.status
        }
      });
    }
  }
};
</script>


<style>
.homeBox {
  height: 100%;
  width: 100%;
}
.codecss {
  width: 55%;
}
.problemInfo {
  width: 45%;
}
.descp {
  text-align: left;
  font-size: 15px;
  font-weight: lighter;
  margin-top: 20px;
}
.rowcss {
  float: left;
  width: 120px;
  text-align: center;
}
.change {
  margin-top: 140px;
}
</style>
