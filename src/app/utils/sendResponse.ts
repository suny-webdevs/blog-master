import { Response } from "express"

const sendResponse = <T>(
  res: Response,
  code: number,
  message: string,
  data: T
) => {
  return res.status(code).json({
    success: true,
    message: `${message} successfully!`,
    statusCode: code,
    data: data,
  })
}

export default sendResponse
