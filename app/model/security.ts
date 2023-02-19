export interface UserToken {
  accessToken?: string;
  tokenType?: string;
  refreshToken?: string;
  expiresIn?: number;
  scope?: string;
}

export interface User {
  email?: string;
  phone?: string;
  nickname?: string;
  avatar?: string;
  nonInitPwd?: boolean;
}

export interface UserInfo {
  user?: User;
  roles?: Array<string>;
}

export interface SocialRegisterDTO {
  type?: string;
  phone?: string;
  code?: string;
}

export enum SocialTypeEnums {
  SMS = "sms",
  WECHAT = "wechat",
  MINI_PROGRAM = "miniprogram",
}