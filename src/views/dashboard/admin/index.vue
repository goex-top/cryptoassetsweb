<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <bar-chart :chart-data="value"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <!-- <div class="chart-wrapper"> -->
          <assets />
        <!-- </div> -->
      </el-col>

    </el-row>
  </div>
</template>

<script>
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import Assets from './components/Assets'
import PanelGroup from './components/PanelGroup'
import { getAccount } from '@/api/asset'


// const accountValue = {
//   BTC: [100, 120, 161, 134, 105, 160, 165],
//   USDT: [200, 192, 120, 144, 160, 130, 140],
//   USD: [120, 90, 100, 138, 142, 130, 130],
//   CNY: [130, 140, 141, 142, 145, 150, 160]
// }

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    PieChart,
    BarChart,
    Assets
  },
  data() {
    return {
      accountValue:{BTC:[], USDT:[], USD:[], CNY:[]},
      value: []
    }
  },
  created() {
    this.get_account()
  },
  methods: {
    handleSetLineChartData(type) {
      console.log("type:"+type)
      this.value = this.accountValue[type]
    },
    async get_account() {
      const res = await getAccount()
      var accountHistory = res.data
      var BTC = []
      var USDT = []
      var USD = []
      var CNY = []
      for (var i = 0; i < accountHistory.length; i++) {
        BTC.push({time:accountHistory[i].CreatedAt, value:accountHistory[i].btc})
        USDT.push({time:accountHistory[i].CreatedAt, value:accountHistory[i].usdt})
        USD.push({time:accountHistory[i].CreatedAt, value:accountHistory[i].usd})
        CNY.push({time:accountHistory[i].CreatedAt, value:accountHistory[i].cny})
      }
      this.accountValue.BTC = BTC
      this.accountValue.USDT = USDT
      this.accountValue.USD = USD
      this.accountValue.CNY = CNY
      this.handleSetLineChartData('USDT')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
.chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
