const ccposition = require('../../utils/ccposition.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHidden: false,
    isHidden_search:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(o){    
    qqmapsdk = new QQMapWX({
      key: 'INUBZ-EEIW5-5W7IJ-QBHXF-WDUZH-4RFK4'
    });
    // this.search()

  },
  onShow:function(options){
    this.city_cinemaPosition()
  },
 
  //跳转页面
  city_turn: function (event) {
    wx.navigateTo({
      url: `city/city`
    })
    this.setData({
      isHidden: false,
      isHidden_search: true
    })
  },
  // 影院查询
  bindKeyInput:function(e){
    if (e.detail.value!=null){
    this.setData({
      isHidden:true,
      isHidden_search:false
    })
      var _this = this;
      var city = wx.getStorageSync("city")
      //调用关键词提示接口
      qqmapsdk.getSuggestion({
        //获取输入框值并设置keyword参数
        keyword: '影院' + e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
        region: city, //设置城市名，限制关键词所示的地域范围，非必填参数
        success: function (res) {//搜索成功后的回调
          console.log(res);
          var sug = [];
          for (var i = 0; i < res.data.length; i++) {
            sug.push({ // 获取返回结果，放到sug数组中
              title: res.data[i].title,
              id: res.data[i].id,
              addr: res.data[i].address,
              city: res.data[i].city,
              district: res.data[i].district,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng
            });
          }
          _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
            suggestion: sug
          });
        },
        fail: function (error) {
          console.error(error);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    }
  },
  
  //数据回填方法
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].title
        });
      }
    }
  },
  // search:function(e){
    // console.log("search", this.data.inputName,this.data.city)
    //  wx.navigateTo({
    //   url: `./../text/text`
    // })
    // // var city = wx.getStorageSync("city")
    // var _this = this;
    // //调用关键词提示接口
    // qqmapsdk.getSuggestion({
    //   //获取输入框值并设置keyword参数
    //   // address: city,
    //   keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
    //   // region: '茂名', //设置城市名，限制关键词所示的地域范围，非必填参数
    //   success: function (res) {//搜索成功后的回调
    //   console.log(res);
    //   },
    //   fail: function (error) {
    //     console.error(error);
    //   }

    // })
    // // 地址转化
    // // console.log(this.data.city)//拿到当前城市
    // // //调用地址解析接口
    // // qqmapsdk.geocoder({
    // //   //获取表单传入地址
    // //   address: this.data.city, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
    // //   success: function (res) {//成功后的回调
    // //     console.log(res.result.location);
    // //     },
    // //   fail(err) {
    // //     console.log(err)
    // //   }
    // // })


    // // var page = this;
    // // 影院String转坐标
    
  // },
  // 重新定位
  relocation:function(){
    console.log("重新定位")
     ccposition.cityPosition() //定位当前位置
    this.city_cinemaPosition()//配置当前影院
  },
 
city_cinemaPosition(){
  this.setData({
    isHidden: false,
    isHidden_search: true
  })
  var city = wx.getStorageSync("city")
   const _this = this;
  //城市string转为坐标--geocoder    
  qqmapsdk.geocoder({
    address: city, //地址参数
    success: function (res) {
      console.log(res);
      var res = res.result;
      var latitude = res.location.lat;
      var longitude = res.location.lng;
      // 页面跳转得到城市坐标
      qqmapsdk.search({
        keyword: '影院',  //搜索关键词
        page_index: 1,
        location: {
          latitude,
          longitude
        },
        success(res) {
          var cinema = res.data;
          console.log(cinema)
          _this.setData({
            cinema
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    },
  })
   _this.setData({
    city
  })
}  
})