// import { http, baseUrl } from "../../utils/HttpRequestUtil"
import { baseUrl,getAction } from "../../utils/HttpUtil"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:"",
    scrollHeight:0,
    currentIndex:0,
    leftMenuList:[],
    rightGoodsMapList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({baseUrl:baseUrl})
    this.categoryPageList(),
    this.goodsByCategoryGroupByLabel()
  },

  async categoryPageList(){
    const [result,err] = await getAction({url:'/category/categoryPageList'})
    .then((result)=>[result,null])
    .catch(err=>[null,err])
    this.setData({
        leftMenuList:result.data.data,
    })
  },

  async goodsByCategoryGroupByLabel(categoryId=1){
    const [result,err] = await getAction({
        url:'/goods/byCategoryGroupByLabel',
        data:{categoryId:categoryId}})
    .then((result)=>[result,null])
    .catch(err=>[null,err])
    this.setData({
        rightGoodsMapList:result.data.data,
    })
  },

  /** 点击菜单分类 */
  handleClickCategoryMenu(e){
    // console.log(e) menuIndex 变 menuindex 
    const {menuindex} = e.currentTarget.dataset;
    this.setData({
        currentIndex:menuindex,
        scrollHeight:0
    })
    this.goodsByCategoryGroupByLabel(this.data.leftMenuList[this.data.currentIndex].id)
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

    const app = getApp()
    const {menuIndex,menuId} = app.globalData
    if(menuIndex!=-1){
        //说明从首页跳转过来
        this.setData({
            currentIndex:menuIndex,
            scrollHeight:0
        })
        this.goodsByCategoryGroupByLabel(menuId)
        app.globalData.menuIndex=-1
        app.globalData.menuId=0
    }
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