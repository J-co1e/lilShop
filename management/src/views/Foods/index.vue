<template>
  <div class="manage">
    <div class="manage-header">
      <div class="btnGroup">
        <el-button
          type="primary"
          @click="addFood"
          icon="el-icon-plus"
          v-show="isAdmin && isFood"
          >新增菜品</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addType"
          v-show="isAdmin && !isFood && !isConfirm"
          style="margin-left: 0"
          >新增类别</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-check"
          v-show="isAdmin && !isFood && isConfirm"
          @click="confirmAdd"
          >确定</el-button
        >
      </div>
      <div class="searchBox" v-show="isFood">
        <span class="tt">菜品名称:</span>
        <el-input
          v-model="keyword"
          @keyup.enter.native="handleSearch"
          placeholder="请输入菜品名称"
          size="medium"
        ></el-input>
        <el-button icon="el-icon-search" type="primary" @click="handleSearch"
          >搜索</el-button
        >
        <el-button
          @click="getAllFoods"
          icon="el-icon-refresh-left"
          style="margin-left: 10px"
          size="medium"
          plain
          >重置</el-button
        >
      </div>
    </div>
    <div class="manage-body">
      <el-tabs type="border-card" v-model="tabName" @tab-click="tabChange">
        <el-tab-pane label="菜品列表" name="1">
          <Table ref="table"></Table>
        </el-tab-pane>
        <el-tab-pane label="类别列表" name="2">
          <TypeTable ref="typeTable" :isConfirm="isConfirm"></TypeTable>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
    <Add ref="add"></Add>
  </div>
</template>

<script>
import { getFoods, searchFoods } from '@/api/foods'
import { getTypes, addType } from '@/api/type'
import Table from './components/table'
import TypeTable from './components/typeTable'
import Add from './components/add'
export default {
  components: { Table, Add, TypeTable },
  data() {
    return {
      keyword: '',
      total: 0,
      tabName: '1',
      isFood: true,
      isConfirm: false,
      page: {
        currentPage: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
      },
    }
  },
  methods: {
    addFood() {
      this.$refs.add.openDialog()
    },
    getAllFoods() {
      this.keyword = ''
      getFoods({
        current: this.page.currentPage,
        size: this.page.pageSize,
      }).then(({ data: res }) => {
        this.$refs.table.tableData = res.data
        this.page.total = res.total
      })
    },
    getAllTypes() {
      getTypes().then(({ data: res }) => {
        if (res.code === '200') {
          this.$refs.typeTable.typeTableData = res.data
          this.page.total = res.total
        }
      })
    },
    tabChange() {
      if (this.tabName === '1') {
        this.isFood = true
        this.getAllFoods()
      } else {
        this.isFood = false
        this.getAllTypes()
      }
    },
    async addType() {
      this.isConfirm = true
      const $table = this.$refs.typeTable.$refs.vTable
      const record = {}
      $table.insertAt(record, -1).then(({ row }) => $table.setActiveRow(row))
    },
    confirmAdd() {
      const table = this.$refs.typeTable.$refs.vTable
      addType({
        type: table.afterFullData[table.afterFullData.length - 1].type,
      })
        .then(({ data: res }) => {
          if (res.code === '200') {
            this.$message.success('添加成功')
            this.getAllTypes()
          }
        })
        .catch(err => {
          this.$message.warning(err)
        })
      this.isConfirm = false
    },
    handleSearch() {
      searchFoods({
        foodName: this.keyword,
      }).then(({ data: res }) => {
        if (res.code === '200') {
          this.$refs.table.tableData = res.data
          this.page.total = res.total
          this.keyword = ''
        }
      })
    },
    handleSizeChange(e) {
      this.page.pageSize = e
      this.getAllFoods()
    },
    handleCurrentChange(e) {
      this.page.currentPage = e
      this.getAllFoods()
    },
  },
  computed: {
    isAdmin() {
      return +sessionStorage.getItem('isAdmin')
    },
  },
  mounted() {
    this.getAllFoods()
  },
}
</script>

<style lang="less" scoped>
.manage {
  padding-top: 10px;
  width: 100%;
  height: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.el-tab-pane {
  height: 100%;
}
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}
.manage-body {
  flex: 1;
  padding: 10px 0;
  padding-bottom: 50px;
}
.tt {
  margin-right: 5px;
  white-space: nowrap;
  font-size: 15px;
}
::v-deep .el-tabs--border-card {
  display: flex;
  flex-direction: column;
}
.searchBox {
  display: flex;
  align-items: center;
  .el-input {
    margin-right: 10px;
  }
}
.el-tabs {
  height: 100%;
}
::v-deep .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.el-tab-pane {
  height: 100%;
}
::v-deep .el-tabs__content {
  flex: 1;
}
</style>
