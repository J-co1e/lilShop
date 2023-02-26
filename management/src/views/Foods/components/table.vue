<template>
  <div class="table">
    <el-table :data="tableData" style="width: 100%" border height="100%">
      <el-empty description="暂无数据"></el-empty>
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="50"
      ></el-table-column>
      <el-table-column prop="foodName" label="菜品名称" align="center">
      </el-table-column>
      <el-table-column label="图片" header-align="center"></el-table-column>
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
      <el-table-column label="操作" width="150" align="center">
        <template v-slot="{ row }">
          <div class="iconsDiv">
            <div class="iconsSpan" @click="addClick('edit', row)">
              <i class="el-icon-edit" title="编辑"></i>
            </div>
            <div class="iconsSpan" @click="addClick('del', row)">
              <i class="el-icon-delete" title="删除"></i>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    }
  },
  components: {},
  methods: {
    addClick(type, row) {
      if (type === 'edit') {
      }
      if (type === 'del') {
      }
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .el-tooltip__popper {
  max-width: 350px;
}
.iconsDiv {
  display: flex;
  justify-content: space-around;
}
.iconsSpan {
  cursor: pointer;
  color: #5fdc84;
  font-size: 18px;
}
.table {
  height: 95%;
  margin: 10px 0;
}
</style>
