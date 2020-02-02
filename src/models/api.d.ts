
export interface ApiError {
  status: number
  message: string
  errors?: string[]
}

export type ApiResponse<T=any> = [ApiError]|[null, T]
