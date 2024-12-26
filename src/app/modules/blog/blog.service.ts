import QueryBuilder from "../../builder/QueryBuilder"
import { User } from "../user/user.model"
import { searchAbleFields } from "./blog.constant"
import { IBlog } from "./blog.interface"
import { Blog } from "./blog.model"
import AppError from "../../errors/handleAppError"
import httpStatus from "http-status"
import { JwtPayload } from "jsonwebtoken"

const createBlog = async (payload: IBlog, email: string) => {
  const updatedBlog: Partial<IBlog> = {}

  updatedBlog.title = payload?.title
  updatedBlog.content = payload?.content

  const currentUser = await User.isUserExistsByEmail(email)
  if (!currentUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }

  updatedBlog.author = currentUser?._id

  const newBlog = await Blog.create(updatedBlog)

  if (!newBlog) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create blog")
  }

  return newBlog
}

const getAllBlog = async (query: Record<string, unknown>) => {
  console.log(query)
  const blogQuery = new QueryBuilder(Blog.find().populate("author"), query)
    .search(searchAbleFields)
    .sort()
    .filter()
    .fields()

  const data = await blogQuery.queryModel
  // const data = await Blog.find()
  return data
}

const getABlog = async (id: string, user: JwtPayload) => {
  if (user && user?.role !== "user") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized for create a blog"
    )
  }

  const data = await Blog.findById(id)
  return data
}

const updateABlog = async (
  id: string,
  payload: Partial<IBlog>,
  user: JwtPayload
) => {
  if (user && user?.role !== "user") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized for create a blog"
    )
  }

  const data = await Blog.findByIdAndUpdate(id, payload, { new: true })
  return data
}

const deleteABlog = async (id: string, user: JwtPayload) => {
  if (user && user?.role !== "user") {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized for create a blog"
    )
  }

  const data = await Blog.findByIdAndDelete(id)
  return data
}

export const BlogServices = {
  createBlog,
  getAllBlog,
  getABlog,
  updateABlog,
  deleteABlog,
}
