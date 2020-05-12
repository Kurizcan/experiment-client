<template>
  <div class="homecss">
    <codemirror v-model="code" :options="cmOptions" @ready="onCmReady" />
  </div>
</template>
<script>
// interfaceCode
// import CodeMirror from "codemirror";
import { codemirror } from "vue-codemirror";

// hightlight
import "codemirror/mode/javascript/javascript";

// import theme style
import "codemirror/theme/3024-night.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/addon/hint/show-hint.css";

export default {
  name: "",
  components: {
    codemirror
  },
  data() {
    return {
      code: "",
      cmOptions: {
        tabSize: 2,
        lineNumbers: true,
        line: true,
        indentWithTabs: true,
        smartIndent: true,
        autofocus: false,
        mode: "sql",
        theme: "erlang-dark",
        hintOptions: {
          completeSingle: false
        }
      },
      groupId: parseInt("109")
      // editor: null
    };
  },
  created: function() {
    console.log("109")
  },
  methods: {
    // onCmReady(cm) {
    //   cm.on("keypress", () => {
    //     cm.showHint();
    //   });
    // },
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    }
  }
};
</script>
<style lang="less">
@import "~codemirror/lib/codemirror.css";
.CodeMirror-line {
  text-align: left;
}
.submit {
  margin-top: 5px;
  float: right;
  margin-right: 50px;
}
.homecss {
  height: 100%;
}
.CodeMirror {
  height: 600px;
}
</style>
