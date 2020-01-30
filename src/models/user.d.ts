
export interface IUser {
  email?: string
  first?: string
  last?: string
}

export interface ICredentials extends IUser {
  email: string
  password: string
}
