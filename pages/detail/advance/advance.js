// pages/detail/advance/advance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tvArr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.blooper_urls)
    wx.request({
      // url: `https://api-m.mtime.cn/Movie/Video.api?pageIndex=1&movieId=${options.id}`,
      url: 'http://api.douban.com/v2/movie/subject/' + options.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b',
      header: {
        "Content-Type": "json"
      },
      // url:options.,
      success:(res)=>{
        // console.log(res.data.blooper_urls)
        // console.log(res.data.bloopers)
        this.setData({
          tvArr: res.data.bloopers,
          _tvArr: res.data.clips
        })
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})