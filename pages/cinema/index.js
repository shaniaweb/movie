const ccposition = require('../../utils/ccposition.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(o){    
    qqmapsdk = new QQMapWX({
      key: 'INUBZ-EEIW5-5W7IJ-QBHXF-WDUZH-4RFK4'
    });
    this.search()

  },
  onShow:function(options){
   
    var city = wx.getStorageSync("city")
    this.setData({
      city
    })
  },
 
  //跳转页面
  city_turn: function (event) {
    wx.navigateTo({
      url: `city/city`
    })
  },
  // 影院查询
  search:function(){
    console.log("search")
    var page = this;
    // 影院String转坐标
    qqmapsdk.search({
      keyword: '影院',  //搜索关键词
      page_index: 1,
      location: {
        latitude: 22.14589,
        longitude: 113.3642
      },
      success(res) {
        var cinema = res.data
        page.setData({
          cinema
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  // 重新定位
  relocation:function(){
    console.log("重新定位")
    ccposition.cityPosition() 
    var city = wx.getStorageSync("city")
    this.setData({
      city
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  
})