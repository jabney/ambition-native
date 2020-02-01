
export interface IProfile {
  email?: string
  first?: string
  last?: string
}

export interface ICredentials extends IProfile {
  email: string
  password: string
}

export interface IUser extends IProfile {
  _id: string
  email: string
  roles: string[]
  grants: string[]
}
