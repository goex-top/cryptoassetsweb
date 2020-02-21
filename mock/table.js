import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    public_key: '@sentence(10, 20)',
    exchange_name: 'name',
    create_time: '@datetime',
  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
