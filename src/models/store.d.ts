import { IUser } from './user'

export interface IAction<T=any> {
  type: string
  payload: T
}

export interface IStore {
  user: IUser
  errors: {[key: string]: string}
}
