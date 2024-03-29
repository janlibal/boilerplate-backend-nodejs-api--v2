import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaBody from 'koa-body'
import koaCompress from 'koa-compress'
import koaHelmet  from 'koa-helmet'
import cors from '@koa/cors'
import koaLogger from 'koa-logger'
import { koaSwagger } from 'koa2-swagger-ui'
import fs from 'fs'
import errorHandler from '../middleware/errorHandler'
import router from '../routes'

const app = new Koa()



app.use(errorHandler)

app.use(koaCompress())
app.use(koaBody())
app.use(koaLogger())
app.use(cors())
app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: 'http://petstore.swagger.io/v2/swagger.json', // example path to json
      //spec: JSON.parse(fs.readFileSync('./src/spec/swagger.json', 'utf8')),
    },
  }),
)
app.use(
  bodyParser({
    enableTypes: ["json"],
  }),
)
app.use(koaHelmet())
app.use(router.routes())
app.use(router.allowedMethods())




export default app