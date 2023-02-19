import { UserInfo } from "../model/index"
import { authStore } from "../store/index"

class Login {

  doLoginIfNeed() {
    if (authStore.isLogin()) {
      return false
    }
    this.toLogin()
    return true
  }

  toLogin() {
    wx.navigateTo({
      url: "/pages/security/login/index"
    })
  }

  logout() {
    authStore.clear()
    wx.reLaunch({
      url: '/pages/tab/index/index'
    });
  }

  doWeichatLogin() {
    return new Promise<UserInfo>((resolve, reject) => {
      wx.login({
        success: (res) => {
          authStore.fetchUserToken(res.code).then(() => {
            authStore.fetchUserInfo().then(data => {
              resolve(data)
            }).catch(err => {
              reject(err)
            })
          }).catch(err => {
            reject(err)
          })
        },
        fail: () => {
          reject()
        }
      })
    })
  }
}

export const LoginUtils = new Login()