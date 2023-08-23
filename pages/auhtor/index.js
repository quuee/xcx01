// pages/auhtor/index.js
// import { requestUtil,baseUrl,wxLogin } from '../../utils/requestUtil.js'
// import { http, baseUrl, wxLogin } from "../../utils/HttpRequestUtil"
import { baseUrl, wxLogin } from "../../utils/HttpUtil"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: "",
    nickname: "",
    avatarUrl: "/assets/default_header.png"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      baseUrl
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  handleChooseAvatar(res) {
    const { avatarUrl } = res.detail;
    this.setData({
      avatarUrl
    })
  },

  async handleSubmit(e) {
    const nickname = e.detail.value.nickName
    const { avatarUrl } = this.data
    if (nickname == "" || nickname == undefined) {
      wx.showToast({
        title: '请选择微信昵称',
      })
      return
    }
    //获取code并登录
    await wxLogin({ nickName: nickname, avatarUrl: avatarUrl }) 
    wx.switchTab({
      url: "/pages/index/index"
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.hideHomeButton()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})