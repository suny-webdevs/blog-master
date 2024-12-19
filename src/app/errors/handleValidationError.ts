import mongoose from "mongoose"
import { IError, IGenericError } from "../interface/error"

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericError => {
  const statusCode: number = 400
  const error: IError[] = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      }
    }
  )

  return {
    statusCode,
    message: "Validation error",
    error,
  }
}

export default handleValidationError
