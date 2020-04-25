const state = {
	theme:'dark'
	
	
}

const mutations = {
   //设置基础信息 
	// SET_BASECONFIG: (state, data) => {
		
	// },
    //设置主题
    SET_THEME: (state, theme) =>{
        if(theme === 'light' || theme === 'dark'){
            state.theme = theme;
        }
    }
}

const actions = {
	
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}