Component({
  options: {
    styleIsolation: "shared"
  },

  /**
   * 组件的属性列表
   */
  properties: {
    avatar: {
      type: Boolean,
      value: false
    },
    title: {
      type: Boolean,
      value: true
    },
    row: {
      type: Number,
      value: 20
    },
    loading: {
      type: Boolean,
      value: false
    },
    refresherTriggered: {
      type: Boolean,
      value: false
    },
    refresherEnabled: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    innerRefresherTriggered: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPullDownRefresh() {
      if (this.properties.loading) {
        this.setData({
          innerRefresherTriggered: false
        })
        return
      }
      this.triggerEvent('pulldown')
    },
    onLoadMore() {
      this.triggerEvent('loadmore')
    }
  }
})
