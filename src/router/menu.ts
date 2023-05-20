export default [
    {
        path: '/uploadPage',
        name: '首页',
        component: ()=>import('@/views/upload-page/index.vue')
    },
    {
        path: '',
        name: '用户管理',
        children:[
            {
                path: '/user',
                name: '账户管理',
                component: ()=>import('@/views/user/account/index.vue')
            },
        ]
    },
    {
        path: '',
        name: '作品管理',
        children:[
            {
                path: '/file',
                name: '作品管理',
                component: ()=>import('@/views/file/file/index.vue')
            },
            {
                path: '/great',
                name: '优秀作品',
                component: ()=>import('@/views/file/great-file/index.vue')
            },
        ]
    },
]