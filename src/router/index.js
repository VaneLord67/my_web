//引入VueRouter
import VueRouter from 'vue-router'
//引入组件
import Bilibili from '../components/Bilibili'
import Welcome from '../components/Welcome'
import Elec from '../components/Elec'

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	mode: 'history',
	routes:[
		{
            name: 'Bilibili',
			path: '/bilibili',
			component: Bilibili,
		},
		{
			name: 'Welcome',
			path : '/',
			component: Welcome,
		},
		{
			name: 'Elec',
			path : '/elec',
			component: Elec,
		}
	]
})

export default router
