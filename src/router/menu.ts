export default [
    {
        path: '/home',
        name: '破镜之刃',
        component: ()=>import('@/views/home.vue')
    },
    {
        path: '/firstPage',
        name: '星辰之子',
        component: ()=>import('@/views/firstPage.vue')
    },
    {
        path: '/secondPage',
        name: '鲨之猎刃',
        component: ()=>import('@/views/secondPage.vue')
    },
    {
        path: '/test',
        name: '试炼场',
        component: ()=>import('@/views/test/index.vue'),
        children:[
            {
                path: '/tab1',
                name: 'tab1',
                component: ()=>import('../views/test/tab1/tab1.vue')
            },
            {
                path: '/tab2',
                name: 'tab2',
                component: ()=>import('../views/test/tab2/tab2.vue'),
            }
        ]
    }
]