import request from '@/utils/request'

// settings
export function getSetting() {
  return request({
    url: '/api/setting',
    method: 'get'
  })
}

export function addSetting(data) {
  return request({
    url: '/api/setting',
    method: 'post',
    data
  })
}

export function deleteSetting(id) {
    return request({
        url: `/api/setting/${id}`,
        method: 'delete'
    })
}
  
export function getSupport() {
    return request({
      url: '/api/support',
      method: 'get'
    })
  }
  
  