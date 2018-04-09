import Vue from 'vue'
import api from '../api'
import store from '../vuex/store'
import login from '@/components/login.vue'
import mysql from '@/components/mysql.vue'
import panel from '@/components/panel.vue'
import hdfs from '@/components/hdfs.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//注册插件
Vue.use(VueResource)
Vue.use(VueRouter)

const routes = [
		{
			path: '/',
			name: 'panel',
			component:panel,
		},
		{
			path:'/login', 
			name:'login',
			component:login
		},
		{
			path: '/mysql',
			name: 'mysql',
			component:mysql,
		},
		{
			path: '/hdfs',
			name: 'hdfs',
			component:hdfs,
		},		
]

const router = new VueRouter({routes, mode:'history'})

// router.beforeEach((to, from, next) => {
// 	if(to.path == '/') {
// 		next({name: panel});
// 	}else if(to.path == '/mysql') {
// 		next({name: content});
// 	}
// })
/*the commented codes is related to the user login*/
// import {showMsg} from '@/lib/vueHelper'
// router.beforeEach((to, from, next) => {
// 	if(to.path == '/login'){
// 		next({name: login})
// 	}else {
// 		const authUser = JSON.parse(window.localStorage.getItem('user'))
// 		//console.log(authUser)
// 		//this check should be more careful
// 		if(!authUser || !authUser.token) {
// 			console.log(">>>>>>>>>>")
// 			next({path: '/login'})
// 		}else {		
// 			api.islogin(authUser.token).then( res => {
// 				if(res.data.msg == 0) {
// 					next({path: '/login'})
// 				}else {
// 					if(!store.state.isLoggedIn) {
// 						store.commit('showlogin')
// 					}
// 					next({name: content})
// 				}
// 			})	
// 		}	
// 	}
// })

export default router;