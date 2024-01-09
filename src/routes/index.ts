import Router from 'koa-router'
const router = new Router()
const api = new Router()

import testRoutes from './testRoutes'
import userRoutes from './userRoutes'


api.use(testRoutes)
api.use(userRoutes)


router.use('/api/v1', api.routes())
  

export default router