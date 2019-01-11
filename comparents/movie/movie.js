// comparents/movie/movie.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie_data:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail(event){
      let { id } = event.currentTarget;
      this.triggerEvent('getDetail',{id},{})
    }
  },
  //详情
  
})
