<template>
  <div class="manage">
    <div class="manage-header">
      <div class="searchBox">
        <span class="tt">桌号:</span>
        <el-input
          size="medium"
          v-model.trim="keyword"
          @keyup.enter.native="handleSearch"
          placeholder="请输入桌号"
        ></el-input>
        <span class="tt">订单期间:</span>
        <el-date-picker
          v-model="startDate"
          type="date"
          placeholder="请选择开始日期"
          value-format="yyyy-MM-dd"
          :picker-options="startDateOption"
          format="yyyy-MM-dd"
          :clearable="true"
          size="medium"
        >
        </el-date-picker>
        <span class="srt">至</span>
        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="请选择结束日期"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          :clearable="true"
          :picker-options="endDateOption"
          @change="handleSearch"
          size="medium"
        >
        </el-date-picker>
        <span class="tt">完结状态:</span>
        <el-select
          v-model="orderStatus"
          placeholder="请选择完结状态"
          style="margin-right: 10px"
          size="medium"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="searchBtn">
        <el-button icon="el-icon-search" type="primary" @click="handleSearch"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh-left" @click="handleReset" plain
          >重置</el-button
        >
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
  </div>
</template>

<script>
import { getOrders, searchOrders, addOrders } from '@/api/orders'
import Table from './components/table'
export default {
  data() {
    return {
      keyword: '',
      total: 0,
      startDate: '',
      endDate: '',
      orderStatus: 2,
      page: {
        currentPage: 1,
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
      },
      statusOptions: [
        { value: 1, name: '已完结' },
        { value: 0, name: '未完结' },
        { value: 2, name: '全部' },
      ],
      endDateOption: {
        // 结束日期选择器限制
        disabledDate: time => {
          return new Date(time).getTime() < new Date(this.startDate).getTime()
        },
      },
      startDateOption: {
        disabledDate: time => {
          return new Date(time).getTime() > new Date(this.endDate).getTime()
        },
      },
    }
  },
  components: { Table },
  methods: {
    addUser() {
      this.$refs.add.openDialog()
    },
    getNowDate() {
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = month > 9 ? month : '0' + month
      day = day > 9 ? day : '0' + day
      const str = `${year}-${month}-${day}`
      this.startDate = str
      this.endDate = str
    },
    getAllOrders() {
      this.keyword = ''
      getOrders({
        current: this.page.currentPage,
        size: this.page.pageSize,
      }).then(({ data: res }) => {
        this.$refs.table.tableData = res.data
        this.page.total = res.total
      })
    },
    handleSearch() {
      if (
        this.keyword === '' &&
        this.startDate === '' &&
        this.orderStatus === 2
      )
        return this.getAllOrders()
      this.startDate = this.startDate + ' 00:00:00'
      this.endDate = this.endDate + ' 23:59:59'
      searchOrders({
        tableNo: this.keyword,
        startDate: this.startDate,
        endDate: this.endDate,
        orderStatus: this.orderStatus,
      }).then(({ data: res }) => {
        if (res.code === '200') {
          this.$refs.table.tableData = res.data
          this.page.total = res.total
        }
      })
    },
    handleReset() {
      this.keyword = ''
      this.getNowDate()
      this.handleSearch()
    },
    handleSizeChange(e) {
      this.page.pageSize = e
      this.getAllOrders()
    },
    handleCurrentChange(e) {
      this.page.currentPage = e
      this.getAllOrders()
    },
  },
  computed: {
    isAdmin() {
      return +sessionStorage.getItem('isAdmin')
    },
  },
  mounted() {
    this.getNowDate()
    this.handleSearch()
  },
}
</script>

<style lang="less">
.el-table--border th.el-table__cell {
  border-right: 1px solid #dcdcdc;
}
</style>
<style lang="less" scoped>
.tt {
  margin-right: 5px;
  font-size: 15px;
}
.manage {
  padding-top: 10px;
  width: 100%;
  height: 98%;
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
.srt {
  margin-right: 10px;
}
::v-deep .el-table tbody .el-table__cell {
  padding: 5px;
}
.searchBox {
  display: flex;
  align-items: center;
  .el-input {
    width: unset;
    margin-right: 10px;
  }
}
</style>
