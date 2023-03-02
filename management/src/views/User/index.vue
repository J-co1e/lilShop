<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary" @click="addUser" icon="el-icon-plus">新增</el-button>
      <div class="searchBox">
        <el-input
          v-model.trim="keyword"
          @keyup.enter.native="handleSearch"
          placeholder="请输入用户名"
        ></el-input>
        <el-button icon="el-icon-search" type="primary" size="medium" @click="handleSearch"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh-left" @click="getAllUsers">重置</el-button>
      </div>
    </div>
    <div class="manage-body">
      <Table ref="table"></Table>
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
import { getUsers, searchUsers } from '@/api/users'
import Table from './components/table'
import Add from './components/add'
export default {
  components: { Table, Add },
  data() {
    return {
      keyword: '',
      total: 0,
      page: {
        currentPage: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
      },
    }
  },
  methods: {
    addUser() {
      this.$refs.add.openDialog()
    },
    getAllUsers() {
      this.keyword = ''
      getUsers({
        current: this.page.currentPage,
        size: this.page.pageSize,
      }).then(({ data: res }) => {
        this.$refs.table.tableData = res.data
        this.page.total = res.total
      })
    },
    handleSearch() {
      searchUsers({username: this.keyword}).then(({data:res})=>{
        if(res.code === '200') {
          this.$refs.table.tableData = res.data
          this.page.total = res.total
        }
      })
    },
    handleSizeChange(e) {
      this.page.pageSize = e
      this.getAllUsers()
    },
    handleCurrentChange(e) {
      this.page.currentPage = e
      this.getAllUsers()
    },
  },
  mounted() {
    this.getAllUsers()
  },
}
</script>

<style lang="less" scoped>
.manage {
  padding-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
}
.searchBox {
  display: flex;
  .el-input {
    margin-right: 10px;
  }
}
</style>
