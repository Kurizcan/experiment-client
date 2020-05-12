import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import EleForm from "vue-ele-form";
import EleFormJsonEditor from "vue-ele-form-json-editor";


Vue.use(ElementUI) //使用elementUI
Vue.use(ViewUI);   //使用 i-view
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
