import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { BlogRoutes } from "../modules/blog/blog.route"
import { AuthRoutes } from "../modules/auth/auth.route"

const router = Router()

const routes = [
  { path: "/auth", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/blogs", route: BlogRoutes },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
