export default [
    {
        path: '',
        name: '训练营',
        children:[
            {
                path: '/test',
                name: '一号训练场',
                component: ()=>import('@/views/testHouse/test/index.vue')
            },
            {
                path: '',
                name: '二号训练场',
                children:[
                    {
                        path: '/test2',
                        name: '还没想好要练什么',
                        component: ()=>import('@/views/testHouse/test2/testInTest/index.vue')
                    }
                ]
            }
        ]
    },
]