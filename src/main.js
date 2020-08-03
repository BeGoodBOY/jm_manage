import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

Vue.config.productionTip = false;

Vue.use(ElementUI);
// 504
axios.interceptors.response.use(function (res) {
	if (res.status === 504 || res.status === 401) {
		this.$message({
			type: "error",
			message: '登陆失效请重新登陆'
		});
		router.push('/')
	}
	return res;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

new Vue({
	el: '#app',
	router,
	// store,
	template: '<App/>',
	components: { App }
})
