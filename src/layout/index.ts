import { defineStore } from "pinia";

export const userStore = defineStore('userInfo',{
    state:()=>({
        userInfo:{
            userName:"",
            account:"",
            password:""
        }
    }),
    actions:{
         setUserInfo(prams){
            this.userInfo = prams
        }
    },

    persist: {
        key: 'userInfoStorage',//存储本地的名字
        storage:window.localStorage,//存储地址，可选sessionStorage
        paths:['userInfo','account','password'],//需要持久化的变量
      },
})