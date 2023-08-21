import { constReviceAddress,constCart } from '../../utils/commonConst.js'
import { http, baseUrl } from "../../utils/HttpRequestUtil"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviceAddress:{},
    cart:[],
    baseUrl:"",
    allChecked:false,
    sumMoney:0,
    sumNum:0
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({baseUrl:baseUrl})
  },

  /** 点击获取收货地址 */
  handleGetReviceAddress(){
      wx.chooseAddress({
          success:(result)=>{
            wx.setStorageSync(constReviceAddress, result)
          }
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
    
    const address = wx.getStorageSync(constReviceAddress);
    const cart = wx.getStorageSync(constCart)||[];
    this.setData({
        reviceAddress:address,
    })
    this.reloadComputeCart(cart)
  },

  /**
   * 商品选中/不选中事件处理
   */
  handleItemChange(e){
      const {itemid} = e.currentTarget.dataset;
      let {cart} = this.data;
      let index = cart.findIndex(g=>g.id===itemid)
      cart[index].checked = !cart[index].checked
      this.reloadComputeCart(cart)
  },
  /**
   * 全选/全不选
   */
  handleAllCheckChange(){
      let {cart,allChecked} = this.data;
      allChecked=!allChecked;
      cart.forEach(g=>{
          g.checked=allChecked
      })
      this.reloadComputeCart(cart)
  },

  /** 数量加减 */
  handleItemNumEdit(e){
    const {itemid,operation} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(g=>g.id===itemid)
    if(cart[index].num === 1 && operation===-1){
        wx.showModal({
            title: '提示',
            content: '确认删除？',
            complete: (res) => {
              if (res.cancel) {
                console.log('用户点击取消')
              }
              if (res.confirm) {
                cart.splice(index,1)
                this.reloadComputeCart(cart)
              }
            }
          })
    }else{
        cart[index].num+=operation
        this.reloadComputeCart(cart)
    }
    
  },

  /** 重新设置购物车状态
   * 重新计算底部工具栏 总价 设置全选 数量
   * 更新购物车缓存
   */
  reloadComputeCart(cart){
    let sumMoney = 0;
    let sumNum = 0;
    let allCheckedTemp = true;//临时变量
    cart.forEach(g=>{
        if(g.checked){
            sumNum+=g.num
            sumMoney+=g.num*g.price
        }else{
            allCheckedTemp=false
        }
    })
    allCheckedTemp=cart.length<=0?false:allCheckedTemp;
    this.setData({
        cart:cart,
        allChecked:allCheckedTemp,
        sumMoney:sumMoney,
        sumNum:sumNum
    })
    wx.setStorageSync(constCart, cart)
  },

  /** 滑动 */
  handleItemTouchStart(e){
      let data = App.touch._touchstart(e,this.data.cart)
      this.setData({
          cart:data
      })
  },
  handleItemTouchMove(e){
      let data = App.touch._touchmove(e,this.data.cart)
      this.setData({
        cart:data
    })
  },
  handleItemDel(e){
      const {index} = e.currentTarget.dataset;
      let {cart} = this.data;
      wx.showModal({
        title: '提示',
        content: '确认删除？',
        complete: (res) => {
          if (res.cancel) {
            console.log('用户点击取消')
          }
          if (res.confirm) {
            cart.splice(index,1)
            this.reloadComputeCart(cart)
          }
        }
      })
  },

  /** 结算 */
  handleToBuy(e){
    const { reviceAddress,sumNum } = this.data;
    if(!reviceAddress){
        wx.showToast({
          title: '您还没有选择收货地址',
          icon: 'none'
        })
        return
    }
    if(sumNum<=0){
        wx.showToast({
            title: '您还没有选择商品',
            icon: 'none'
        })
          return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
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