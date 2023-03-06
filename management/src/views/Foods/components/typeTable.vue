<template>
  <div class="typeTable">
    <vxe-table
      :data="typeTableData"
      style="width: 100%"
      border
      height="100%"
      ref="vTable"
      keep-source
      :edit-config="{
        trigger: 'manual',
        mode: 'row',
      }"
      :row-config="{ isHover: true }"
    >
      <el-empty description="暂无数据"></el-empty>
      <vxe-column
        type="seq"
        align="center"
        title="序号"
        width="60"
        :edit-render="{
          autofocus: '.vxe-input--inner',
          defaultValue: '默认的名字',
        }"
      ></vxe-column>
      <vxe-column
        field="type"
        title="分类名称"
        align="center"
        :edit-render="{}"
      >
        <template #edit="{ row }">
          <vxe-input v-model="row.type" type="text"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column title="操作" width="150" align="center">
        <template v-slot="{ row }">
          <div class="iconsDiv" v-show="!isConfirm">
            <div
              class="iconsSpan"
              @click="addClick('edit', row)"
              v-show="isAdmin && !$refs.vTable.isActiveByRow(row)"
            >
              <i class="el-icon-edit" title="编辑"></i>
            </div>
            <div
              class="iconsSpan"
              @click="addClick('confirm', row)"
              v-show="isAdmin && $refs.vTable.isActiveByRow(row)"
            >
              <i class="el-icon-check" title="确定"></i>
            </div>
            <div
              class="iconsSpan"
              @click="addClick('del', row)"
              v-show="isAdmin"
            >
              <i class="el-icon-delete" title="删除"></i>
            </div>
          </div>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
import { updateType, deleteType } from '@/api/type'
export default {
  data() {
    return {
      typeTableData: [],
      isEdit: true,
    }
  },
  props: ['isConfirm'],
  components: {},
  methods: {
    addClick(type, row) {
      const parent = this.$parent.$parent.$parent
      if (type === 'edit') {
        const table = this.$refs.vTable
        table.setActiveRow(row)
      }
      if (type === 'confirm') {
        const table = this.$refs.vTable
        updateType({
          id: row.id,
          type: row.type,
        }).then(({ data: res }) => {
          if (res.code === '200') {
            this.$message.success('修改成功')
            table.clearActived()
            this.$parent.getAllTypes()
          }
        })
      }
      if (type === 'del') {
        this.$confirm('确定删除当前类别吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            deleteType({ id: row.id }).then(({ data: res }) => {
              if (res.code === '200') {
                this.$message.success('删除成功')
                parent.getAllTypes()
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
.typeTable {
  height: 95%;
}
</style>
