import vue from 'vue'
import router from 'vue-router'
vue.use(router)
// 获取原型对象push函数
const originalPush = router.prototype.push

// 获取原型对象replace函数
const originalReplace = router.prototype.replace

// 修改原型对象中的push函数
router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 修改原型对象中的replace函数
router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

// // 定义路由守卫  
// const guard = async (to, from, next) => {  
//     // 检查用户是否已登录，这里可以根据实际情况进行判断，例如从localStorage中获取用户的登录状态  
//     let userIsLoggedIn = sessionStorage.getItem('userInfo');  
//     console.log(sessionStorage.getItem('userInfo'),'2222222222222222222');
//     if (userIsLoggedIn==undefined||userIsLoggedIn==null) {  
//       // 用户未登录，跳转到404页面  
//       next({ name: 'weizhiyemian' }); // 假设NotFoundComponent是404页面组件，通过name进行跳转  
//     } else {  
//       // 用户已登录，继续导航到目标页面  
//       next();  
//     }  
//   };  
const router1 = new router({
    routes: [{
        path: '/study002',
        name: 'study002',
        component: () => import('@/test/study002'),
        children: []
    },
    {
        path: '/study005',
        name: 'study005',
        component: () => import('@/test/study005'),
        children: []
    },
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login'),
        children: []
    },

    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/views/welcome'),
        // meta:{
        //     requireAuth:true
        // },
        children: []
    },

    {
        path: '/mjjShow',
        name: 'mjjShow',
        component: () => import('@/views/a11_mjjShow/index'),
        children: []
    },
    {
        path: '/mjjShowDa',
        name: 'mjjShowDa',
        component: () => import('@/views/a11_mjjShow/mjjShowDa'),
        children: []
    },


    {
        path: '/example',
        component: () => import('@/layout/index'),
        redirect: '/example/a02_dagl',
        name: 'Example',
        meta: {
            title: 'Example',
            icon: 'el-icon-s-help'
        },
        children: [{
            path: 'a02_dagl',
            name: 'a02_dagl',
            component: () => import('@/views/a02_dagl/index'),
            meta: {
                title: '档案管理',
                icon: 'table'
            }
        },]
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
        children: [
            {
                path: '/systemLog/userLog',
                name: 'user',
                component: () => import('@/views1/log/userLog'),
            },
            {
                path: '/systemLog/systemLog',
                name: 'user',
                component: () => import('@/views1/log/systemLog'),
            },
            {
                path: '/systemLog/archiveAmendLog',
                name: 'user',
                component: () => import('@/views1/log/archiveAmendLog'),
            },
            {
                path: '/user/userzhong',
                name: 'user',
                component: () => import('@/views1/user/userzhong'),
            },
            {
                path: '/user/memessage',
                name: 'user',
                component: () => import('@/views1/user/memessage'),
            },
            {
                path: '/user/jiankong',
                name: 'user',
                component: () => import('@/views1/user/jiankong'),
            },
            {
                path: '/daglform',
                name: 'daglform',
                component: () => import('@/views/a02_dagl/form2'),
                children: [{
                    path: '/dagl',
                    name: 'dagl',
                    component: () => import('@/views/a02_dagl/index'),
                    children: []
                }]
            },
            {
                path: '/daglform1',
                name: 'daglform1',
                component: () => import('@/views/a02_dagl/form1'),
                children: [{
                    path: '/recycle',
                    name: 'recycle',
                    component: () => import('@/views/a02_dagl/recycle'),
                    children: []
                }]
            },
            {
                path: '/spjk',
                name: 'spjk',
                component: () => import('@/views/a04_spjk/index'),
                children: []
            },
            {
                path: '/znmj',
                name: 'znmj',
                component: () => import('@/views/a06_znmj/index'),
                children: []
            },
            {
                path: '/zndg',
                name: 'zndg',
                component: () => import('@/views/a07_zndg/wrkfkzq/index'),
                children: []
            },
            {
                path: '/zndgNew',
                name: 'zndg',
                component: () => import('@/views/a07_zndg/wrkfkzqNew/index'),
                children: []
            },
            {
                path: '/kfdh',
                name: 'kfdh',
                component: () => import('@/views/a09_kfdh/index'),
                children: []
            },
            {
                path: '/form2',
                name: 'form2',
                component: () => import('@/views/a03_mjjkz/form2'),
                children: [{
                    path: '/mjjkz',
                    name: 'mjjkz',
                    component: () => import('@/views/a03_mjjkz/index'),
                    children: []
                }]
            },
            {
                path: '/storeedit',
                name: 'storeedit',
                component: () => import('@/views/a00_config/storeedit'),
                children: []
            },
            {
                path: '/config_wr',
                name: 'config_wr',
                component: () => import('@/views/a00_config/config_wr'),
                children: []
            },
            {
                path: '/ceshi',
                name: 'ceshi',
                component: () => import('@/views/a00_config/ceshi.vue'),
                children: []
            },
            // {
            //     path: '/mobanset',
            //     name: 'mobanset',
            //     component: () => import('@/views/a02_dagl/mobanset'),
            //     children: []
            // },


            // {
            //     path: '/daglform',
            //     name: 'daglform',
            //     component: () => import('@/views/a02_dagl/form2'),
            //     children: [{
            //         path: '/mobanset',
            //         name: 'mobanset',
            //         component: () => import('@/views/a02_dagl/mobanset'),

            //     }]
            // },


            {
                path: '/daglform3',
                name: 'daglform3',
                component: () => import('@/views/a02_dagl/form3'),
                children: [{
                    path: '/mobanset',
                    name: 'mobanset',
                    component: () => import('@/views/a02_dagl/mobanset'),
                    children: []
                }]
            },

            // {
            //     path: '/daglform',
            //     name: 'daglform',
            //     component: () => import('@/views/a02_dagl/form2'),
            //     children: [{
            //         path: '/dagl',
            //         name: 'dagl',
            //         component: () => import('@/views/a02_dagl/index'),
            //         children: []
            //     }]
            // },


            {
                path: '/daglform4',
                name: 'daglform4',
                component: () => import('@/views/a02_dagl/form4'),
                // redirect: '/mobansettwo',
                children: [{
                    path: '/mobansettwo',
                    name: 'mobansettwo',
                    component: () => import('@/views/a11_box/index'),
                    children: []
                }]
            },
            {
                path: '/download',
                name: 'download',
                component: () => import('@/views/a10_downLoad/index'),
                children: []
            },
            {
                path: '/role/toRole',
                name: 'role',
                component: () => import('@/views1/configuration/role'),
            },
            {
                path: '/user/toUser',
                name: 'user',
                component: () => import('@/views1/user/user'),
            },
            {
                path: '/userConfig/toUserConfig',
                name: 'user',
                component: () => import('@/views1/user/notification'),
            },

            {
                path: '/hjjk1',
                name: 'hjjk1',
                redirect: '/hjjk',
                component: () => import('@/views/a01_hjjk/ContentView/index'),
                // meta:{
                //     requireAuth:true
                // },
                children: [
                    {
                        path: '/hjjk',
                        name: 'hjjk',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/wrkfkzqview/index'),
                        // meta:{
                        //     requireAuth:true
                        // },
                        children: []
                    },
                    {
                        path: '/hjjk1-2',
                        name: 'hjjk1-2',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/wrkfkzqview/index1'),
                        children: []
                    },
                    {
                        path: '/hjjk1-3',
                        name: 'hjjk1-3',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/wrkfkzqview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk1-4',
                        name: 'hjjk1-4',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/wrkfkzqview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ytjview/index',
                        name: '/hjjk/wrkfkzq/ytjview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ytjview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ytjview/report',
                        name: '/hjjk/wrkfkzq/ytjview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ytjview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ytjview/chart',
                        name: '/hjjk/wrkfkzq/ytjview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ytjview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ycyview/index',
                        name: '/hjjk/wrkfkzq/ycyview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ycyview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ycyview/report',
                        name: '/hjjk/wrkfkzq/ycyview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ycyview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ycyview/chart',
                        name: '/hjjk/wrkfkzq/ycyview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ycyview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/sxqtjhjview/index',
                        name: '/hjjk/wrkfkzq/sxqtjhjview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/sxqtjhjview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/sxqtjhjview/report',
                        name: '/hjjk/wrkfkzq/sxqtjhjview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/sxqtjhjview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/sxqtjhjview/chart',
                        name: '/hjjk/wrkfkzq/sxqtjhjview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/sxqtjhjview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ptytjview/index',
                        name: '/hjjk/wrkfkzq/ptytjview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ptytjview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ptytjview/report',
                        name: '/hjjk/wrkfkzq/ptytjview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ptytjview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ptytjview/chart',
                        name: '/hjjk/wrkfkzq/ptytjview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ptytjview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/jsqview/index',
                        name: '/hjjk/wrkfkzq/jsqview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/jsqview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/jsqview/report',
                        name: '/hjjk/wrkfkzq/jsqview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/jsqview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/jsqview/chart',
                        name: '/hjjk/wrkfkzq/jsqview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/jsqview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/jmktview/index',
                        name: '/hjjk/wrkfkzq/jmktview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/jmktview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/jmktview/report',
                        name: '/hjjk/wrkfkzq/jmktview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/jmktview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/jmktview/chart',
                        name: '/hjjk/wrkfkzq/jmktview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/jmktview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/jkytfhjview/index',
                        name: '/hjjk/wrkfkzq/jkytfhjview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/jkytfhjview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/jkytfhjview/report',
                        name: '/hjjk/wrkfkzq/jkytfhjview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/jkytfhjview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/jkytfhjview/chart',
                        name: '/hjjk/wrkfkzq/jkytfhjview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/jkytfhjview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/hwktview/index',
                        name: '/hjjk/wrkfkzq/hwktview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/hwktview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/hwktview/report',
                        name: '/hjjk/wrkfkzq/hwktview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/hwktview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/hwktview/chart',
                        name: '/hjjk/wrkfkzq/hwktview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/hwktview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/bgsxfjview/index',
                        name: '/hjjk/wrkfkzq/bgsxfjview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/bgsxfjview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/bgsxfjview/report',
                        name: '/hjjk/wrkfkzq/bgsxfjview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/bgsxfjview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/bgsxfjview/chart',
                        name: '/hjjk/wrkfkzq/bgsxfjview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/bgsxfjview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/csqview/index',
                        name: '/hjjk/wrkfkzq/csqview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/csqview/index'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/csqview/report',
                        name: '/hjjk/wrkfkzq/csqview/report',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/csqview/report'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/csqview/chart',
                        name: '/hjjk/wrkfkzq/csqview/chart',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/csqview/chart'),
                        children: []
                    },
                    {
                        path: '/hjjk/wrkfkzq/ddclview/index',
                        name: '/hjjk/wrkfkzq/ddclview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/ddclview/index'),
                        children: []
                    },

                    {
                        path: '/hjjk/wrkfkzq/zdysbview/index',
                        name: '/hjjk/wrkfkzq/zdysbview/index',
                        component: () => import('@/views/a01_hjjk/wrkfkzq/zdysbview/index'),
                        children: []
                    },
                ]
            },
            {
                path: '/sfgz1',
                name: 'sfgz1',
                redirect: '/sfgz',
                component: () => import('@/views/a05_sfgz/ContentView/index'),
                children: [
                    {
                        path: '/sfgz',
                        name: 'sfgz',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_wrkfkzqview/index'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_wrkfkzqview/index1',
                        name: '/sfgz/wrkfkzq/gz_wrkfkzqview/index1',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_wrkfkzqview/index1'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_hjcxview/index',
                        name: '/sfgz/wrkfkzq/gz_hjcxview/index',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_hjcxview/index'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_fdview/index',
                        name: '/sfgz/wrkfkzq/gz_fdview/index',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_fdview/index'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_fdview/report',
                        name: '/sfgz/wrkfkzq/gz_fdview/report',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_fdview/report'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_fgview/index',
                        name: '/sfgz/wrkfkzq/gz_fgview/index',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_fgview/index'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_fgview/report',
                        name: '/sfgz/wrkfkzq/gz_fgview/report',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_fgview/report'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_lsview/index',
                        name: '/sfgz/wrkfkzq/gz_lsview/index',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_lsview/index'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_lsview/report',
                        name: '/sfgz/wrkfkzq/gz_lsview/report',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_lsview/report'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_qsview/index',
                        name: '/sfgz/wrkfkzq/gz_qsview/index',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_qsview/index'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_qsview/report',
                        name: '/sfgz/wrkfkzq/gz_qsview/report',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_qsview/report'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_ygview/index',
                        name: '/sfgz/wrkfkzq/gz_ygview/index',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_ygview/index'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_ygview/report',
                        name: '/sfgz/wrkfkzq/gz_ygview/report',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_ygview/report'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_zdview/index',
                        name: '/sfgz/wrkfkzq/gz_zdview/index',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_zdview/index'),
                        children: []
                    },
                    {
                        path: '/sfgz/wrkfkzq/gz_zdview/report',
                        name: '/sfgz/wrkfkzq/gz_zdview/report',
                        component: () => import('@/views/a05_sfgz/wrkfkzq/gz_zdview/report'),
                        children: []
                    },
                ]
            },
        ]
    },
    {
        path: '/dsj',
        name: 'dsj',
        component: () => import('@/views/a08_dsj2/Countingcar'),
        children: []
    },
    {
        path: '/dsj3',
        name: 'dsj3',
        component: () => import('@/views/a08_dsj2/gzjsc'),
        children: []
    },
    // {
    //     path: '/dsj1',
    //     name: 'dsj1',
    //     component: ()=>import('@/views/a08_dsj1/dsj'),
    //     children:[
    //     ]
    // },
    {
        path: '/text',
        name: 'text',
        component: () => import('@/views/text'),
    },
    {
        path: '/hjcs',
        name: 'hjcs',
        component: () => import('@/views2/hjcs'),
    },
    {
        path: '/authority',
        name: 'authority',
        component: () => import('@/views2/authority/authority'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views2/registerCode/register'),
    },
    {
        path: '/noAccessAuthority',
        name: 'noAccessAuthority',
        component: () => import('@/views2/error/noAccessAuthority'),
    },
    {
        path: '/noVersionAuthority',
        name: 'noVersionAuthority',
        component: () => import('@/views2/error/noVersionAuthority'),
    },
    {
        path: '/upload',
        name: 'upload',
        component: () => import('@/views/a02_dagl/upload'),
    },
    //     {
    //         path: '/w',
    //    ,     name: 'w',
    //         component: () => import('@/views/a02_dagl/w'),
    //     }
    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        // hidden: true
    },
    {
        path: '/404',
        name: '404',
        meta: {
            title: 'Page not found',
            isLogin: false
        },
        component: () => import('@/views/404'),
        // hidden: true
    },

    ],
    // beforeEach: (to, from, next) => {  
    //     // 对所有路由进行守卫处理，可以在这里根据需要进行其他逻辑处理  
    //     guard(to, from, next);  
    //   }  
})
// router1.addRoute({  
//     path: '/404',  
//     name: '404',  
//     component: () => import('@/views/404.vue')  
//   })  
// 定义全局前置守卫  
// router1.beforeEach((to, from, next) => {  
//     // 检查用户是否已登录，这里可以根据实际情况进行判断，例如从localStorage中获取用户的登录状态  
//     let userIsLoggedIn = sessionStorage.getItem('userInfo');  
//     if (userIsLoggedIn==undefined) {  
//       // 用户未登录且目标路由需要认证，保持当前页面不变  
//     next({ name: '/404' }); 
//     } else {  
//       // 用户已登录或目标路由不需要认证，继续导航到目标页面  
//       next();  
//     }  
//   }); 
// 定义路由白名单  
const whiteList = ['/login', '/mjjShow','/mjjShowDa'];


router1.beforeEach((to, from, next) => {
    if (whiteList.indexOf(to.path) !== -1) {
        // 如果在白名单中，则直接访问该页面  
        next();
    } else {
        let userIsLoggedIn = sessionStorage.getItem('userInfo');
        if (userIsLoggedIn != null || to.path === '/') {//有token或者在login页面下通行
            next();
        } else {

            next('/');
            alert('无权访问,请登录');
        }
    }


})

export default router1
