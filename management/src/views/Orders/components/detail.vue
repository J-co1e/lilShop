<template>
  <div class="detail">
    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      width="50%"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <div class="dialogContainer">
        <div class="tt">
          <div class="t1">
            桌号：<span>{{ obj.tableNo }}</span> 用餐人数：<span>{{
              diners
            }}</span>
          </div>
          <div class="t2">
            总金额：<span>￥{{ total }}</span>
          </div>
        </div>
        <div class="tableTitle">第{{ times }}次下单</div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          height="500"
          :row-config="{ isHover: true }"
          show-overflow
          :header-cell-style="{
            background: '#f8f8f9',
            color: '#3f536e',
            border: '1px solid rgb(240,240,240)',
          }"
        >
          <template slot="empty">
            <el-empty description="暂无数据"></el-empty>
          </template>
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column prop="foodName" label="菜品名称" align="center">
          </el-table-column>
          <el-table-column
            label="类别"
            prop="type"
            align="center"
          ></el-table-column>
          <el-table-column label="图片" align="center">
            <template v-slot="{ row }">
              <el-popover placement="top-start" label="" trigger="hover">
                <img
                  :src="row.imgUrl"
                  alt=""
                  style="width: 150px; height: 150px"
                />
                <img
                  slot="reference"
                  :src="row.imgUrl"
                  style="width: 50px; height: 50px"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="价格" align="center">
            <template v-slot="{ row }">
              <span>￥{{ row.price.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="数量"
            align="center"
            prop="total"
          ></el-table-column>
          <el-table-column label="总价" align="center">
            <template v-slot="{ row }">
              <span>￥{{ (row.total * row.price).toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="page"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      orderData: [],
      totalOrders: [],
      obj: {},
      total: 0,
      diners: 0,
      times: 1,
      page: {
        currentPage: 1,
        pageSize: 1,
        total: 0,
      },
    }
  },
  methods: {
    handleCurrentChange(e) {
      this.tableData = this.orderData[e - 1].orders
      this.times = this.orderData[e - 1].times
    },
    handleClose() {
      this.total = 0
      this.tableData = []
      this.orderData = []
    },
    openDialog(row) {
      this.dialogVisible = true
      this.obj = row
      this.orderData = JSON.parse(row.orderData)
      this.page.total = this.orderData.length
      this.diners = this.orderData[0].diners
      this.tableData = this.orderData[0].orders
      this.times = this.orderData[0].times
      this.orderData.forEach(item => {
        this.totalOrders = [...this.totalOrders, ...item.orders]
      })
      this.total = this.totalOrders
        .map(item => {
          return item.total * item.price
        })
        .reduce((pre, cur) => {
          return pre + cur
        }, 0)
        .toFixed(2)
    },
  },
}
</script>

<style lang="less" scoped>
.dialogContainer {
  height: fit-content;
  max-height: 800px;
  overflow: auto;
}
.page {
  margin-top: 10px;
}
.tt {
  margin-bottom: 10px !important;
  width: 98%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
}
.t1 {
  span {
    font-size: 18px;
    font-weight: bold;
    &:first-child {
      margin-right: 10px;
    }
  }
}
.tableTitle {
  text-align: left;
  border-left: 3px solid var(--themeColor);
  padding: 5px 8px;
  font-size: 14px;
  margin-bottom: 8px;
}
.t2 {
  span {
    color: #e15f5f;
    font-weight: bold;
    font-size: 18px;
  }
}
.tablePrice {
  color: #e15f5f;
}
::v-deep .el-table tbody .el-table__cell {
  padding: 5px;
}
</style>
