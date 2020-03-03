<template>
  <div class="dashboard-editor-container">
    <panel-group :panel-data="panel_value" @handleSetLineChartData="handleSetLineChartData2" />

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
      value: [],
      panel_value: {BTC:0, USDT:0, USD:0, CNY:0}
    }
  },
  created() {
    this.get_account()
  },
  methods: {
    handleSetLineChartData2(type) {
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
        BTC.push({time:accountHistory[i].CreatedAt, value:accountHistory[i].btc.toFixed(8)})
        USDT.push({time:accountHistory[i].CreatedAt, value:accountHistory[i].usdt.toFixed(4)})
        USD.push({time:accountHistory[i].CreatedAt, value:accountHistory[i].usd.toFixed(4)})
        CNY.push({time:accountHistory[i].CreatedAt, value:accountHistory[i].cny.toFixed(4)})
      }
      this.accountValue.BTC = BTC
      this.accountValue.USDT = USDT
      this.accountValue.USD = USD
      this.accountValue.CNY = CNY
      this.handleSetLineChartData2('USDT')
      this.panel_value.BTC = BTC[BTC.length-1].value
      this.panel_value.USDT = USDT[USDT.length-1].value
      this.panel_value.USD = USD[USD.length-1].value
      this.panel_value.CNY = CNY[CNY.length-1].value
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
