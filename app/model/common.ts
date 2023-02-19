/**
 * 公共状态
 */
export enum CommonStatus {
  // 可用
  Enable = "0",
  // 锁定
  Lock = "9",
}

export interface Page<T extends any = any> {
  current?: number;
  size?: number;
  total?: number;
  records?: Array<T>;
}

export interface PageChangeParams {
  type: "current" | "size";
  value: number;
}