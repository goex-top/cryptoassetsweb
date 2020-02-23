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


const accountValue = {
  BTC: [100, 120, 161, 134, 105, 160, 165],
  USDT: [200, 192, 120, 144, 160, 130, 140],
  USD: [120, 90, 100, 138, 142, 130, 130],
  CNY: [130, 140, 141, 142, 145, 150, 160]
}

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
      value: accountValue.USDT
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.value = accountValue[type]
      console.log('this.value')
      console.log(this.value, type)
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
