import request from '@/utils/request'

export function getAccount() {
    return request({
        url: '/asset_history',
        method: 'get'
    })
}

export function getAsset() {
    return request({
        url: '/asset',
        method: 'get'
    })
}

export function getExchangeSummary(id) {
    return request({
        url: '/exchange_summary',
        method: 'get',
        params: { id }
    })
}

export function getCoinList() {
    return request({
        url: '/coin_list',
        method: 'get'
    })
}
