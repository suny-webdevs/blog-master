import config from "../../config"
import AppError from "../../errors/handleAppError"
import { User } from "../user/user.model"
import { IAuth } from "./auth.interface"
import httpStatus from "http-status"
import jwt from "jsonwebtoken"

const loginUser = async (payload: IAuth) => {
  const user = await User.isUserExistsByEmail(payload?.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
  }
  const isBlocked = user?.isBlocked
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked")
  }

  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User was deleted")
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password
  )
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password did not matched")
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  })

  return { accessToken }
}

export const AuthServices = {
  loginUser,
}
