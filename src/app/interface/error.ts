export interface IError {
  path: string | number
  message: string
}

export interface IGenericError {
  message: string
  statusCode: number
  error: IError[]
}
