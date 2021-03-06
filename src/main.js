import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import "./style/common.css"
import Router from 'vue-router'
import axios from 'axios'
import JsonViewer from 'vue-json-viewer'

Vue.use(JsonViewer)
Vue.use(Router)


Vue.use(ElementUI)
Vue.config.productionTip = false;
// axios.defaults.baseURL="https://www.fastmock.site/mock/c3b43a9a02e0a44589c08d2ebdc6f489/api/"
axios.defaults.baseURL="http://11.0.0.63:5000/"

Vue.prototype.$http=axios

new Vue({
  
  router,
  render: h => h(App)
}).$mount("#app")


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}