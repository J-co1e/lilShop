// 店铺相关接口类型
export interface GetStoreInfoResponse {
  code: string
  message: string
  data: Shop[]
}

export interface Shop {
  shopPic: string
  shopName: string
  shopDetail: string
}

export interface UpdateStoreInfoParams {
  shopName: string
  shopDetail: string
}

export interface UploadShopPicParams {
  img: File
}

export interface CommonResponse {
  code: string
  message: string
  data: any
}
