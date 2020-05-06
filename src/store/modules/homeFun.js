import $http from '@/assets/js/http'
const state = {
	searchVal:'岁月',
	pageNumber: 1,
	totalPage: 1,
	pageSize: 12,
	list:[],
}

const mutations = {
   //设置基础信息 
	// SET_BASECONFIG: (state, data) => {
		
	// },
    //设置主题
    SET_LISTINFO: (state, data) => {
		console.log(data)
		state.pageNumber = data.pageNumber || 1;
		state.pageSize = data.pageSize || 12;
		state.totalPage = Math.ceil(data.pageSize/data.total);
		state.list = data.data;
    }
}

const actions = {
    // 添加文案数据
    addItem: (state, data) => {
        console.log(data)
		return new Promise((resolve, reject) => {
			
			$http({
				url: '/wenan/content/key/search/list',
				type: 'get',
				data: {
					'content': data.content || state.searchVal,
					'pageSize': data.pageSize || state.pageSize,
					'pageNumber': data.pageNumber || state.pageNumber,
				},
			}).then(res => {
                console.log(res,'获取列表')
				if (!res || !res.isResultTrue){
					reject(new Error('获取列表失败'))
					return
				}
				
				if (!(res.resultMsg instanceof Array)){
					resolve(false)
					return
				}
				resolve(true)
			})
		})
    },
    //加载list数据
	loadList: ( {state, commit}, data ) => {
		return new Promise((resolve, reject) => {
			
			$http({
				url: '/wenan/content/key/search/list',
				type: 'get',
				data: {
					content: data.content || state.searchVal,
					pageSize: data.pageSize || state.pageSize,
					pageNumber: data.pageNumber || state.pageNumber,
				},
			}).then(res => {
                console.log(res,'获取列表')
				if (!res || res.code !== 200 || res.msg !== 'success'){
					reject(new Error('获取列表失败'))
					return
				}
				
				if (!(res.data.data instanceof Array)){
					resolve(false)
					return
				}
				resolve(res.data)
				commit('SET_LISTINFO', res.data)
			})
		})
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}