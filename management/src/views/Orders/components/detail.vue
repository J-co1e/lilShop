<template>
  <div class="detail">
    <el-dialog
      title="订单详情"
      :visible.sync="dialogVisible"
      width="50%"
      @close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="dialogContainer">
        <div class="tt">
          <div class="t1">
            桌号：<span>{{ obj.tableNo }}</span>
          </div>
          <div class="t2">
            总金额：<span>￥{{ total }}</span>
          </div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          height="95%"
          :row-config="{ isHover: true }"
          show-overflow
          :header-cell-style="{
            background: '#f8f8f9',
            color: '#3f536e',
            border: '1px solid rgb(240,240,240)',
          }"
        >
          <el-empty description="暂无数据"></el-empty>
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
        </el-table>
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
      obj: {},
      total: 0
    }
  },
  methods: {
    openDialog(row) {
      this.dialogVisible = true
      this.obj = row
      this.tableData = JSON.parse(row.orderData)
      this.total = this.tableData.map(item => {
        return item.price * item.total
      }).reduce((pre, cur) => {
        return pre + cur
      }, 0).toFixed(2)
    },
    handleClose() {

    }
  }
}
</script>

<style lang="less" scoped>
.dialogContainer {
  height: 500px;
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
  }
}
.t2 {
  span {
    color: #e15f5f;
    font-weight: bold;
    font-size: 18px;
  }
}
::v-deep .el-table tbody .el-table__cell {
  padding: 5px;
}
</style>