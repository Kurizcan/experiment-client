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
  name: "editor",
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
        mode: "javascript",
        theme: "erlang-dark",
        hintOptions: {
          completeSingle: false
        }
      }
    };
  },
  created: function() {},
  methods: {
    // onCmReady(cm) {
    //   cm.on("keypress", () => {
    //     cm.showHint();
    //   });
    // },
    onCmReady(cm) {
      console.log("the editor is readied!", cm);
    }
  }
};
</script>
<style>
@import "~codemirror/lib/codemirror.css";
.CodeMirror-line {
  text-align: left;
}
.homecss {
  height: 100%;
}
.CodeMirror {
  height: 650px;
  border: 1px solid #eee;
  font-size: 13px;
  line-height: 150%;
}
</style>
