import { IContext } from "../interfaces/IContext"
import * as errors from '../utils/errors'
import logger from "../utils/logger"


async function errorHandler(ctx: IContext, next: () => Promise<any>) {
    try {
        await next()
    } catch (error: any) {
        ctx.status = error.status || 500
        ctx.body = {
            message: error?.message,
            stack: error?.stack,
            ...error,
          }
        ctx.app.emit('error', error, ctx)
        logger.warn(error.message, error.stack)
        /*ctx.status = error.status || 400
        ctx.body = { msg: error?.message, stack: error?.stack }*/
    }
}
export default errorHandler
