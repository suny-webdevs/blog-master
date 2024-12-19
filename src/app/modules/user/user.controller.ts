import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { UserServices } from "./user.service"

const createUser = catchAsync(async (req, res) => {
  const data = await UserServices.createUser(req.body)
  sendResponse(res, "User registered", data)
})

export const UserControllers = {
  createUser,
}
