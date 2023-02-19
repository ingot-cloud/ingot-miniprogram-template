import { authStore } from "../../../store/index"
import { global } from "../../../config/index"

// const app = getApp<IAppOption>()

Page({
  data: {
    title: "首页",
    refreshTriggered: false,
    baseUrl: global.BaseUrl(),

  },

  onLoad() {
    this.setData({
      refreshTriggered: true
    })
  },

  onShow() {
  },

  onPullDownRefresh() {
   
  },


})
