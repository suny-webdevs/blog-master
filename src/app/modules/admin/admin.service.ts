import { JwtPayload } from "jsonwebtoken"
import { User } from "../user/user.model"
import AppError from "../../errors/handleAppError"
import httpStatus from "http-status"
import { Blog } from "../blog/blog.model"

const getAllUsers = async () => {
  const data = await User.find()
  return data
}

const getAUser = async (id: string) => {
  const data = await User.findById(id)
  return data
}

const blockAUser = async (id: string, user: JwtPayload) => {
  if (user && user.role !== "admin") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized for block user"
    )
  }

  const data = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  )

  return data
}

const deleteABlog = async (id: string, user: JwtPayload) => {
  if (user && user?.role !== "admin") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized for delete a blog"
    )
  }

  const data = await Blog.findByIdAndDelete(id)
  return data
}

export const AdminServices = {
  getAllUsers,
  getAUser,
  blockAUser,
  deleteABlog,
}
