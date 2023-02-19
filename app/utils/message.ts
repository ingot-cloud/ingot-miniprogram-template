// @ts-ignore
import Toast from '@vant/weapp/toast/toast';

class MessageUtils {

  constructor() {
    Toast.setDefaultOptions({
      forbidClick: true
    })
  }

  success(message: string, forbidClick = true) {
    return Toast.fail({
      type: "success",
      message,
      forbidClick
    })
  }

  fail(message: string, forbidClick = true) {
    return Toast.fail({
      type: "fail",
      message,
      forbidClick
    })
  }

  loading(message?: string) {
    return Toast.loading({
      type: "loading",
      message,
      duration: 0, // 持续展示 toast
    })
  }

  clear() {
    Toast.clear()
  }
}

export const Message = new MessageUtils()