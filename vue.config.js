
const path = require('path');
function resolve (dir) {
	return path.join(__dirname, dir)
}
// 项目的主要配置文件

// const target =  'http://120.24.43.178:8000/wenan/content/'
const target =  'https://www.wenan.life/'
module.exports = {
	// webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
	publicPath: './',
	outputDir: '../dist',
	assetsDir: 'lazStatic',
	runtimeCompiler: true,
	// lintOnSave: 'warning',
	lintOnSave: true,
	devServer: {
		disableHostCheck: false,
		open: true,
		// host: 'localhost',
		port: 3000,   
		https: false,
		hotOnly: false,
		proxy: {
			'/wenan/content/key/search/list': {
				target: target,
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': '',
				}
			},
			'/wenan/content/add': {
				target: target,
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': '',
				}
			}
		},
		before: () => {
		},
	},
	chainWebpack: (config)=>{
		//修改文件引入自定义路径
		config.resolve.alias
				.set('@', resolve('src'))
				.set('@cssUrl', resolve('src/assets/css'))
				.set('@jsUrl', resolve('src/assets/js'))
				.set('@imgUrl', resolve('src/assets/img'))
				
	},
	// 生产环境 sourceMap
	productionSourceMap: false,
	// 配置高于chainWebpack中关于 css loader 的配置
	css: {
		// 是否开启支持 foo.module.css 样式
		// modules: false,//modules 更换成 requireModuleExtension 
		requireModuleExtension: true, //vue-cli-3 推荐使用requireModuleExtension

		// 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
		extract: true,

		// 是否构建样式地图，false 将提高构建速度
		sourceMap: false,
		// css预设器配置项
		// loaderOptions: {
		//     css: {
		//         // options here will be passed to css-loader
		//     },
		//     postcss: {
		//         // options here will be passed to postcss-loader

		//     },
		//     scss: {

		//     }
		// }
	},
	
}