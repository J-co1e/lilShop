// 食品相关接口类型
export interface GetFoodsParams {
  current: number
  size: number
}

export interface SearchFoodsParams {
  foodName: string
}

export interface AddFoodsParams {
  foodName: string
  price: number
  type: string
  description: string
}

export interface UpdateFoodsParams {
  foodId: number
  foodName: string
  price: number
  type: string
  description: string
}

export interface DeleteFoodsParams {
  foodId: number
}

export interface UploadFoodPicParams {
  img: File
}

export interface Food {
  foodId: number
  foodName: string
  price: number
  imgUrl: string
  type: string
  description: string
}

export interface FoodsResponse {
  code: string
  message: string
  data: Food[]
  total: number
}
