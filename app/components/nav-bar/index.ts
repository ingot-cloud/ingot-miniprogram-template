// components/nav-bar/index.ts
Component({
  options: {
    styleIsolation: 'shared',
  },

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
    },
    fixed: {
      type: Boolean,
      value: false
    },
    zIndex: {
      type: Number,
      value: 100
    },
    customBackEvent: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    barStyle: `--nav-bar-text-color:red;`
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickLeft() {
      if (this.properties.customBackEvent) {
        this.triggerEvent('click-left')
        return
      }
      wx.navigateBack()
    }
  }
})
