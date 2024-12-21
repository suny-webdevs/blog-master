import { Router } from "express"
import { BlogControllers } from "./blog.controller"
import validateRequest from "../../middlewares/validateRequest"
import { BlogValidationSchemas } from "./blog.validation"
import auth from "../../middlewares/auth"

const router = Router()

router.post(
  "",
  auth(),
  validateRequest(BlogValidationSchemas.createBlogValidationSchema),
  BlogControllers.createBlog
)
router.get("", BlogControllers.getAllBlog)
router.get("/:id", BlogControllers.getABlog)
router.patch("/:id", BlogControllers.updateABlog)
router.delete("/:id", BlogControllers.deleteABlog)

export const BlogRoutes = router
