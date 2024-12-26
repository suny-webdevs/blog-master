import { JwtPayload } from "jsonwebtoken"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { BlogServices } from "./blog.service"
import httpStatus from "http-status"

const createBlog = catchAsync(async (req, res) => {
  const data = await BlogServices.createBlog(req.body, req.user.email)
  sendResponse(res, httpStatus.CREATED, "Blog created", data)
})

const getAllBlog = catchAsync(async (req, res) => {
  const data = await BlogServices.getAllBlog(req.query)
  sendResponse(res, httpStatus.OK, "Blogs fetched", data)
})

const getABlog = catchAsync(async (req, res) => {
  const data = await BlogServices.getABlog(req.params.id, req.user)
  sendResponse(res, httpStatus.OK, "Blog fetched", data)
})

const updateABlog = catchAsync(async (req, res) => {
  const data = await BlogServices.updateABlog(req.params.id, req.body, req.user)
  sendResponse(res, httpStatus.OK, "Blog updated", data)
})

const deleteABlog = catchAsync(async (req, res) => {
  const data = await BlogServices.deleteABlog(req.params.id, req.user)
  sendResponse(res, httpStatus.OK, "Blog deleted", data)
})

export const BlogControllers = {
  createBlog,
  getAllBlog,
  getABlog,
  updateABlog,
  deleteABlog,
}
