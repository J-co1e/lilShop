<template>
  <div class="null">
    <div class="center">
      <img src="@/assets/404.png" alt="404" />
      <div>当前页面不存在,页面将在3s后跳转至首页</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backHome() {
      setTimeout(() => {
        this.$router.push({ path: '/home' })
      }, 3000)
    }
  },
  mounted() {
    this.backHome()
  }
}
</script>

<style lang="less" scoped>
.null {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center{
  width: 40%;
  height: 40%;
  display: flex;
  flex-direction: column;
  img{
    display: block;
    flex: 1;
  }
}
</style>