<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      height="100%"
      :row-config="{ isHover: true }"
      show-overflow
    >
      <template slot="empty">
        <el-empty description="暂无数据"></el-empty>
      </template>
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column prop="foodName" label="菜品名称" align="center">
      </el-table-column>
      <el-table-column label="图片" align="center">
        <template v-slot="{ row }">
          <el-popover placement="top-start" label="" trigger="hover">
            <img :src="row.imgUrl" alt="" style="width: 150px; height: 150px" />
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
      <el-table-column label="操作" width="150" align="center">
        <template v-slot="{ row }">
          <div class="iconsDiv">
            <div
              class="iconsSpan"
              @click="addClick('edit', row)"
              v-show="isAdmin"
            >
              <i class="el-icon-edit" label="编辑"></i>
            </div>
            <div
              class="iconsSpan"
              @click="addClick('del', row)"
              v-show="isAdmin"
            >
              <i class="el-icon-delete" label="删除"></i>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Edit ref="edit"></Edit>
  </div>
</template>

<script>
import { deleteFoods } from '@/api/foods'
import Edit from './Edit.vue'
export default {
  data() {
    return {
      tableData: [],
    }
  },
  components: { Edit },
  methods: {
    addClick(type, row) {
      const parent = this.$parent.$parent.$parent
      if (type === 'edit') {
        this.$refs.edit.openDialog(row)
      }
      if (type === 'del') {
        this.$confirm('确定删除当前菜品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            deleteFoods({ foodId: row.foodId }).then(({ data: res }) => {
              if (res.code === '200') {
                this.$message.success('删除成功')
                parent.getAllFoods()
              }
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
  },
  computed: {
    isAdmin() {
      return +sessionStorage.getItem('isAdmin')
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .el-table tbody .el-table__cell {
  padding: 5px;
}
::v-deep .el-tooltip__popper {
  max-width: 350px;
}
.table {
  height: 99.8%;
}
</style>
