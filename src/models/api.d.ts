
export interface ApiError {
  status: number
  message: string
  error?: string[]
}

export type ApiResponse<T=any> = [ApiError, null]|[null, T]
