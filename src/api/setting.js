import request from '@/utils/request'

// settings
export function getSetting() {
  return request({
    url: '/setting',
    method: 'get'
  })
}

export function addSetting(data) {
  return request({
    url: '/setting',
    method: 'post',
    data
  })
}

export function deleteSetting(id) {
    return request({
        url: `/setting/${id}`,
        method: 'delete'
    })
}
  
export function getSupport() {
    return request({
      url: '/support',
      method: 'get'
    })
  }
  
  