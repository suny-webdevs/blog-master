import mongoose from "mongoose"
import { IError, IGenericError } from "../interface/error"

const handleCastError = (err: mongoose.Error.CastError): IGenericError => {
  const statusCode = 400
  const error: IError[] = [{ path: err?.path, message: err?.message }]

  return {
    statusCode,
    message: "Validation Error",
    error,
  }
}

export default handleCastError
