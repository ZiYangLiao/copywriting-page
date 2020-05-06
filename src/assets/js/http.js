import axios from 'axios'
import qs from 'qs'

// function setCookie (c_name, value, expiredays) {
// 	var exdate = new Date();
// 	exdate.setDate(exdate.getDate() + expiredays);
// 	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
// }
// if (process.env.NODE_ENV == 'development'){
//     //测试环境设置cookie
//     let cookies = '';
// 	let cookiesArr = cookies.split('; ')
// 	for (let i=0; i< cookiesArr.length; i++){
// 		setCookie(cookiesArr[i].split('=')[0], cookiesArr[i].split('=')[1])
// 	}
// }

// 创建axios实例
export const http = axios.create({
	// baseURL: baseURL, // url = base url + request url //api的base_url
	withCredentials: true, // send cookies when cross-domain requests
	timeout: 10000, // request timeout //请求超时时间
})

// axios请求拦截器
http.interceptors.request.use((config) => {
	
	return config
}, (error) => {
	return Promise.reject(error)
})
// axios响应拦截器
http.interceptors.response.use(function (response) {

	try {
		response.data.resultMsg = JSON.parse(response.data.resultMsg)
	} catch (error){
		// console.log(error)
	}
	// response.isResultTrue = response.isResultTrue || response.resultTrue
	return response.data;
	}, (error) => {
	return Promise.reject(error);
});


//get
function get(url, data) {
	let config = {headers: {'Content-Type': 'appliction/x-www-form-urlencoded'}};
	return http.get(url, {params: data}, config)
}
//post json
function post(url, data, config) {
	return http.post(url, data, config)
}
//post QueryString
function postQS(url, data) {
  let params = qs.stringify(data, {arrayFormat: 'indices'})
  return http.post(url, params)
}


let $http = function(params){
	let {type = '', url, data, config } = params
	type = type.toLowerCase()
	if (type == 'get' && url !== ''){
		return get(url, data)
	}
	if (type == 'post' && url !== ''){
		return post(url, data, config)
	}
	if (type == 'postqs' && url !== ''){
		return postQS(url, data)
	}
	return http(params)
}

$http.get = get
$http.post = post
$http.postQS = postQS

export default $http