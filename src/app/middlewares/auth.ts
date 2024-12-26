import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/handleAppError"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"
import { TUserRole } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access!")
    }

    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload
    const { email, role } = decoded

    const user = await User.isUserExistsByEmail(email)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }

    const isBlocked = user?.isBlocked
    if (isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, "The user is blocked")
    }

    const isDeleted = user?.isDeleted
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "The user is deleted")
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access!")
    }

    req.user = decoded as JwtPayload

    next()
  })
}

export default auth
