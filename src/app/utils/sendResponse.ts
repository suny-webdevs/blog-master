import { Response } from "express"
import httpStatus from "http-status"

const sendResponse = <T>(res: Response, message: string, data: T) => {
  return res.status(httpStatus.CREATED).json({
    success: true,
    message: `${message} successfully!`,
    statusCode: httpStatus.CREATED,
    data: data,
  })
}

export default sendResponse
