import vue from 'vue'        //引入vue.js文件
import element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'  //引入当前目录下的app.vue文件
import router from './router'//引入当前目录下router文件夹下的index.js文件
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import dayjs from 'dayjs'
import store from './store'
// 设置浏览器标题

vue.config.productionTip = false
vue.use(element, { size: 'small', zIndex: 3000 });
vue.use(dataV)
// 默认方式
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

//ElementUI推荐方式
// new Vue({
//   el: '#app',
//   render: h => h(App)
// });
vue.directive('title', {
    inserted: function (el, binding) {
      document.title = el.dataset.title
    }
  })
// 引入右键弹出菜单组件
import VueContextMenu from 'vue-contextmenu'
vue.use(VueContextMenu)

import md5 from 'js-md5';
vue.prototype.$md5 = md5;
vue.prototype.dayjs = dayjs;
//Excel数据导出
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
vue.prototype.$FileSaver = FileSaver; //设置全局
vue.prototype.$XLSX = XLSX; //设置全局

// //wsc 2023-12-19 使用router.beforeEach注册一个全局前置守卫，判断用户是否登录。
// //在 router/index.js里增加 meta:{ requireAuth:true }, 目前只   hjjk  welcome 已判断
// router.beforeEach((to,from,next)=>{//从cookie中取值并给vux中的token赋值
//   // store.commit('username', document.cookie)//如果vux有值就讲登录状态改成1
//   let cookieArray =  document.cookie.split('; ')
//   let cookieName = ''
//   for (let i = 0; i < cookieArray.length; i++) {
//     let cookiePair = cookieArray[i].split('=');
//     // 去除空格并判断cookie名称是否匹配
//     if (cookiePair[0].trim() === 'username') {
//       cookieName = cookiePair[1]
//     }
//   }
//   console.log('cookiePair[1]',cookieName);
//   console.log('tototo',to);
//   console.log('tototo',to.meta.requireAuth);
//   if(cookieName){
//     // store.commit('changIsSignIn',1)
//   }//判断是否为true，如果为true就是要登录，去判断token是否存在。存在就执行，不存在就跳转登录页面
//   if(to.meta.requireAuth){
//     if(cookieName){
//       next()
//     }else{
//       next({path:'/'})
//     }
//   }else{
//     next()
//   }
// })

import * as echarts from 'echarts'
import { GridComponent } from 'echarts/components';
echarts.use([GridComponent]);
/* 第一次教程里定义的方法 */
new vue({
 el: '#app',
 router,//指定路由的js对象
 store,
 render: h => h(App)
})
