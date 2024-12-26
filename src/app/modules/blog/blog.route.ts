import { Router } from "express"
import { BlogControllers } from "./blog.controller"
import validateRequest from "../../middlewares/validateRequest"
import { BlogValidationSchemas } from "./blog.validation"
import auth from "../../middlewares/auth"
import { USER_ROLE } from "../user/user.constant"

const router = Router()

router.post(
  "",
  auth(USER_ROLE.user),
  validateRequest(BlogValidationSchemas.createBlogValidationSchema),
  BlogControllers.createBlog
)
router.get("", BlogControllers.getAllBlog)
router.get("/:id", BlogControllers.getABlog)
router.patch("/:id", auth("user"), BlogControllers.updateABlog)
router.delete("/:id", auth("user"), BlogControllers.deleteABlog)

export const BlogRoutes = router
