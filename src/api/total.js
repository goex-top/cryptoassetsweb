import request from '@/utils/request'

export function getTotal(params) {
  return request({
    url: '/vue-admin-template/total/total',
    method: 'get',
    params
  })
}
