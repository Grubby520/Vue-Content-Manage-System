# manage-system #
基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案。

该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Content Management System）开发。基于vue.js,使用vue-cli脚手架快速生成项目目录，引用Element UI组件库，方便开发快速简洁好看的组件。分离颜色样式。

## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 表格
- [x] 表单
- [x] 图表 :echarts:
- [x] 富文本编辑器
- [x] markdown编辑器
- [x] 图片拖拽/裁剪上传
- [x] 支持切换主题色 :sparkles:
- [x] 列表拖拽排序


## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- components                   // 组件
	|       |-- common                   // 公共组件
	|           |-- Header.vue           // 公共头部
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- Sidebar.vue          // 公共左边栏
	|		|-- page                   	 // 主要路由页面
	|           |-- BaseCharts.vue       // 基础图表
	|           |-- BaseForm.vue         // 基础表单
	|           |-- BaseTable.vue        // 基础表格
	|           |-- Login.vue          	 // 登录
	|           |-- Markdown.vue         // markdown组件
	|           |-- Readme.vue           // 自述组件
	|           |-- Upload.vue           // 图片上传
	|           |-- VueEditor.vue        // 富文本编辑器
	|           |-- VueTable.vue         // vue表格组件
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明


## 安装步骤 ##

	git clone https://github.com/Grubby520/Vue-Content-Manage-System.git      // 把模板下载到本地
	Vue-Content-Manage-System    // 进入模板目录
	npm install                  // 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8888
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build

## 组件使用说明与演示 ##

### element-ui ###
一套基于vue.js2.0的桌面组件库。访问地址：[element](http://element.eleme.io/#/zh-CN/component/layout)

### vue-datasource ###
一个用于动态创建表格的vue.js服务端组件。访问地址：[vue-datasource](https://github.com/coderdiaz/vue-datasource)

### Vue-Quill-Editor ###
基于Quill、适用于Vue2的富文本编辑器。访问地址：[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

### Vue-SimpleMDE ###
Vue.js的Markdown Editor组件。访问地址：[Vue-SimpleMDE](https://github.com/F-loat/vue-simplemde)

### Vue-Core-Image-Upload ###
一款轻量级的vue上传插件，支持裁剪。访问地址：[Vue-Core-Image-Upload](https://github.com/Vanthink-UED/vue-core-image-upload)
