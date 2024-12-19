import { ErrorRequestHandler } from "express"
import { IError } from "../interface/error"
import config from "../config"
import { ZodError } from "zod"
import handleZodError from "../errors/handleZodError"
import handleValidationError from "../errors/handleValidationError"
import handleCastError from "../errors/handleCastError"
import handleDuplicateError from "../errors/handleDuplicateError"
import AppError from "../errors/handleAppError"
import httpStatus from "http-status"

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = httpStatus.BAD_REQUEST
  let message = "Bad request"
  let error: IError[] = [
    {
      path: "",
      message: message,
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    error = simplifiedError.error
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    error = simplifiedError.error
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    error = simplifiedError.error
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    error = simplifiedError.error
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    error = [{ path: "", message: err?.message }]
  } else if (err instanceof Error) {
    message = err?.message
    error = [{ path: "", message: err?.message }]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  })
}

export default globalErrorHandler
