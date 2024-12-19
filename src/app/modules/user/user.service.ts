import AppError from "../../errors/handleAppError"
import { IUser } from "./user.interface"
import { User } from "./user.model"
import httpStatus from "http-status"

const createUser = async (payload: IUser) => {
  const newUserEmail = payload?.email
  const isUserExists = await User.findOne({ email: newUserEmail })
  if (isUserExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${newUserEmail} is already exists!`
    )
  }

  const data = await User.create(payload)
  return data
}

export const UserServices = {
  createUser,
}
