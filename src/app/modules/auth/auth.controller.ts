import config from "../../config"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"
import httpStatus from "http-status"

const loginUser = catchAsync(async (req, res) => {
  const data = await AuthServices.loginUser(req.body)
  sendResponse(res, httpStatus.OK, "Login", data)
})

export const AuthControllers = {
  loginUser,
}
