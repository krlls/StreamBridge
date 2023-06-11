/*eslint-disable no-console*/
import moment from 'moment'
import clc from 'cli-color'
import { RouterContext } from 'koa-router'
import { isEmpty } from 'lodash'

import { serverConfig } from '../config'

enum ELogType {
  WARN = 'WARN',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

enum ELogger {
  API = 'API',
}

abstract class Logger {
  private static log(type: ELogType, name: string, ...args: any) {
    if (serverConfig.silent) {
      return
    }

    const color = {
      [ELogType.WARN]: clc.yellow,
      [ELogType.ERROR]: clc.red,
      [ELogType.INFO]: clc.blue,
    }[type]

    return console.log(`[${moment().format('YY-MM-DD hh:mm:ss:SS')}] ${color(type)} [${name}]`, ...args)
  }

  protected static logInfo(name: string, ...args: any) {
    return this.log(ELogType.INFO, clc.green(name), ...args)
  }

  protected static logWarn(name: string, ...args: any) {
    return this.log(ELogType.WARN, clc.green(name), ...args)
  }

  protected static logError(name: string, ...args: any) {
    return this.log(ELogType.ERROR, clc.green(name), ...args)
  }
}

export class ApiLogger extends Logger {
  static info(ctx: RouterContext, ...args: any) {
    return this.logInfo(ELogger.API, ctx.req.method, ctx.request.url, ...args)
  }

  static warn(ctx: RouterContext, ...args: any) {
    return this.logWarn(ELogger.API, ctx.req.method, ctx.request.url, ...args)
  }

  static error(ctx: RouterContext, ...args: any) {
    return this.logError(ELogger.API, ctx.req.method, ctx.request.url, ...args)
  }
}

export const showNotEmpty = <A, B>(a: A, b: B) => (!isEmpty(a) ? a : !isEmpty(b) ? b : undefined)
