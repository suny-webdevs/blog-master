import config from "../../config"
import AppError from "../../errors/handleAppError"
import { User } from "../user/user.model"
import { IAuth } from "./auth.interface"
import httpStatus from "http-status"
import { createToken } from "./auth.utils"

const loginUser = async (payload: IAuth) => {
  const user = await User.isUserExistsByEmail(payload?.email)

  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password
  )

  if (!isPasswordMatched || !user || user?.isBlocked || user?.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials")
  }

  const jwtPayload = {
    _id: user?._id,
    email: user?.email,
    role: user?.role,
  }

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire as string
  )

  return { token }
}

export const AuthServices = {
  loginUser,
}
