<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { parseTime2 } from '@/utils/index'


export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(value) {
      var ts = []
      var asset = []
      for (var i = 0; i < value.length; i++) {
        ts.push(parseTime2(value[i].time))
        asset.push(value[i].value)
      }
      console.log(ts)
      console.log(asset)
      console.log(value)
      
      this.chart.setOption({
        title: {
          text: '资产走势',
          x: 'center',
          // top: '20',
          textStyle: {
            color: '#ff0000',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['资产', '平均']
        },
        xAxis: [{
          type: 'category',
          data: ts,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '资产',
          type: 'bar',
          stack: 'vistors',
          symbolSize: 10,
          symbol: 'circle',
          barWidth: '60%',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0
              // label: {
              //   show: true,
              //   position: 'top',
              //   formatter(p) {
              //     return p.value > 0 ? p.value : ''
              //   }
              // }
            }
          },
          data: asset,
        },{
          name: '平均',
          type: 'line',
          stack: 'vistors',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              barBorderRadius: 0,
              // label: {
              //   show: true,
              //   position: 'top',
              //   formatter(p) {
              //     return p.value > 0 ? p.value : ''
              //   }
              // }
            }
          },
          data: asset
        }
        ]
      })
    }
  }
}
</script>
