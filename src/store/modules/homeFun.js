import $http from '@/assets/js/http';
import { Tuzki } from "@jsUrl/common.js";
const state = {
	searchVal: '',
	pageNumber: 0,
	totalPage: 0,
	pageSize: 12,
	homeList: [],
}

const mutations = {
	//设置
	SET_SEARCHVAL: (state, data) => {
		state.searchVal = data;
	},
	//设置
	SET_LISTINFO: (state, data) => {
		console.log(data)
		state.pageNumber = data.pageNumber || 0;
		state.pageSize = data.pageSize || 12;
		state.totalPage = Math.floor(data.total / data.pageSize);
		console.log(state)
	},
	RESET_LIST: (state) => {
		state.homeList = [];
	},
	PUSH_LIST: (state, list) => {
		if (list instanceof Array && list.length > 0) {
			list.map(item => {
				state.homeList.push(item)
			})
		} else {
			state.homeList.unshift(list)
		}
	}
}

const actions = {
	// 添加文案数据
	addItem: ({ commit }, data) => {
		console.log(data)
		return new Promise((resolve, reject) => {
			$http({
				url: '/wenan/content/add',
				type: 'post',
				data: {
					content: data.content,
					label: data.label
				},
			}).then(res => {
				console.log(res, '添加数据')
				if (!res || res.code !== 200 || res.msg !== 'success') {
					reject(new Error('添加数据失败'))
					return
				}
				commit('PUSH_LIST', data)
				resolve(true)
			})
		})
	},
	//加载list数据
	loadList: ({ state, commit }, data) => {
		return new Promise((resolve, reject) => {

			$http({
				url: '/wenan/content/key/search/list',
				type: 'get',
				data: {
					content: data.content,
					pageSize: data.pageSize || state.pageSize,
					pageNumber: data.pageNumber || state.pageNumber,
				},
			}).then(res => {
				console.log(res, '获取列表')
				if (!res || res.code !== 200 || res.msg !== 'success') {
					reject(new Error('获取列表失败'))
					return
				}

				if (!(res.data.data instanceof Array)) {
					resolve(false)
					return
				}
				resolve(res.data);
				let arr = res.data.data;
				arr.map(item => {
					item.color = item.color || Tuzki.getColor();
					item.imageUrl = item.imageUrl || Tuzki.getImgUrl();
				})
				if (res.data.pageNumber === 0) {
					commit('RESET_LIST')
				}
				commit('SET_SEARCHVAL', data.content);
				commit('SET_LISTINFO', res.data);
				commit('PUSH_LIST', arr)
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