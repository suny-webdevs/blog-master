import { IError, IGenericError } from "../interface/error"

const handleDuplicateError = (err: any): IGenericError => {
  const statusCode = 400

  const match = err.message.match(/"([^"]*)"/)
  const extractedMessage = match && match[1]

  const error: IError[] = [
    { path: "", message: `${extractedMessage} is already exist` },
  ]

  return {
    statusCode,
    message: "Data Existing Error",
    error,
  }
}

export default handleDuplicateError
