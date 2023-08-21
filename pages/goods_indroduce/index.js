import { http, baseUrl } from "../../utils/HttpRequestUtil"
import { constReviceAddress,constCart } from '../../utils/commonConst.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:"",
    goodsDetail:{},
    activeIndex:0,
    show:false
  },

  goodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({baseUrl:baseUrl})
    // console.log(options)
    this.goodsDetailIntroduce(options.goodsId)
  },

  /** 获取商品详情 */
  async goodsDetailIntroduce(goodsId){
    const [result,err] = await http({
        url:'/goods/detailIntroduce',
        method:'GET',
        data:{goodsId}})
    .then((result)=>[result,null])
    .catch(err=>[null,err])
    this.goodsInfo = result.data.data
    this.setData({
        goodsDetail:result.data.data
    })
  },

  /** 加入购物车 */
  handleAddCart(){
      let cart = wx.getStorageSync(constCart)||[];
    //   console.log(constCart,cart)
      let index = cart.findIndex(g=>g.id===this.goodsInfo.id)
      if(index === -1){
        //   说明没有这个商品信息，需要加入
        this.goodsInfo.num = 1 //num属性后面用到需要先赋值
        this.goodsInfo.checked = false //checked属性后面用到需要先赋值
        this.goodsInfo.isTouchMove = false //滑动属性
        cart.push(this.goodsInfo)
      }else{
        //   修改数量
        cart[index].num++
      }
      wx.setStorageSync(constCart, cart) //商品信息加入缓存

      wx.showToast({
        title: '已添加',
        icon: 'success',
        mask:true
      })
  },

  /** 商品介绍 商品规格 tab点击切换 */
  handleTabTitleCilck(e){
    // console.log(e.currentTarget.dataset)
    const {index} = e.currentTarget.dataset
    this.setData({
        activeIndex:index
    })
  },

  showBuyImmediatePage(){
      this.setData({
          show:true
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})