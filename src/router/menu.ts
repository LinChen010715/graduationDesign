export default [
    // {
    //     path: '',
    //     name: '训练营',
    //     children:[
    //         {
    //             path: '/test',
    //             name: '一号训练场',
    //             component: ()=>import('@/views/testHouse/test/index.vue')
    //         },
    //         {
    //             path: '',
    //             name: '二号训练场',
    //             children:[
    //                 {
    //                     path: '/test2',
    //                     name: '还没想好要练什么',
    //                     component: ()=>import('@/views/testHouse/test2/testInTest/index.vue')
    //                 }
    //             ]
    //         }
    //     ]
    // },
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
                component: ()=>import('@/views/user/account/index.vue')
            },
            {
                path: '/great',
                name: '优秀作品',
                component: ()=>import('@/views/user/account/index.vue')
            },
        ]
    },
]