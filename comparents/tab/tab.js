// comparents/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBeing(event) {
      this.setData({
        active: true
      })
      let {active } = this.data;
      this.triggerEvent('getMovies', {active}, {})
    },
    onSoon(event) {
      this.setData({
        active: false
      })
      let { active } = this.data;
      this.triggerEvent('getMovies', { active }, {})
    }
  }
})