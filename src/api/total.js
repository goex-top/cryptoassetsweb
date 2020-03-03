import request from '@/utils/request'

export function getTotal(params) {
  return request({
    url: '/total/total',
    method: 'get',
    params
  })
}
