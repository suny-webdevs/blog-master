import { ZodError } from "zod"
import { IError, IGenericError } from "../interface/error"

const handleZodError = (err: ZodError): IGenericError => {
  const statusCode = 400
  const error: IError[] = err.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }
  })

  return {
    statusCode,
    message: "Validation error",
    error,
  }
}

export default handleZodError
