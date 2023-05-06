import { defineStore } from "pinia";

export const userStore = defineStore('userInfo',{
    state:()=>({
        userInfo:{
            userName:"",
            account:"",
            password:"",
            token:""
        }
    }),
    actions:{
         setUserInfo(prams:any){
            this.userInfo = prams
        },
        // getUserInfo(){
        //     console.log(this.userInfo);
        //     return this.userInfo
        // }
    },

    persist: {
        key: 'userInfoStorage',//存储本地的名字
        storage:window.localStorage,//存储地址，可选sessionStorage
        paths:['userInfo','account','password'],//需要持久化的变量
      },
})