import request from '@/utils/request'

export function getTotal(params) {
  return request({
    url: '/api/total/total',
    method: 'get',
    params
  })
}
