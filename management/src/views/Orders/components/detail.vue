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
          <div class="t1">桌号：{{ obj.tableNo }}</div>
          <div class="t2">总金额：{{ total }}</div>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          height="95%"
          :row-config="{ isHover: true }"
          show-overflow
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
            label="类别"
            prop="type"
            align="center"
          ></el-table-column>
          <el-table-column
            label="描述"
            prop="description"
            header-align="center"
            show-overflow-tooltip
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
      obj: {}
    }
  },
  methods: {
    openDialog(row) {
      this.dialogVisible = true
      this.obj = row
    },
    handleClose() {

    }
  },
  computed: {
    total() {
      return 20
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
</style>