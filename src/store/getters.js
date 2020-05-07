const getters = {
	theme: state => state.baseConfig.theme,
	searchVal: state => state.homeFun.searchVal,//搜索框的值
	pageNumber: state => state.homeFun.pageNumber,
	totalPage: state => state.homeFun.totalPage,
	homeList: state => state.homeFun.homeList
}
export default getters
  