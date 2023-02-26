import request from "@/request";

export function getUsers(data) {
  return request({
    url: '/user/getUsers',
    method: 'get',
    params: data
  })
}