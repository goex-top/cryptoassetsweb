<template>
  <div class="app-container">
        <el-button type="primary" @click="handle_add_exchange">新建</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="平台" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.exchange_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="个性名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nick_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="API Key">
        <template slot-scope="scope">
          {{ scope.row.api_key }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <!-- <span>{{ parseTime2(scope.row.create_at) }}</span> -->
          <span>{{ scope.row.create_at }}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            @click="handle_delete_key(scope)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialog_visible"
      :title="新建平台"
    >
      <el-form :model="exchange" label-width="80px" label-position="left">

        <el-form-item label="平台">
          <el-select v-model="exchange.exchange_name" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="个性名">
          <el-input v-model="exchange.nick_name" placeholder="我是大户" />
        </el-form-item>
        <el-form-item label="API Key">
          <el-input v-model="exchange.api_key" placeholder="3911702320" />
        </el-form-item>
        <el-form-item label="Sec Key">
         <el-input v-model="exchange.sec_key" placeholder="3911702320" />
        </el-form-item>

        <el-form-item label="Pass Key">
         <el-input v-model="exchange.pass_key" placeholder="3911702320" />
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button
          type="danger"
          @click="dialog_visible = false"
        >取消</el-button>
        <el-button type="primary" @click="confirm_adding">确认</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { getSetting, addSetting, deleteSetting, getSupport} from '@/api/setting'
import { parseTime2 } from '@/utils/index'

export default {
  data() {
    return {
      dialog_visible: false,
      list: [],
      listLoading: true,
      exchange:{},
      options: [],
      value: ''
    }
  },
  created() {
    this.fetchSupport()
    this.fetchData()
  },
  methods: {
    fetchSupport() {
      this.listLoading = true
      getSupport().then(response => {
        var list = response.data
        for (var i = 0; i < list.length; i++) {
          this.options.push({
            value: list[i],
            label: list[i]
          })
        }
        this.listLoading = false
      })
    },
    fetchData() {
      getSetting().then(response => {
        for (var i = 0; i < response.data.length; i++) {
          var data = response.data[i]
          this.list.push({
            id: data.ID,
            exchange_name:data.exchange_name,
            nick_name:data.nick_name,
            api_key:data.api_key,
            create_at:parseTime2(data.CreatedAt)
          })
        }
      })
    },
    handle_add_exchange() {
      this.dialog_visible = true
    },

    handle_delete_key({ $id, row }) {
      this.$confirm('确认要删除 [' + row.exchange_name + ' ] ?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteSetting(row.id)
          this.list.splice($id, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },

    async confirm_adding() {
      var exchange = {
        exchange_name: this.exchange.exchange_name,
        nick_name:this.exchange.nick_name,
        api_key: this.exchange.api_key,
        sec_key: this.exchange.sec_key,
        pass_key: this.exchange.pass_key
      }
      const { data } = await addSetting(exchange)
      this.exchange.id = data.ID
      this.list.push(this.exchange)

      const exchange_name = this.exchange.exchange_name
      const api_key = this.exchange.api_key
      this.dialog_visible = false
      this.$notify({
        title: '添加成功',
        dangerouslyUseHTMLString: true,
        message: `
            <div>平台: ${exchange_name}</div>
   	        <div>API Key: ${api_key}</div>
       `,
        type: 'success'
      })

    }
  }
}
</script>
