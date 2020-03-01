<template>
  <div class="app-container">
    <el-table :data="assets" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          {{ scope.row.Id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="平台" width="100">
        <template slot-scope="scope">
          {{ scope.row.exchange_name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="个性名" width="100">
        <template slot-scope="scope">
          {{ scope.row.nick_name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="USDT" width="180">
        <template slot-scope="scope">
          {{ scope.row.value_usdt }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="BTC" width="180">
        <template slot-scope="scope">
          {{ scope.row.value_btc }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handle_view_detail(scope)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      :visible.sync="dialog_visible"
      :title=exchange_name
    >
      <el-table :data="currencies" style="width: 100%;margin-top:30px;" border>
        <el-table-column align="center" label="ID" width="80">
            <template slot-scope="scope">
            {{ scope.row.Id }}
            </template>
        </el-table-column>

        <el-table-column align="center" label="币" width="120">
            <template slot-scope="scope">
            {{ scope.row.currency_name }}
            </template>
        </el-table-column>

        <el-table-column align="center" label="可用" width="120">
            <template slot-scope="scope">
            {{ scope.row.free }}
            </template>
        </el-table-column>

        <el-table-column align="center" label="冻结" width="120">
            <template slot-scope="scope">
            {{ scope.row.frozen }}
            </template>
        </el-table-column>

      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { get_assets, get_currencies } from '@/api/asset'

const default_asset = {
  Id: '1',
  nick_name: '我是大户',
  exchange_name: 'okex',
  value_usdt: '222',
  value_btc: '112',
}

export default {
  name: 'Assets',
  data() {
    return {
      dialog_visible: false,
      exchange_name: '',
      total: 0,
      assets:[default_asset],
      currencies:[],
      list_loading: true,
    }
  },
  created() {
    this.get_assets()
  },
  methods: {
    async get_assets() {
      this.list_loading = true
      const res = await get_assets()
      this.assets = res.data.list
      this.total = res.data.total
      this.list_loading = false
    },
    async handle_view_detail(scope) {
      this.exchange_name = scope.row.exchange_name
      this.dialog_visible = true
      const res = await get_currencies()

    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
