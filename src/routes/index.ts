import Router from 'koa-router'
const router = new Router()
const api = new Router()

import testRoutes from './testRoutes'

api.use(testRoutes)

router.use('/api/v1', api.routes())

export default router