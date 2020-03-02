import request from '@/utils/request'

export function getAccount() {
    return request({
      url: '/api/asset_history',
      method: 'get'
    })
  }
  