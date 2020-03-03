import request from '@/utils/request'

export function getAccount() {
    return request({
        url: '/api/asset_history',
        method: 'get'
    })
}

export function getAsset() {
    return request({
        url: '/api/asset',
        method: 'get'
    })
}

export function getCoinList(id) {
    return request({
        url: '/api/exchange_detail',
        method: 'get',
        params: { id }
    })
}
