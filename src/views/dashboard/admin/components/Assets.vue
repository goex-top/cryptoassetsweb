<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="assets" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="平台" width="120">
        <template slot-scope="scope">
          {{ scope.row.exchange_name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="个性名" >
        <template slot-scope="scope">
          {{ scope.row.nick_name }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="USDT估值" width="180">
        <template slot-scope="scope">
          {{ scope.row.usdt }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="BTC估值" width="180">
        <template slot-scope="scope">
          {{ scope.row.btc }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="详情" width="100">
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
      :title=exchange_name size='35%'
    >
    <div class="filter-container">
      <el-switch
        v-model="showValue"
        active-text="BTC估值"
        inactive-text="USDT估值">
      </el-switch>
    </div>
    <el-table :data="currencies" style="width: 100%;margin-top:30px;" border :default-sort = "{prop: 'id', order: 'descending',prop: 'usdt', order: 'descending',prop: 'btc', order: 'descending',prop: 'currency_name', order: 'descending',prop: 'free', order: 'descending',prop: 'frozen', order: 'descending'}">
        <el-table-column align="center" label="ID" width="80" sortable prop="id">
            <template slot-scope="scope">
            {{ scope.row.id }}
            </template>
        </el-table-column>

        <el-table-column align="center" label="币" width="120" sortable prop="currency_name">
            <template slot-scope="scope">
            {{ scope.row.currency_name }}
            </template>
        </el-table-column>

        <el-table-column align="center" label="可用" width="150" sortable prop="free">
            <template slot-scope="scope">
            {{ scope.row.free }}
            </template>
        </el-table-column>

        <el-table-column align="center" label="冻结" width="150" sortable prop="frozen">
            <template slot-scope="scope">
            {{ scope.row.frozen }}
            </template>
        </el-table-column>

        <el-table-column v-if="showValue===true" align="center" label="估值(BTC)" width="150" sortable prop="btc">
            <template slot-scope="scope">
            {{ scope.row.btc }}
            </template>
        </el-table-column>

        <el-table-column v-if="showValue===false" align="center" label="估值(USDT)" width="150" sortable prop="usdt">
            <template slot-scope="scope">
            {{ scope.row.usdt }}
            </template>
        </el-table-column>

      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { getAsset, getExchangeSummary } from '@/api/asset'

export default {
  name: 'Assets',
  data() {
    return {
      dialog_visible: false,
      exchange_name: '',
      assets:[],
      currencies:[],
      listLoading: true,
      showValue: true,
    }
  },
  created() {
    this.get_assets()
  },
  methods: {
    async get_assets() {
      this.listLoading = true
      const res = await getAsset()
      this.assets = res.data
      this.listLoading = false
    },
    async handle_view_detail(scope) {
      this.exchange_name = scope.row.exchange_name
      this.dialog_visible = true
      const res = await getExchangeSummary(scope.row.id)
      var list = []
      const data = res.data
      for (var i = 0; i < data.length; i++) {
        list.push({
          id: data[i].ID,
          currency_name: data[i].coin_name,
          free:data[i].amount,
          frozen:data[i].frozen_amount,
          usdt:data[i].usdt.toFixed(4),
          btc:data[i].btc.toFixed(8)
        })
      }
      this.currencies = list
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

.filter-container {
  padding-bottom: 10px;

  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}
</style>
