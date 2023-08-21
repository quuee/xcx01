const baseUrl = "http://192.168.2.11:8080";
const loginPage = "/pages/author/index"
const reLoginUrl = "/user/reLogin"
const loginUrl = "/user/login"

const expired_code = 493 //为token过期状态需要重新获取token
const unlogin_code = 401 //为用户未登陆状态，需要走登录逻辑

//微信登录————code
function wxLogin (param={}) {
  wx.showLoading();
  return new Promise((resolve, reject) => {
    wx.login({
      success: res1 => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: baseUrl+loginUrl,
          data: { jsCode: res1.code, ...param },
          method: "GET",
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            console.log("wxLogin",res)
            switch (res.statusCode) {//（根据实际情况判断）
              case 200:
                wx.setStorageSync('access_token', res.data.data);//把token存储在本地
                resolve({ status: 200 });
                break;
              default:
                resolve({ status: res.statusCode });
            }
          },
          fail: function (err) {
            wx.showToast({ title: "系统繁忙！", icon: 'error' });
            reject(err);
          }
        })
      },
      fail: function (err) {
        wx.showToast({ title: "系统繁忙！", icon: 'error' });
        reject(err);
      }
    })
  });
}

// const app = getApp();
let requestArr = [], isRefreshing = false;//请求队列，是否正在刷新token

// 401 刷新token
function refreshToken (params, method, content_type, resolve) {
  requestArr.push(() => { resolve(httpRequest(params, method, content_type)) });//缓存请求到队列中
  if (!isRefreshing) {
    isRefreshing = true;
    wxLogin().then(res => {
      console.log("refreshToken",res)
      switch (res.status) {//（根据实际情况判断）
        case 200:
          // 重新请求队列
          requestArr.map(MT => { MT(); });
          requestArr = [];//清空队列
          break;
        default:
          wx.showToast({ title: "系统繁忙！", icon: 'error' });
      }
    }).finally(() => {
      //解除正在刷新
      isRefreshing = false;
      wx.hideLoading();
    });
  }
}

function httpRequest (params, method, content_type = 'application/json') {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token');//获取本地的token
    wx.request({
      url: baseUrl + params.url,
      data: params.data,
      method: method,
      header: { 'content-Type': content_type, 'Authorization': token, },
      success: (res) => {
        console.log("httpRequest",res)
        switch (res.statusCode) {//（根据实际情况判断）
          case 200:
            resolve(res.data);
            break;
          case 401://token过期，刷新token（根据实际情况判断）
            refreshToken(params, method, content_type, resolve);
            break;
          default:
            wx.showToast({ title: "系统繁忙！", icon: 'error' });
            reject();
        }
      },
      fail: function (err) {
        wx.showToast({ title: "系统繁忙！", icon: 'error' });
        reject(err);
      }
    });
  })
}

function _get (params) {
  return httpRequest(params, 'GET', 'application/json');
}

function _post (params) {
  return httpRequest(params, 'POST', 'application/json');
}

function _put (params) {
  return httpRequest(params, 'PUT', 'application/json');
}

function _delete (params) {
  return httpRequest(params, 'DELETE', 'application/json');
}

module.exports = {
  getAction: _get,
  postAction: _post,
  putAction: _put,
  deleteAction: _delete,
  wxLogin,
  baseUrl
}
