// const baseUrl = "http://192.168.2.11:8080";
// const loginPage = "/pages/author/index"
// const reLoginUrl = "/user/reLogin"

// const expired_code = 493 //为token过期状态需要重新获取token
// const unlogin_code = 401 //为用户未登陆状态，需要走登录逻辑
 
// const http = ({
//   url = '',
//   param = {},
//   type = 'json',
//   callback = '',
//   ...other
//   // 没传的时候默认为一个空对象 ({url = '',}={})
// } = {}) => {
//   wx.showLoading({
//     title: '请求中...',
//   })
//   let timeStart = Date.now();
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: baseUrl + url,
//       data: param,
//       header: {
//         'content-type': type == 'json' ? 'application/json' : 'application/x-www-form-urlencoded',
//         'Authorization': getToken(),
//         // 'openid': getOpenid() || getCouldOpenid().then(openid => openid)
//         // 'openid': getOpenid()
//       },
//       ...other,
//       complete: res => {
//         wx.hideLoading();
//         console.log(`耗时${Date.now() - timeStart}`);
//         //重新请求完token，再次执行后的请求在这里拦截
//         if (callback) { callback(res); return }
//         if (res.statusCode >= 200 && res.statusCode < 300) {
//           /**
//            * 这是我们自定义的接口状态判断参数
//            * code == 401 为用户未登陆状态，需要走登录逻辑
//            * code == 493 为token过期状态需要重新获取token
//            * TODO 这里应该加个开关，如果同时有三个请求，就会重复请求三次 
//            */
//           // debugger
//           if (res.data.code == unlogin_code || res.data.code == expired_code) {
//             if (res.data.code == unlogin_code) { //用户登陆并获取token
//               console.log("未登录，跳转登录页")
//               wx.redirectTo({
//                 url: loginPage,
//               })
//             } else if (res.data.code == expired_code) { //token过期
//               console.log("token过期，重新获取token")
//               getNewToken(url, param).then(() => {
//                 http({
//                   url,
//                   param,
//                   callback: resolve
//                 })
//               })
//             }
//           } else {
//             resolve(res)
//           }
//         } else {
//           reject(res);
//         }
//       }
//     })
//   })
// }

// //获取新token
// const getNewToken = (url, param) => {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: baseUrl + reLoginUrl,
//       data: {
//         token: getToken(),
//       },
//       header: {
//         'content-type': 'application/json'
//       },
//       method: 'GET',
//       success: function (res) {
//         console.log("getNewToken success",res)
//         // debugger
//         if (res.data.code == 0) {
//           wx.setStorageSync('token', res.data.data);
//           // wx.setStorageSync('personal', res.data);
//           resolve(res)
//         } else {
//           if (res.data.code == unlogin_code) {
//             // 不跳转
//             wx.reLaunch({
//               url: loginPage,
//             })
//           }
//         }
//       },
//     })
//   })
// }

// //获取token
// const getToken = () => {
//   let token = wx.getStorageSync('token') || '';
//   return token;
// }

// //获取openid
// const getOpenid = () => {
//   let openid = wx.getStorageSync('openid') || null
//   return openid;
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

// // module.exports = {
// //   http,
// //   baseUrl,
// //   wxLogin,
// // }

// export {
//   http,
//   baseUrl,
//   wxLogin,
// }