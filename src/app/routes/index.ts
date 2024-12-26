import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { BlogRoutes } from "../modules/blog/blog.route"
import { AuthRoutes } from "../modules/auth/auth.route"
import { AdminRoutes } from "../modules/admin/admin.route"

const router = Router()

const routes = [
  { path: "/auth", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/blogs", route: BlogRoutes },
  { path: "/admin", route: AdminRoutes },
]

routes.forEach((route) => router.use(route.path, route.route))

export default router
