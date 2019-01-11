//app.js
// var QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
// let qqmapsdk;
const ccposition = require('./utils/ccposition.js')
App({
  onLaunch: function() {
    ccposition.cityPosition()
  },
  globalData: {
    userInfo: null
  }
})
