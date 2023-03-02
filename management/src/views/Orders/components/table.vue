<template>
  <div class="table">
    <el-table :data="tableData" style="width: 100%" border height="100%">
      <el-empty :image-size="200"></el-empty>
      <el-table-column prop="tableNo" label="桌号" align="center">
      </el-table-column>
      <el-table-column
        prop="applyDate"
        label="下单时间"
        align="center"
      ></el-table-column>
      <el-table-column label="完结状态" align="center">
        <template v-slot="{row}">
          <el-tag :type="row.orderStatus === 1? 'success':'info'">{{row.orderStatus === 1? '已完结':'未完结'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template v-slot="{ row }">
          <div class="iconsDiv">
            <div class="iconsSpan" @click="addClick('see', row)">
              <i class="el-icon-edit" title="查看"></i>
            </div>
            <div class="iconsSpan" @click="addClick('done', row)">
              <i class="el-icon-delete" title="完结"></i>
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
      if (type === 'see') {
      }
      if (type === 'done') {
      }
    },
  },
}
</script>

<style lang="less" scoped>
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
