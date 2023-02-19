import { LoginUtils, Message } from "../../../utils/index"
import { SocialRegister } from "../../../api/modules/common/auth"
import { SocialTypeEnums } from "../../../model/security"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "登录",
    hint: "绑定手机号完成登录",
    phone: "",
    confirmPhone: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  onBindPhone() {
    if (!this.data.phone || this.data.phone.length === 0) {
      Message.fail("请输入手机号", false)
      return
    }
    if (this.data.phone !== this.data.confirmPhone) {
      Message.fail("两次输入的手机号不一致", false)
      return
    }

    const loading = Message.loading("加载中...")
    wx.login({
      success: (res) => {
        SocialRegister({
          type: SocialTypeEnums.MINI_PROGRAM,
          phone: this.data.phone,
          code: res.code
        }).then(() => {
          this.doLogin(loading)
        }).catch(err => {
          console.debug(err)
          loading.clear()
          let message = err.message
          if (err.code == "PUE01" || err.code == "PUE02" || err.code == "PUE03") {
            message = "该手机号已被绑定"
          }
          wx.showToast({
            title: message,
            icon: 'none',
            duration: 2000
          });
        })
      },
      fail: () => {
        loading.clear()
        Message.fail("微信登录失败")
      }
    })
  },

  doLogin(loading: any) {
    LoginUtils.doWeichatLogin().then(() => {
      loading.clear()
      wx.navigateBack()
    }).catch(err => {
      loading.clear()
      if (!err) {
        Message.fail("微信登录失败")
        return
      }
      loading.clear()
      wx.showToast({
        title: err.message,
        icon: 'none',
        duration: 2000
      });
    })
  }
})