// const detailtemp = require("../../utils/detail.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesdetail: {},
    allActors: [],
    comments: [],
    isHidden:true,
    // 收藏变量初始化
    movie: [],
    movieList: [],
    id: '',
    isClick: false,
    movieStorage: [],
    movieId: ''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    let {
      id
    } = options
    this.setData({
      id
    })
    this.movieDetail();
    // this.reviewsDetail();
  
  },
  onShow:function(){
    // this.movieDetail();
  },
  onReady: function() {

  },
  // url: 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=' + movieId,
  movieDetail: function() {
    var page = this;
    var movieId = this.data.id
    wx.request({
      url: 'http://api.douban.com/v2/movie/subject/' + movieId+'?apikey=0b2bdeda43b5688921839c8ecb20399b',
      header: {
        "Content-Type": "json"
      },
      success: (res) => {
        var detail = res.data;
        page.processDetail(detail);
        page.setData({
          moviesdetail: detail
        })
        //隐藏加载
        wx.hideLoading()
      }
    })
  },
  processDetail: function(detail) {
    detail.name = detail.title; //影片名字
    detail.img = detail.images.medium; //海报图片
    detail.mins = detail.durations[0]; //影片时长
    detail.overallRating = detail.rating.average; //评分
    detail.releaseDate = detail.pubdate; //上映时间
    detail.type = detail.genres; //影视类型
    var type = detail.type;
    var typeStr = "";
    for (var index in type) {
      typeStr = typeStr + type[index] + "/";
    }
    if (typeStr != "") {
      typeStr = typeStr.substring(0, typeStr.length - 1);
    }
    detail.text = "类型:" + typeStr + "\n上映时间:" + detail.releaseDate + "\n 电影时长: " + detail.mins;
    // 热门评论
    this.setData({
      comments: detail.popular_reviews
    })
    // console.log(detail)
    
    // // 演员列表
    this.setData({
      allActors: detail.casts
    })
    // let {actors} = detail.data.basic;
    // let p1 = new Promise((resolve, reject) => {
    //     let new_arr = actors.filter(item => {
    //       if (item.name != '' && item.img != '') return true
    //       return false
    //     })
    //     resolve(new_arr)
    //   });

    // p1.then(data => {
    //     let allActors = [];
    //     for (let i = 0; i < data.length; i++) {
    //       wx.request({
    //         url: data[i].img,
    //         success: (res) => {
    //           if (res.statusCode != 404 && !res.data.includes('很抱歉，你要访问的页面不存在')) {
    //             allActors.push(actors[i])
    //             if (i == data.length - 1) {
    //               this.setData({
    //                 allActors
    //               })
    //             }
    //           }
    //         }
    //       })
    //     }
    //   })
    //加载
    // wx.showLoading({
    //   title: '加载中',
    // })
  },
  // processDetails: function(details) {
  //   for (var i = 0; i < details.length; i++) {
  //     var detail = details[i];
  //     this.processDetail(detail);
  //   }
  // },
  // 热门评论
  // reviewsDetail: function() {
  //   var page = this;
  //   // var movieId = this.data.id
  //   // wx.request({
  //   //   // url: 'https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=' + movieId,
  //   //   // url: 'https://api-m.mtime.cn/Movie/HotLongComments.api?pageIndex=1&movieId=' + movieId,
  //   //   url:'',
  //   //   success: (res) => {
  //   var reviews = res.data.popular_reviews;
  //       // var reviews = comment.mini.list;
  //       // console.log(res.data)
  //       page.setData({
  //         comments: reviews
  //     //   })
  //     // }
  //   })
  // },
  // 预告跳转
  turn: function (event) {
    let {
      id
    } = event.currentTarget;
    wx.navigateTo({
      url: `advance/advance?id=${id}`
    })
  },
  // 收藏
  collection: function (e) {
    console.log("collection");
    console.log(this.data)
    if (!this.data.isClick == true) {
      let movieData = this.data.movieStorage;
      movieData.push({
        movieid: movieData.length,
        id: this.data.id
      })
      wx.setStorageSync('movieData', movieData);//设置缓存
      wx.showToast({
        title: '已收藏',
      });
    } else {
      wx.showToast({
        title: '已取消收藏',
      });
    }
    this.setData({
      isClick: !this.data.isClick
    
})
      
  },
  // 演员预览
  actorsPic: function (event) {
    console.log(event.currentTarget.dataset)
    let index = event.currentTarget.dataset.index;
    let actor_detali = this.data.allActors[index];
    let celebrityId = this.data.allActors[index].id;
    // console.log(celebrityId)
    this.setData({
      isHidden:false,
      actor_detali
    })

    // //
    // wx.request({
    //   // url: 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=' + movieId,
    //   url: 'https://api.douban.com/v2/movie/celebrity/' + celebrityId + '?apikey=0b2bdeda43b5688921839c8ecb20399b',
    //   header: {
    //     "Content-Type": "json"
    //   },
    //   success: (res) => {
    //     var _act = res.data;
    //     this.setData(_act)
    //     // page.processDetail(detail);
    //     // page.setData({
    //     //   moviesdetail: detail
    //   }
    // })
    // var src = event.currentTarget.dataset.src;//获取data-src
    // var imgList = event.currentTarget.dataset.list;//获取data-list
    // let imgarr =[]
    // imgList.forEach(item=>{
    //   imgarr.push(item.img)
    // })    
    // var index = event.currentTarget.dataset.index;
    // console.log(imgarr)
    // //图片预览
    // wx.previewImage({
    //   current: '', // 当前显示图片的http链接
    //   urls: imgarr // 需要预览的图片http链接列表
    // })
  },
  // 关闭
  closeFnc(){
    this.setData({
      isHidden: true
    })
  },
  // 买票
  pay: function () {
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
    // wx.requestPayment({
    //   timeStamp: '',
    //   nonceStr: '',
    //   package: '',
    //   signType: 'HMAC-SHA256',
    //   paySign: '',
    //   success(res) { },
    //   fail(res) { }
    // })
  },
})