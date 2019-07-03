// import movieList from '/../detail/detail'
//获取应用实例
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // movie
    id: '',
    movie: [],
    savemovie: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 收藏显示
    // this.collection()
    // 
    if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
    
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // if (this.data.usernameInput == "admin") {
      //   console.log("hahah")
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    // }
    }
  },
  //实现获取用户信息方法
  getUserInfo: function (e) {
    console.log(e)
  
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  collection:function(){
    wx.navigateTo({
      url: './collection/collection',
    })
    // console.log(wx.getStorageSync('movieData'));
    // let savemovie = wx.getStorageSync('movieData')//获得缓存
    // let index = savemovie.length - 1;
    // console.log(savemovie[index].id);
    // let movieid = savemovie[index].id
    // let temp = movieList[movieid] //将获得缓存后匹配的数据放入新的数组
    // let movie = [];
    // movie.push(temp);
    // this.setData({
    //   id: index,
    //   movie: movie,
    // })
  },
 share:function(){
   wx.showModal({
     title: '提示',
     content: '该功能还未被开发',
     success: function (res) {
       if (res.confirm) {
         console.log('用户点击确定')
       } else {
         console.log('用户点击取消')
       }

     }
   })
 },
// //  用户名输入检测判断
//   userInput:function(e){
//     // console.log(e.detail.value)
//     this.setData({
//       usernameInput: true
//     })
//   },
//   //  用户名密码输入判断
//   passInput: function (e) {
//     this.setData({
//       passwordInput: e.detail.value
//     })
//   }
})