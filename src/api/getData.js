import axios from 'axios'
import qs from 'qs'
import {getStore} from '@/config/mUtils'

// const headers = {
// 	Authorization: JSON.stringify({
// 		token: getStore('jm_token'),
// 		time: getStore('jm_time')
// 	})
// } 

const headers = function() {
	return {
		Authorization: JSON.stringify({
			token: getStore('jm_token'),
			time: getStore('jm_time')
		})
	}
}

/**
 * 登陆
 */

export const login = data => axios.post('/api/back/staff/login', qs.stringify(data));


/**
 * 获取债权列表
 */

export const getDebtList = data => axios.get('/api/back/debt/list', {
	headers: headers(),
	params: data
});

/**
 * 查询认领人
 */
export const searchClaimant = data => axios.get('/api/back/audit/query/' + data.userId, {
	headers: headers()
}); 

/**
 * 人工分配-确认分配债权
 */

export const confirmAssignDebt = data => axios.post('/api/back/audit/manual/confirm', qs.stringify(data),{
	headers: headers()
});

/**
 * 用户认领审核-分配调整-退回债权
 */

export const sendbackDebt = data => axios.post('/api/back/audit/manual/rollback', qs.stringify(data),{
	headers: headers()
});

/**
 * 获取用户列表
 */

export const getUserList = data => axios.get('/api/back/user/list', {
	headers: headers(),
	params: data
}); 

/**
 * 获取用户审核列表
 */
export const getClaimReviewList = data => axios.get('/api/back/user/audit', {
	headers: headers(),
	params: data
}); 

/**
 * 确认用户认领审核
 */

export const confirmReview = data => axios.post('/api/back/user/audit/confirm', qs.stringify(data),
	{headers: headers(),},
);

/**
 * 获取用户认领审核-查看详情-匹配债权列表
 */
export const getMatchClaimList = data => axios.get('/api/back/debt/audit/detail/list/' + data.id, {
	headers: headers(),
	params: data
}); 

/**
 * 获取用户认领审核-查看详情
 */
export const getConfirmReviewDetail = data => axios.get('/api/back/debt/audit/detail/' + data.id, {
	headers: headers()
}); 

/**
 * 用户认领查询列表
 */
export const getClaimSearchList = data => axios.get('/api/back/user/list/auditpass', {
	headers: headers(),
	params: data
}); 

/**
 * 用户认领查询详情
 */
export const getClaimSearchDetail = data => axios.get('/api/back/debt/audit/detail/' + data.id, {
	headers: headers()
}); 