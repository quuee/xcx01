// import { requestUtil,baseUrl } from '../../utils/requestUtil.js'
import {http,baseUrl} from "../../utils/HttpRequestUtil"

Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageNo:1,
      pageSize:2,
      baseUrl:"",
      swiperList:[],
      indexCategoryList:[],
      indexHotGoodsPageList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const token = wx.getStorageSync('token');

    if(token=='' || token==undefined){
        wx.redirectTo({
          url: '/pages/auhtor/index',
        })
    }else{
      this.setData({baseUrl:baseUrl})
      this.getSwiperList(),
      this.getIndexCategoryList(),
      this.getIndexHotGoodsList(this.data.pageNo)
    }

  },

  async getSwiperList(){

    const [result,err] = await http({url:'/swiper/list',method:'GET'})
    .then((result)=>[result,null])
    .catch(err=>[null,err])

    this.setData({
        swiperList:result.data.data
    })

  },

  async getIndexCategoryList(){
    const [result,err] = await http({url:'/category/indexList',method:'GET'})
    .then((result)=>[result,null])
    .catch(err=>[null,err])
    this.setData({
        indexCategoryList:result.data.data
    })
  },

  async getIndexHotGoodsList(pageNo){
    const [result,err] = await http({
        url:'/goods/indexHotList',
        method:'GET',
        data:{pageNo:pageNo,PageSize:this.data.pageSize}})
    .then((result)=>[result,null])
    .catch(err=>[null,err])
    console.log("getIndexHotGoodsList",result)
    this.setData({
        pageNo:this.data.pageNo+1,
        indexHotGoodsPageList:[...this.data.indexHotGoodsPageList,...result.data.data.list]
    })
  },

  /**首页分类点击跳转到分类tarbar */
  handleJumpCategoryBar(e){

    const {menuindex,menuid} = e.currentTarget.dataset;
    const app = getApp();
    app.globalData.menuIndex = menuindex;
    app.globalData.menuId = menuid;
    wx.switchTab({
      url: '/pages/category/index',
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
    console.log('页面上拉触底事件的处理函数')
    this.getIndexHotGoodsList(this.data.pageNo)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})