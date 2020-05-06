import $http from '@/assets/js/http'
const state = {
}

const mutations = {
   //设置基础信息 
	// SET_BASECONFIG: (state, data) => {
		
	// },
    //设置主题
    // SET_THEME: (state, theme) =>{
    //     if(theme === 'light' || theme === 'dark'){
    //         state.theme = theme;
    //     }
    // }
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
					'content': data.content || '',
					'pageSize': data.pageSize || 12,
					'pageNumber': data.pageNum || 1 ,
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
	loadList: ( state, data ) => {
        console.log(data)
		return new Promise((resolve, reject) => {
			
			$http({
				url: '/wenan/content/key/search/list',
				type: 'get',
				data: {
					content: data.content || '',
					// pageSize: data.pageSize || 12,
					// pageNumber: data.pageNum || 1 ,
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
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}