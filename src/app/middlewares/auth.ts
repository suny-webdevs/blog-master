import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/handleAppError"
import httpStatus from "http-status"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access!")
    }

    jwt.verify(token, config.jwt_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access!")
      }

      req.user = decoded as JwtPayload
    })

    next()
  })
}

export default auth
