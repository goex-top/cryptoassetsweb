<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <panel-group :panel-data="panel_value" @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <bar-chart :chart-data="accountValue"/>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :pieData="coinsValue"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="table-wrapper">
          <assets />
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import Assets from './components/Assets'
import PanelGroup from './components/PanelGroup'
import { getAccount, getCoinList } from '@/api/asset'


export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    PieChart,
    BarChart,
    Assets
  },
  data() {
    return {
      accountAllValue:{BTC:[], USDT:[], USD:[], CNY:[]},
      accountValue: [],
      coinsValue:[],
      panel_value: {BTC:0, USDT:0, USD:0, CNY:0}
    }
  },
  created() {
    this.get_account()
    this.get_CoinList()
  },
  methods: {
    handleSetLineChartData(type) {
      this.accountValue = this.accountAllValue[type]
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
      this.accountAllValue.BTC = BTC
      this.accountAllValue.USDT = USDT
      this.accountAllValue.USD = USD
      this.accountAllValue.CNY = CNY
      this.handleSetLineChartData('USDT')
      this.panel_value.BTC = BTC[BTC.length-1].value
      this.panel_value.USDT = USDT[USDT.length-1].value
      this.panel_value.USD = USD[USD.length-1].value
      this.panel_value.CNY = CNY[CNY.length-1].value
    },

    async get_CoinList() {
      const res = await getCoinList()
      var list = res.data
      list.sort(this.compare('value'))
      var size = list.length > 7 ? 7 : list.length
      for (let index = 0; index < size; index++) {
        this.coinsValue.push(list[index])
      }
    },

    compare(attr) {
      return function(a,b){
        var val1 = a[attr];
        var val2 = b[attr];
        return val2 - val1;
      }
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
.table-wrapper {
  background: #fff;
  padding: 8px 8px 0;
  margin-bottom: 16px;
}
.github-corner {
  position: absolute;
  top: 0px;
  border: 0;
  right: 0;
}
</style>
