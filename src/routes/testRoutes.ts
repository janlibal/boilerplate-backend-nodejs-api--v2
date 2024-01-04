import Router from "koa-router"
import { test } from "../controllers/testController"

const router = new Router()

router.get('/test', test)

export default router.routes()