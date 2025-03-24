// 食品类别相关接口类型
export interface GetTypesParams {
  current?: number
  size?: number
}

export interface AddTypeParams {
  type: string
}

export interface UpdateTypeParams {
  id: number
  type: string
}

export interface DeleteTypeParams {
  id: number
}

export interface FoodType {
  id: number
  type: string
}

export interface TypesResponse {
  code: string
  message: string
  data: FoodType[]
  total: number
}
