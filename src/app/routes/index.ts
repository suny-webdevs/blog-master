import { Router } from "express"

const router = Router()

const routes: [Record<string, unknown>] = [
    {path: '', route: }
]

routes.forEach((route) => router.use(route.path as string, route.route))

export default router
