// 用户相关接口类型
export interface GetUsersParams {
  current: number
  size: number
}

export interface SearchUsersParams {
  id: string | number
}

export interface AddUserParams {
  username: string
  password: string
  status: number // 0-普通用户 1-管理员
}

export interface UpdateUserParams {
  userId: number
  username: string
  password: string
  status: number
}

export interface DeleteUserParams {
  userId: number
}
export interface UserLoginParams {
  username: string
  password: string
}
export interface UploadAvatarParams {
  img: File
}

export interface User {
  userId: number
  username: string
  password: string
  status: number
  imgUrl: string
}

export interface UsersResponse {
  code: string
  message: string
  data: User[]
  total: number
}
