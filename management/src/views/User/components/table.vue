<template>
  <div class="table">
    <el-table :data="tableData" style="width: 100%" border height="100%">
      <template slot="empty">
        <el-empty description="暂无数据"></el-empty>
      </template>
      <el-table-column prop="username" label="姓名" header-align="center">
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template v-slot="{ row }">
          <el-popover placement="top-start" title="" trigger="hover">
            <img :src="row.imgUrl" alt="" style="width: 150px; height: 150px" />
            <img
              slot="reference"
              :src="row.imgUrl"
              style="width: 50px; height: 50px"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="是否管理员" align="center">
        <template v-slot="{ row }">
          <el-tag :type="row.status === 1 ? '' : 'info'">{{
            row.status === 1 ? '是' : '否'
          }}</el-tag>
        </template>
      </el-table-column>
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
    <Edit ref="edit"></Edit>
  </div>
</template>

<script>
import { deleteUser } from '@/api/users'
import Edit from './edit.vue'
export default {
  data() {
    return {
      tableData: [],
    }
  },
  components: { Edit },
  methods: {
    addClick(type, row) {
      if (type === 'edit') {
        this.$refs.edit.openDialog(row)
      }
      if (type === 'del') {
        this.$confirm('是否删除当前用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          deleteUser({ userId: row.userId }).then(({ data: res }) => {
            if (res.code === '200') {
              this.$message.success('删除成功')
              this.$parent.getAllUsers()
            }
          })
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .el-table--border th.el-table__cell {
  border-right: 1px solid #dcdcdc;
}
.table {
  height: 95%;
  margin: 10px 0;
}
::v-deep .talePic {
  width: 100%;
  height: 100%;
}
</style>
