import { model, Schema } from "mongoose"
import { IUser, UserModel } from "./user.interface"
import { UserRole } from "./user.constant"
import bcrypt from "bcrypt"
import config from "../../config"

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: UserRole, default: "user" },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Find user if isDeleted property is false
userSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } }, { _id: 1, name: 1, email: 1 })
  next()
})

userSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } }, { _id: 1, name: 1, email: 1 })
  next()
})

userSchema.pre("aggregate", async function (next) {
  this.pipeline().unshift(
    { $match: { isDeleted: { $ne: true } } },
    { $project: { _id: 1, name: 1, email: 1 } }
  )
  next()
})

// Hashing password
userSchema.pre("save", async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.salt_round))
  next()
})

userSchema.post("save", function (doc, next) {
  doc.password = ""
  next()
})

// Statics
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email })
}
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const User = model<IUser, UserModel>("User", userSchema)
