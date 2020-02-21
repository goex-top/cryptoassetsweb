<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
          <bar-chart />
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

export default {
  name: 'DashboardAdmin',
  components: {
      PieChart,
      BarChart,
      Assets
  },
  data() {
    return {

    }
  },
  methods: {

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
