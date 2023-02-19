// components/nav-container/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      require: true
    },
    leftText: {
      type: String,
      value: ""
    },
    leftArrow: {
      type: Boolean,
      value: false
    },
    border: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    top: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickLeft() {
      this.triggerEvent('click-left')
    }
  },
  
  lifetimes: {
    attached(){
      wx.getSystemInfoAsync({
        success: (result) => {
          this.setData({
            top: result.statusBarHeight
          })
        },
      });
    }
  }
})
