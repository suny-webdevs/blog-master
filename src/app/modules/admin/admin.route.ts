import { Router } from "express"
import { AdminControllers } from "./admin.controller"
import auth from "../../middlewares/auth"
import { USER_ROLE } from "../user/user.constant"

const router = Router()

router.get("/users", auth("admin"), AdminControllers.getAllUsers)
router.get("/users/:userId", auth("admin"), AdminControllers.getAUser)
router.patch(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  AdminControllers.blockAUser
)
router.delete(
  "/blogs/:blogId",
  auth(USER_ROLE.admin),
  AdminControllers.deleteABlog
)

export const AdminRoutes = router
