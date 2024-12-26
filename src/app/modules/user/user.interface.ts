import { JwtPayload } from "jsonwebtoken"
import { Model, Types } from "mongoose"
import { USER_ROLE } from "./user.constant"

export interface IUser {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  role: "admin" | "user"
  isBlocked: boolean
  isDeleted: boolean
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE
