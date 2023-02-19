import { global } from "../../config/index"
import { StatusCode } from "./status-code"
import { R, RequestConfig } from "./types"
import { authStore } from "../../store/auth"
import { LoginUtils } from "../../utils/login"

class HTTP {

  failureProcess<T>(
    result: WechatMiniprogram.RequestSuccessCallbackResult<R<T>>,
    config: RequestConfig): Promise<R<T>> {
    const r = result.data || {}

    switch (r.code) {
      case StatusCode.TokenInvalid:
        return new Promise<R<T>>((resolve) => {
          authStore.fetchRefreshUserToken().then(() => {
            return this.request<T>(config)
          }).then((temp) => {
            resolve(temp)
          }).catch(() => {
            // 跳转登录页面
            authStore.clear()
            LoginUtils.toLogin()
          })
        })
      case StatusCode.TokenSignBack:
        // 跳转登录页面
        authStore.clear()
        LoginUtils.toLogin()
        break;
      default:
        wx.showToast({
          title: r.message,
          icon: 'none',
          duration: 2000
        });
        break;
    }

    return Promise.reject(r)
  }

  request<T>(config: RequestConfig): Promise<R<T>> {
    const url = `${global.BaseUrl()}${config.url}`
    const header = config.header || {};
    header['Tenant'] = global.Tenant
    if (!config.permit) {
      if (!header['Authorization']) {
        const accessToken = authStore.getAccessToken()
        if (accessToken) {
          header['Authorization'] = accessToken
        }
      }
    }
    if (!config.timeout) {
      config.timeout = global.ReqestTimeout
    }
    return new Promise<R<T>>((resolve, reject) => {
      wx.request<R<T>>({
        url,
        data: config.data,
        header,
        method: config.method,
        timeout: config.timeout,
        dataType: "json",
        success: (result: WechatMiniprogram.RequestSuccessCallbackResult<R<T>>) => {
          const statusCode = result.statusCode
          const r = result.data || {}
          if (statusCode === 200 && r.code === StatusCode.OK) {
            resolve(r)
            return
          }

          // 手动处理
          if (config.manualProcessingFailure) {
            reject(r)
            return
          }
          this.failureProcess(result, config).then(result => {
            resolve(result)
          }).catch(e => {
            reject(e)
          })
        },
        fail(result: WechatMiniprogram.GeneralCallbackResult) {
          if (!config.manualProcessingFailure) {
            wx.showToast({
              title: '网络请求失败',
              icon: 'none',
              duration: 2000
            });
          }
          reject({
            result,
            message: '网络请求失败',
            code: -1
          })
        }
      })
    })
  }

  get<T>(config: RequestConfig): Promise<R<T>> {
    config.method = "GET"
    return this.request(config)
  }

  post<T>(config: RequestConfig): Promise<R<T>> {
    config.method = "POST"
    return this.request(config)
  }

  put<T>(config: RequestConfig): Promise<R<T>> {
    config.method = "PUT"
    return this.request(config)
  }

  delete<T>(config: RequestConfig): Promise<R<T>> {
    config.method = "DELETE"
    return this.request(config)
  }
}

export const Http = new HTTP()