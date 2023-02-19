enum Env {
  Dev = "1",
  Release = "9"
}

export const global = {
  AppVersion: "v1.0.0",
  Env: Env.Dev,
  Tenant: "123",
  BasicToken: "Basic 替换basic token",
  BaseUrl: (): string => {
    switch (global.Env) {
      case Env.Dev:
        return "http://192.168.31.212:7980"
      case Env.Release:
        return ""
    }
  },
  ReqestTimeout: 10_000
}

