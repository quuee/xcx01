// pages/order/index.js
import { baseUrl, getAction } from "../../utils/HttpUtil"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        type: 0,
        typeName: "全部订单",
        isActive: true
      },
      {
        type: 1,
        typeName: "待付款",
        isActive: false
      },
      {
        type: 2,
        typeName: "待收货",
        isActive: false
      },
      {
        type: 3,
        typeName: "售后",
        isActive: false
      },
      {
        type: 4,
        typeName: "待评价",
        isActive: false
      },
    ],
    orderList: []
  },

  queryParam: {
    pageNo: 1,
    pageSize: 10,
    orderType: 0,
    goodsName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // const {type} = options
    console.log(options)
    this.setData({
      baseUrl
    })
    this.changeTabActive(options.type)
    this.getOderList(options.type)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  handleTabItemChange(e) {
    console.log("handleTabItemChange", e)
    const { tabtype } = e.detail
    this.changeTabActive(tabtype)

    //切换tab 查询数据
    this.getOderList(tabtype)
  },

  changeTabActive(tabtype){
    let tempTabs = this.data.tabs.map((t) => {
      if (t.type == tabtype) {
        return { ...t, isActive: true }
      } else {
        return { ...t, isActive: false }
      }
    })
    this.setData({
      tabs: tempTabs
    })
  },

  async getOderList(tabtype = 0) {
    const [result, err] = await getAction({ url: "/order/pageList", data: { ...this.queryParam, orderType: tabtype } })
      .then((result) => [result, null])
      .catch(err => [null, err])
    // console.log("getOderList", result)
    this.setData({
      orderList: result.data.data
    })
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