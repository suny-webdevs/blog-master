import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AdminServices } from "./admin.service"
import httpStatus from "http-status"

const getAllUsers = catchAsync(async (req, res) => {
  const data = await AdminServices.getAllUsers()
  sendResponse(res, httpStatus.OK, "Get all users", data)
})

const getAUser = catchAsync(async (req, res) => {
  const data = await AdminServices.getAUser(req.params.userId)
  sendResponse(res, httpStatus.OK, "Get a user", data)
})

const blockAUser = catchAsync(async (req, res) => {
  const data = await AdminServices.blockAUser(req.params.userId, req.user)
  sendResponse(res, httpStatus.OK, "User blocked", data)
})

const deleteABlog = catchAsync(async (req, res) => {
  const data = await AdminServices.deleteABlog(req.params.blogId, req.user)
  sendResponse(res, httpStatus.OK, "User blocked", data)
})

export const AdminControllers = {
  getAllUsers,
  getAUser,
  blockAUser,
  deleteABlog,
}
