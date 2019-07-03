// pages/me/collection.js
import movieList from '/../../detail/detail';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // movie
    // id: '',
    movie: [],
    savemovie: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync('movieData'));
    let savemovie = wx.getStorageSync('movieData')//获得缓存
    console.log(savemovie)
    let index = savemovie.length ;
    // console.log(index)
    // console.log(savemovie[index].id);
    let movieid = savemovie[index]
    let temp = movieList[movieid] //将获得缓存后匹配的数据放入新的数组
    let movie = [];
    movie.push(temp);
    this.setData({
      id: index, 
      movie: movie
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})