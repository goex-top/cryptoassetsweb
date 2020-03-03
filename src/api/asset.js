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

export function getExchangeSummary(id) {
    return request({
        url: '/api/exchange_summary',
        method: 'get',
        params: { id }
    })
}

export function getCoinList() {
    return request({
        url: '/api/coin_list',
        method: 'get'
    })
}
