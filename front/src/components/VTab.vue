<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <div class="switchTab">
    <van-tabs v-model:active="active" @change="tabChange">
      <van-tab title="点菜" to="/"></van-tab>
      <van-tab title="我的订单" to="/myOrder"></van-tab>
      <van-tab title="关于我们" to="myDetail"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    }
  },
  methods: {
    tabChange() {},
  },
}
</script>

<style lang="less" scoped>
.switchTab {
  height: 5vh;
}
::v-deep .van-tabs__line {
  background-color: #00933f !important;
}
</style>
