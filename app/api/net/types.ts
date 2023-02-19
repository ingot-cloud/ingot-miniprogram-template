export interface R<T> {
  code: string;
  message: string;
  data: T
}

export interface RequestConfig {
  url: string,
  data?: WechatMiniprogram.IAnyObject,
  method?: 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT',
  // 超时时间，单位为毫秒
  timeout?: number,
  header?: WechatMiniprogram.IAnyObject,
  permit?: boolean,
  manualProcessingFailure?: boolean
}