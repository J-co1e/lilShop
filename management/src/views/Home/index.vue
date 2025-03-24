<template>
  <div class="home">
    <div class="top">
      <el-card class="board card">
        <div class="avatar">
          <img :src="userInfo.imgUrl" />
        </div>
        <div class="username">
          <b>{{ userInfo.username }}</b>
        </div>
        <div class="role">
          {{ userInfo.status === 1 ? '管理员' : '普通用户' }}
        </div>
      </el-card>
      <div class="centerChartBoard board">
        <div class="chartTitle">菜品销量</div>
        <div class="centerChart" ref="centerChart"></div>
      </div>
      <div class="rightChartBoard board">
        <div class="chartTitle">支付方式</div>
        <div class="rightChart" ref="rightChart"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="btmChartBoard board">
        <div class="chartTitle">本周销售额</div>
        <div class="btmChart" ref="btmChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  data() {
    return {
      UserImg: require('@/assets/logo.png'),
      userInfo: {},
      centerData: {},
      rightData: [],
      btmData: [],
    }
  },
  methods: {
    getUserInfo() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    getChartsData() {
      axios.get('/getCenterChart').then((res) => {
        this.centerData = res.data
        this.getCenterChart()
      })
      axios.get('/getRightChart').then((res) => {
        this.rightData = res.data
        this.getRightChart()
      })
      axios.get('/getBtmChart').then((res) => {
        this.btmData = res.data
        console.log(this.btmData)
        this.getBtmChart()
      })
    },
    getCenterChart() {
      const that = this
      console.log(that.centerData)
      const centerChart = echarts.init(this.$refs.centerChart)
      centerChart.setOption({
        xAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#000',
              opacity: 0.2,
            },
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#000',
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#000',
            },
          },
          axisTick: {
            show: true, // x轴刻度线
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        yAxis: {
          type: 'category',
          data: that.centerData.yData,
          splitLine: {
            show: false,
            lineStyle: {
              type: 'solid',
              color: '#fff',
            },
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#000',
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#000',
            },
          },
          axisTick: {
            show: false, // x轴刻度线
          },
        },
        series: [
          {
            data: that.centerData.xData,
            type: 'bar',
          },
        ],
        grid: {
          top: 20,
          bottom: 30,
          left: 60,
          right: 30,
        },
      })
    },
    getRightChart() {
      const rightChart = echarts.init(this.$refs.rightChart)
      rightChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: 'Area Mode',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5,
            },
            labelLine: {
              normal: {
                length: 5,
              },
            },
            data: this.rightData,
          },
        ],
      })
    },
    getBtmChart() {
      const btmChart = echarts.init(this.$refs.btmChart)
      btmChart.setOption({
        xAxis: {
          type: 'category',
          data: [
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日',
          ],
        },
        tooltip: {
          trigger: 'axis',
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#000',
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#000',
            },
          },
          axisTick: {
            show: true,
          },
        },
        series: [
          {
            data: this.btmData,
            type: 'line',
            smooth: true,
          },
        ],
        grid: {
          top: 30,
          bottom: 50,
          left: 50,
          right: 50,
        },
      })
    },
    resizeCharts() {
      const centerChart = echarts.init(this.$refs.centerChart)
      const chartObserver1 = new ResizeObserver(() => {
        centerChart.resize()
      })
      chartObserver1.observe(this.$refs.rightChart)
      const rightChart = echarts.init(this.$refs.rightChart)
      const chartObserver2 = new ResizeObserver(() => {
        rightChart.resize()
      })
      chartObserver2.observe(this.$refs.rightChart)
      const btmChart = echarts.init(this.$refs.btmChart)
      const chartObserver3 = new ResizeObserver(() => {
        btmChart.resize()
      })
      chartObserver3.observe(this.$refs.btmChart)
    },
  },
  mounted() {
    this.getUserInfo()
    this.getChartsData()
    this.resizeCharts()
  },
}
</script>

<style lang="less" scoped>
::v-deep .el-card__body {
  height: 100%;
}
.card {
  .avatar {
    width: 100%;
    height: 45%;
    border-radius: 50%;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 135px;
      width: 135px;
      display: block;
      border-radius: 50%;
    }
  }
  .username {
    font-size: 20px;
  }
}
.chartTitle {
  color: var(--color);
  text-align: left;
  border-bottom: 1px solid var(--weakColor);
  font-weight: 600;
  padding: 10px;
}
.board {
  background-color: var(--sidebarBG);
  // box-shadow: 0 0 5px 1px #e7e7e7;
  border: 1px solid var(--weakColor);
}
.home {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    .el-card {
      width: 20%;
      height: 100%;
      background-color: var(--sidebarBG);
    }
    .centerChartBoard {
      height: 100%;
      width: 55%;
      display: flex;
      flex-direction: column;
      .centerChart {
        flex: 1;
      }
    }
    .rightChartBoard {
      height: 100%;
      width: 20%;
      display: flex;
      flex-direction: column;
      .rightChart {
        flex: 1;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 50%;
    background-color: rgb(215, 215, 250);
    .btmChartBoard {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .btmChart {
        flex: 1;
      }
    }
  }
}
</style>
