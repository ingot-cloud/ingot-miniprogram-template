import { Http } from "../../net/index"
import { R } from "../../net/types"
import { UserInfo, SysUser } from "../../../model/index"

export function UserInfoAPI(): Promise<R<UserInfo>> {
  return Http.get<UserInfo>({
    url: "/pms/mini/user",
  })
}

export function UpdateUserInfoAPI(params: SysUser) {
  return Http.put<void>({
    url: "/pms/mini/user",
    data: params
  })
}