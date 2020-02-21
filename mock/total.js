import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    public_key: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    exchange_name: 'name',
    create_time: '@datetime',
  }]
})

// function randomize () {
//   return [0, 0, 0].map(v => {
//     return Math.round(300 + Math.random() * 700) / 10
//   })
// }

export default [
  {
    url: '/vue-admin-template/total/total',
    type: 'get',
    response: config => {
      return {
        legend: {},
        tooltip: {},
        dataset: {
          // Provide data.
          source: [
            ['Product', '2020'],
            ['Matcha Latte', ...randomize()],
          ]
        },
        // Declare X axis, which is a category axis, mapping
        // to the first column by default.
        xAxis: { type: 'category' },
        // Declare Y axis, which is a value axis.
        yAxis: {},
        // Declare several series, each of them mapped to a
        // column of the dataset by default.
        series: [{ type: 'bar' }]
      }
    }
  }
]
