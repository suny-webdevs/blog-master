import jwt from "jsonwebtoken"
import { Types } from "mongoose"

export const createToken = (
  jwtPayload: { _id: Types.ObjectId; email: string; role: "admin" | "user" },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn })
}
