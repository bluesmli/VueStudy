import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import home from "../components/home.vue"
import explain from "../components/explain.vue"
import projectList from "../components/project.vue"
Vue.use(Router)


export default new Router({
	routes:[
		{path:"/",redirect:"/login"},
		{path:"/login",component:login},
		{path:"/home",component:home,children:[
				{
					path:"/explain",component:explain,meta: ['说明', '说明']
				},
				{
					path:"/projectList",component:projectList,meta: ['项目列表', '项目列表']
				}
			]
		}
	]
	
})
	
	
	
	
	
