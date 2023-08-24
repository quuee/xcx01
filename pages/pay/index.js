// pages/pay/index.js
import { constReviceAddress,constCart } from '../../utils/commonConst.js'
import { postAction, baseUrl } from "../../utils/HttpUtil"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviceAddress:{},
    checkedGoodsList:[],
    sumMoney:0,
    deliveryPickerList:['请选择','顺丰包邮','快递自费'],
    deliveryIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const address = wx.getStorageSync(constReviceAddress);
    const cart = wx.getStorageSync(constCart)||[];
    let sumMoney = 0;
    let checkedList = cart.filter(g=>{
        if(g.checked){
            sumMoney+=g.num*g.price
            return g;
        }
    })
    this.setData({
        reviceAddress:address,
        checkedGoodsList:checkedList,
        sumMoney:sumMoney,
        baseUrl:baseUrl
    })
  },

  /**
   * 选择配送方式
   * @param {*} e 
   */
  handleDeliveryPickerChange(e){
    console.log('handleDeliveryPickerChange发送选择改变，携带值为', e.detail.value)
    this.setData({
        deliveryIndex: e.detail.value
    })
  },

  async handleCreateOrder(){
    // debugger
    let goodsList = this.data.checkedGoodsList.map(g=>{
      return  {
        goodsId:g.id,
        goodsName:g.goodsName,
        goodsImage:g.goodsImage,
        goodsNum:g.num,
        price:g.price
      }
    });
    let orderParam = {
      reviceAddress:this.data.reviceAddress,
      payWay:"支付宝",
      goodsList:goodsList
    }
    // console.log("orderParam",orderParam)
    const [result,err] = await postAction({
      url:"/order/create",
      data:orderParam,
    })
    .then((result)=>[result,null])
    .catch(err=>[null,err])
    if(result.data.code == 0){
      //支付成功
      //删除购物车中已下单商品
      const cart = wx.getStorageSync(constCart)||[];
      let lastCart = cart.filter(g=>!g.checked)
      wx.setStorageSync(constCart, lastCart)
      //跳转到订单页
      wx.redirectTo({
        url: '/pages/order/index?type=0',
      })
    }else{
      wx.showToast({
        title: "下单失败，请稍后再试",
        icon: "none"
      })
    }
    
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