import { model, Schema } from "mongoose"
import { IBlog } from "./blog.interface"

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
)

blogSchema.pre("find", async function (next) {
  this.find({ isPublished: { $ne: true } })
  next()
})

blogSchema.pre("findOne", async function (next) {
  this.find({ isPublished: { $ne: true } })
  next()
})

blogSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift({ $match: { isPublished: { $ne: true } } })
  next()
})

export const Blog = model<IBlog>("Blog", blogSchema)
