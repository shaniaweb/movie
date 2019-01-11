Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:true,
    hidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { active} = this.data
    this._http(active)
  },
  onShow: function () {

  },
  // 下拉刷新
  onPullDownRefresh() {
    // wx.startPullDownRefresh()
    let { active } = this.data
    this._http(active)
  },
//正在热映，即将上映
  _http(active){
    //加载
    wx.showLoading({
      title: '加载中...',
    })
    
    // let url = active ? "https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=290" :"https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290";
    let url = active ? "http://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b" :"http://api.douban.com/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b";
    wx.request({
      url,
      header: {
        "Content-Type": "json"
      },
      success:(res)=> {
        let moviesArr = active ? res.data.subjects : res.data.subjects
        hidden:true
        moviesArr.forEach((item) =>{
          this._formaObj(item,active)
        })
        this.setData({
          moviesArr
        })
        //隐藏加载
          wx.hideLoading()
        //隐藏更新
        wx.stopPullDownRefresh()
      },
    })
  },
   _formaObj(item,active){
     item.image = active ? item.images.medium : item.images.medium;
     item.title = active ? item.title : item.title;
    //演员名字
     let an1 = item.casts[0] ? item.casts[0].name : '未公布'
     let an2 = item.casts[1] ? item.casts[1].name : '未公布'
     item.actor3 = an1 + '/' + an2

  }, 
  getMoviesFunc(event){
    let { active } = event.detail ;
    this.setData({
      active
    })
    this._http(active)
  },
  goToDetail(event){
    let id = event.detail.id
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  }

})