import { baseUrl, getAction } from "../../utils/HttpUtil"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:"",
    inputSearchWord: "",
    isFocus: false,
    viewShowed: false,
    wordList: [],
    goodsList: []
  },

  param: {
    pageNo: 1,
    pageSize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      baseUrl
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

  handleSearchInput(e) {
    const { value } = e.detail;
    this.setData({
      isFocus: value.trim().length > 0 ? false : true,
      viewShowed: value.trim().length > 0 ? true : false
    })
    setTimeout(() => {
      this.getSearchWordAssociation(value.trim())
    }, 600)

  },

  handleCancelInput() {
    this.setData({
      inputSearchWord: "",
      isFocus: false,
      viewShowed: false,
      wordList: []
    })
  },
  /**
   * 键盘回车
   * @param {*} e 
   */
  handleConfirm(e){
    // console.log("handleConfirm",e)
    const {value} = e.detail;
    this.setData({
      viewShowed: false,
    })
    this.getGoodsPageListBySearchWord({ ...this.param, ...{ searchWord: value } })
  },

  /**
   * 选中联想的关键词
   * @param {*} e 
   */
  handleChooseWord(e) {
    const { index } = e.currentTarget.dataset;
    // console.log(e)
    this.setData({
      inputSearchWord: this.data.wordList[index],
      viewShowed: false,
    })
    this.getGoodsPageListBySearchWord({ ...this.param, ...{ searchWord: this.data.inputSearchWord } })
  },

  async getGoodsPageListBySearchWord(param) {
    // console.log("getGoodsPageListBySearchWord", param)
    let [result, err] = await getAction({
      url: "/goods/searchPageList",
      data: param
    }).then((result) => [result, null])
      .catch(err => [null, err])
    // console.log(result)
    this.setData({
      goodsList: result.data.data
    })
  },

  async getSearchWordAssociation(searchWord) {
    if (searchWord == '' || searchWord == undefined) {
      return
    }
    let [result, err] = await getAction({
      url: "/goods/searchWordAssociation",
      data: { searchWord }
    })
      .then((result) => [result, null])
      .catch(err => [null, err])
    this.setData({
      wordList: result.data.data
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