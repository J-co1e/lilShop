<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8" style="margin-top: 10px">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userInfo.imgUrl" alt="" />
            <div class="userInfo">
              <p class="name">
                <b>{{ userInfo.username }}</b>
              </p>
              <p class="access" style="font-size: 13px">
                {{ userInfo.status === 1 ? '管理员' : '普通用户' }}
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {
      UserImg: require('@/assets/logo.png'),
      userInfo: {},
    }
  },
  methods: {
    getUserInfo() {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
  },
  mounted() {
    this.getUserInfo()
  },
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
  .userInfo {
    position: relative;
    left: 20px;
    p:nth-of-type(1) {
      font-size: 23px;
    }
  }
}
.login-info {
  font-size: 13px;
  span {
    margin-left: 20px;
  }
}
.num {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  i {
    width: 78px;
    height: 78px;
    font-size: 30px;
    text-align: center;
    line-height: 78px;
    color: #fff;
  }
  p:nth-last-of-type(1) {
    font-size: 10px;
    color: #ccc;
    margin-right: 30px;
    width: 140px;
  }
  p {
    margin-left: 20px;
  }
}
.graph {
  display: flex;
}
</style>
