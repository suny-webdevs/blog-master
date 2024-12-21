import QueryBuilder from "../../builder/QueryBuilder"
import { IBlog } from "./blog.interface"
import { Blog } from "./blog.model"

const createBlog = async (payload: IBlog) => {
  const data = await Blog.create(payload)
  return data
}

const getAllBlog = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate("author"), query)
  const data = await blogQuery.queryModel
  return data
}

const getABlog = async (id: string) => {
  const data = await Blog.findById(id)
  return data
}

const updateABlog = async (id: string, payload: Partial<IBlog>) => {
  const data = await Blog.findByIdAndUpdate(id, payload, { new: true })
  return data
}

const deleteABlog = async (id: string) => {
  const data = await Blog.findByIdAndUpdate(
    id,
    { isPublished: true },
    { new: true }
  )
  return data
}

export const BlogServices = {
  createBlog,
  getAllBlog,
  getABlog,
  updateABlog,
  deleteABlog,
}
