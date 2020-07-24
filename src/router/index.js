import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const userInfo = r => require.ensure([], () => r(require('@/views/user_manage/userInfo')), 'userInfo');
const debtList = r => require.ensure([], () => r(require('@/views/debt_manage/debtList')), 'debtList');
const claimReview = r => require.ensure([], () => r(require('@/views/claim_manage/claimReview')), 'claimReview');
const claimReviewDetail = r => require.ensure([], () => r(require('@/views/claim_manage/claimReviewDetail')), 'claimReviewDetail');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/userInfo',
			component: userInfo,
			meta: ['用户管理', '用户信息'],
		},{
			path: '/debtList',
			component: debtList,
			meta: ['债权管理', '债权列表'],
		},{
			path: '/claimReview',
			component: claimReview,
			meta: ['用户认领管理', '用户认领审核'],
		},{
			path: '/claimReviewDetail/:id',
			component: claimReviewDetail,
			meta: ['用户认领管理', '用户认领审核', '查看详情'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
