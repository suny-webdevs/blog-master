import { Response } from "express"

const sendResponse = <T>(res: Response, message: string, data: T) => {
  return res.status(httpStatus.OK).json({
    success: true,
    message: `${message} successfully!`,
    statusCode: httpStatus.OK,
    data: data,
  })
}

export default sendResponse
