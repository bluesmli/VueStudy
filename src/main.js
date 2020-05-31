import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import "./style/common.css"
import Router from 'vue-router'




Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}