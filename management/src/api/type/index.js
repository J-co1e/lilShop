import request from "@/request";

export function getTypes (data) {
  return request({
    url: '/type/getAllTypes',
    method: 'get',
    params: data
  })
}