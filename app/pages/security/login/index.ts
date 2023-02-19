import { LoginUtils, Message } from "../../../utils/index"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "登录",
    loginTitle: "",
    agree: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  onCheckboxTap() {
    this.setData({
      agree: !this.data.agree
    })
  },

  onProtocolClick() {
    
  },

  /**
   * 微信一键登录
   */
  onWechatLogin() {
    if (!this.data.agree) {
      Message.fail("请同意并阅读《注册用户须知》")
      return
    }

    const loading = Message.loading("加载中...")
    LoginUtils.doWeichatLogin().then(() => {
      loading.clear()
      wx.navigateBack()
    }).catch(err => {
      loading.clear()
      if (!err) {
        Message.fail("微信登录失败")
        return
      }
      if (err.code == "S0400") {
        // 登录失败，通过用户手机号注册
        wx.redirectTo({
          url: "/pages/security/bind-phone/index"
        })
        return
      }
      wx.showToast({
        title: err.message,
        icon: 'none',
        duration: 2000
      });
    })
  }

})