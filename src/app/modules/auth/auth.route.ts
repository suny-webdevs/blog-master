import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest"
import { AuthValidationSchemas } from "./auth.validation"
import { AuthControllers } from "./auth.controller"

const router = Router()

router.post(
  "/login",
  validateRequest(AuthValidationSchemas.loginUserValidationSchema),
  AuthControllers.loginUser
)

export const AuthRoutes = router
