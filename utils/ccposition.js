var QQMapWX = require('./qqmap-wx-jssdk.min.js');
let qqmapsdk;
 function cityPosition(){
   qqmapsdk = new QQMapWX({
    key: 'INUBZ-EEIW5-5W7IJ-QBHXF-WDUZH-4RFK4'
  });
  let promise = new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        resolve(res)
      }
    })
  })
  promise.then(res => {
    const { latitude, longitude } = res;
    qqmapsdk.reverseGeocoder({
      //Object格式
      location: {
        latitude,
        longitude
      },
      success: (res) => { //成功后的回调
        console.log(res)
        wx.setStorage({
          key: 'city',
          data: res.result.ad_info.city
        })
      },
    })
  })
}
function  cinemaPosition(){
  //  var _this = this;
  //  // 影院String转坐标
  //  qqmapsdk.search({
  //    keyword: '影院',  //搜索关键词
  //    page_index: 1,
  //    location: {
  //      latitude: 22.14589,
  //      longitude: 113.3642
  //    },
  //    success(res) {
  //      var page=this;
  //      var cinema=res.data
  //      _this.setData({
  //        cinema
  //      })
  //    },
  //    fail(err) {
  //      console.log(err)
  //    }
  //  })
 }
exports.cityPosition = cityPosition
// exports.cinemaPosition = cinemaPosition