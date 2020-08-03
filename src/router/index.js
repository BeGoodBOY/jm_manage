import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const userInfo = r => require.ensure([], () => r(require('@/views/user_manage/userInfo')), 'userInfo');
const debtList = r => require.ensure([], () => r(require('@/views/debt_manage/debtList')), 'debtList');
const debtListToBeAssigned = r => require.ensure([], () => r(require('@/views/debt_manage/debtListToBeAssigned')), 'debtListToBeAssigned');
const debtListAssignedSuccess = r => require.ensure([], () => r(require('@/views/debt_manage/debtListAssignedSuccess')), 'debtListAssignedSuccess');
const claimReview = r => require.ensure([], () => r(require('@/views/claim_manage/claimReview')), 'claimReview');
const claimReviewDetail = r => require.ensure([], () => r(require('@/views/claim_manage/claimReviewDetail')), 'claimReviewDetail');
const claimReviewAllocationAdjustment = r => require.ensure([], () => r(require('@/views/claim_manage/claimReviewAllocationAdjustment')), 'claimReviewAllocationAdjustment'); 
const claimSearch = r => require.ensure([], () => r(require('@/views/claim_manage/claimSearch')), 'claimSearch');
const claimSearchDetail = r => require.ensure([], () => r(require('@/views/claim_manage/claimSearchDetail')), 'claimSearchDetail');

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
			path: '/debtListToBeAssigned',
			component: debtListToBeAssigned,
			meta: ['债权管理', '债权待分配列表'],
		},{
			path: '/debtListAssignedSuccess',
			component: debtListAssignedSuccess,
			meta: ['债权管理', '债权分配成功列表'],
		},{
			path: '/claimReview',
			component: claimReview,
			meta: ['用户认领管理', '用户认领审核'],
		},{
			path: '/claimReviewDetail/:id',
			component: claimReviewDetail,
			meta: ['用户认领管理', '用户认领审核', '查看详情'],
		},{
			path: '/claimReviewAllocationAdjustment/:id',
			component: claimReviewAllocationAdjustment,
			meta: ['用户认领管理', '用户认领审核', '分配调整'],
		},{
			path: '/claimSearch',
			component: claimSearch,
			meta: ['用户认领管理', '用户认领查询'],
		},{
			path: '/claimSearchDetail/:id',
			component: claimSearchDetail,
			meta: ['用户认领管理', '用户认领查询', '认领查询详情'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
