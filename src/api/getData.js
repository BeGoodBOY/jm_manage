import fetch from '@/config/fetch'
import axios from 'axios'
import qs from 'qs'
import {getStore} from '@/config/mUtils'

const headers = {
	Authorization: JSON.stringify({
		token: getStore('jm_token'),
		time: getStore('jm_time')
	})
} 

/**
 * 登陆
 */

export const login = data => axios.post('/api/back/staff/login', qs.stringify(data));

/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');

/**
 * 获取债权列表
 */

export const getDebtList = data => axios.get('/api/back/debt/list', {
	headers,
	params: data
}); 

/**
 * 获取用户列表
 */

export const getUserList = data => axios.get('/api/back/user/list', {
	headers,
	params: data
}); 

/**
 * 获取用户审核列表
 */
export const getClaimReviewList = data => axios.get('/api/back/user/audit', {
	headers,
	params: data
}); 

/**
 * 确认用户认领审核
 */

export const confirmReview = data => axios.post('/api/back/user/audit/confirm', qs.stringify(data),
	{headers},
);

/**
 * 获取用户认领审核-查看详情-匹配债权列表
 */
export const getMatchClaimList = data => axios.get('/api/back/debt/audit/detail/list/' + data.id, {
	headers,
	params: data
}); 

/**
 * 获取用户认领审核-查看详情
 */
export const getConfirmReviewDetail = data => axios.get('/api/back/debt/audit/detail/' + data.id, {
	headers
}); 

