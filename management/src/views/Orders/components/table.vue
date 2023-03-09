<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      height="100%"
    >
      <el-empty :image-size="200"></el-empty>
      <el-table-column prop="tableNo" label="桌号" align="center">
      </el-table-column>
      <el-table-column
        prop="applyDate"
        label="下单时间"
        align="center"
      ></el-table-column>
      <el-table-column label="付款状态" align="center">
        <template v-slot="{ row }">
          <el-tag :type="row.isPayed === 1 ? 'success' : 'info'">{{
            row.isPayed === 1 ? '已付款' : '未付款'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="完结状态" align="center">
        <template v-slot="{ row }">
          <el-tag :type="row.orderStatus === 1 ? 'success' : 'info'">{{
            row.orderStatus === 1 ? '已完结' : '未完结'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单详情" align="center">
        <template v-slot="{ row }">
          <el-button @click="checkFoods(row)">查看菜品列表</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template v-slot="{ row }">
          <div class="iconsDiv" v-show="isAdmin">
            <div class="iconsSpan" @click="addClick('done', row)">
              <i class="el-icon-circle-check" title="完结"></i>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Detail ref="detail"></Detail>
  </div>
</template>

<script>
import { doneOrder } from '@/api/orders'
import Detail from './detail'
export default {
  data() {
    return {
      tableData: [],
    }
  },
  components: { Detail },
  methods: {
    addClick(type, row) {
      if (type === 'done') {
        this.$confirm('确定完结当前订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            doneOrder({ orderId: row.orderId }).then(({data:res})=>{
              if(res.code === '200') {
                this.$message.success('操作成功')
                this.$parent.handleSearch()
              }
            })
          })
          .catch(err => { console.log(err) })
      }
    },
    checkFoods(row) {
      this.$refs.detail.openDialog(row)
    }
  },
  computed: {
    isAdmin() {
      return +sessionStorage.getItem('isAdmin')
    }
  },
}
</script>

<style lang="less" scoped>
.table {
  height: 95%;
  margin: 10px 0;
}
</style>
