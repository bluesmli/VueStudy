import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import home from "../components/home.vue"
import explain from "../components/explain.vue"
import projectList from "../components/project.vue"
import addproject from "../components/addpro.vue"
import apismanage from "../components/apis.vue"
import cases from "../components/cases.vue"
import index from "../components/index.vue"


export default new Router({
	routes: [{
			path: "/",
			redirect: "/login"
		},
		{
			path: "/login",
			component: login
		},
		{
			path: "/home",
			component: home,
			children: [{
					path: "/explain",
					component: explain,
					meta: ['说明', '说明']
				},
				{
					path: "/projectList",
					component: projectList,
					meta: ['项目列表', '项目列表']
				},
				{
					path: "/projectadd",
					component: addproject,
					meta: ['项目添加', '项目添加']
				},
				{
					path: "/apiList",
					component: apismanage,
					meta: ['接口管理', '接口列表']
				},
				{
					path: "/testCases",
					component: cases,
					meta: ['用例管理', '用例列表']
				},
				{
					path: "/index",
					component: index,
					meta: ['首页', '首页']
				}
			]
		}
	]

})
