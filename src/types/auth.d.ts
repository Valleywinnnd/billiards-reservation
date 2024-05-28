export interface IProfile {
  username: string,
  userId: string,
  phone: string,
  token: string
}

export interface LoginParams {
  username: string
  password: string
}