
// const baseUrl = 'http://192.168.2.11:8080'

// let requestTimes = 0; //并发请求次数
// /*
//  * 后端请求工具简单封装
//  * @param {*} params 
//  */
// const requestUtil = (params)=>{

//     requestTimes++;
//     wx.showLoading({
//       title: '加载中',
//       mask:true
//     })

//     const token = wx.getStorageSync('token');
//     return new Promise((resolve,reject)=>{
        
//         wx.request({
//           ...params,
//           header:{"Authorization":token},
//           success:(result)=>{
//             // debugger
//             checkAuth(result)
//             resolve(result)
//           },
//           fail:(err)=>{
//             reject(err)
//           },
//           complete:()=>{
//               requestTimes--;
//               if(requestTimes==0){
//                 wx.hideLoading() // 关闭加载图标
//               }
//             }
//         })
//     })
// }

// const checkAuth = (resp)=>{
//   if(resp.data.code === '493'){
//     wx.redirectTo({
//       url: '/pages/auhtor/index',
//     })
//     console.log("需要重新登录")
//   }
// }

// const wxLogin=()=>{
//   return new Promise((resolve,reject)=>{
//     wx.login({
//       timeout: 6000,
//       success: (res) => {
//         resolve(res)
//       },
//       fail:(err)=>{
//         reject(err)
//       }
//     })
//   })
// }

// /**
//  * 微信小程序公告 wx.getUserProfile 作废
//  */
// const wxUserProfile=()=>{
//   return new Promise((resolve,reject)=>{
//     wx.getUserProfile({
//       desc: '获取用户信息',
//       success: (res) => {
//         resolve(res)
//       },
//       fail:(err)=>{
//         reject(err)
//       }
//     })
//   })
// }

// export {
//     requestUtil,
//     baseUrl,
//     wxLogin,
// }