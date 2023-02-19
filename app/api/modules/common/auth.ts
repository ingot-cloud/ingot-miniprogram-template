import { Http } from "../../net/index"
import { R } from "../../net/types"
import { UserToken, SocialRegisterDTO } from "../../../model/security"
import { authStore } from "../../../store/index"
import { global } from "../../../config/index"

const BasicToken = global.BasicToken

export function MiniProgramLogin(code: string): Promise<R<UserToken>> {
  return Http.post<UserToken>({
    url: "/auth/oauth2/token",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': BasicToken
    },
    data: {
      grant_type: "social",
      socialType: "miniprogram",
      socialCode: code
    },
    manualProcessingFailure: true
  })
}

export function RefreshToken() {
  return Http.post<UserToken>({
    url: "/auth/oauth2/token",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': BasicToken
    },
    data: {
      grant_type: "refresh_token",
      refresh_token: authStore.getRefreshToken(),
    },
    manualProcessingFailure: true
  })
}

export function SocialRegister(params: SocialRegisterDTO) {
  return Http.post({
    url: "/pms/mini/auth/register/social",
    data: params,
    permit: true,
    manualProcessingFailure: true
  })
}