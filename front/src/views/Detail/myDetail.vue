<template>
  <div class="detail">
    <div class="item">
      <div class="image">
        <img :src="imgUrl" alt="" />
      </div>
      <div class="itemRight">
        <div class="name">{{ name }}</div>
        <div class="desc">{{ desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopInfo } from '@/api/index'
export default {
  name: 'myDetail',
  components: {},
  data() {
    return {
      isTabShow: true,
      name: '',
      desc: '',
      imgUrl: '',
    }
  },
  methods: {
    getShopInfo() {
      getShopInfo().then(({ data: res }) => {
        this.imgUrl = res.data[0].shopPic
        this.name = res.data[0].shopName
        this.desc = res.data[0].shopDetail
      })
    },
  },
  mounted() {
    this.getShopInfo()
  },
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  .image {
    border-radius: 15px;
    border: 1px solid #e7e7e7;
    margin-right: 20px;
    img {
      width: 85px;
      height: 85px;
    }
  }
  .itemRight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      font-weight: bold;
    }
  }
}
</style>
