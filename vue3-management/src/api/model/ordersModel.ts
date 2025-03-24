// 订单相关接口类型
export interface GetOrdersParams {
  current: number
  size: number
}

export interface SearchOrdersParams {
  tableNo?: string
  startDate?: string
  endDate?: string
  orderStatus?: number // 0-未完结 1-已完结 2-全部
}

export interface DoneOrderParams {
  orderId: string
}

export interface OrderItem {
  foodName: string
  type: string
  imgUrl: string
  price: number
  total: number
}

export interface OrderBatch {
  times: number
  diners: number
  orders: OrderItem[]
}

export interface Order {
  orderId: string
  tableNo: string
  applyDate: string
  isPayed: number // 0-未付款 1-已付款
  orderStatus: number // 0-未完结 1-已完结
  orderData: string // JSON string of OrderBatch[]
}

export interface OrdersResponse {
  total: number
  data: Order[]
}
