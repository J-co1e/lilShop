<template>
  <div class="order">
    <van-empty
      image="https://iconfont.alicdn.com/p/illus/preview_image/mdwsscwyLLR0/ac40fa2b-19eb-4399-ac42-71da07a9664d.png"
      v-show="isEmpty"
      description=""
    />
    <div class="orderList" v-show="!isEmpty">
      <div class="orderItem" v-for="(item, index) in orderData" :key="index">
        <div class="listTitle">
          <span>第{{ item.times }}次下单</span>
        </div>
        <div
          class="listItem"
          v-for="(goods, index) in item.orders"
          :key="index"
        >
          {{ goods.foodName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrders } from '@/api/index'
export default {
  data() {
    return {
      orderData: [],
      isEmpty: false,
    }
  },
  methods: {
    getOrderData() {
      const params = {
        startDate: '',
        endDate: '',
        tableNo: +sessionStorage.getItem('tableNo'),
        orderStatus: 0,
      }
      getOrders(params).then(({ data: res }) => {
        if (res.code === '200') {
          if (res.data.length === 0) {
            this.isEmpty = true
            return
          }
          this.orderData = JSON.parse(res.data[0].orderData)
          console.log(JSON.parse(JSON.stringify(this.orderData)))
        }
      })
    },
  },
  mounted() {
    this.getOrderData()
  },
}
</script>

<style lang="less" scoped>
.orderItem {
  padding: 5px 10px;
  .listTitle {
    background-color: #f3f3f3;
    font-size: 0.42rem;
    padding: 3px;
    span {
      border-left: 3px solid #00933f;
      padding-left: 5px;
    }
  }
}
.order {
  height: 75vh;
  position: relative;
}
.orderList {
  height: 100%;
  width: 100%;
}
.van-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0;
  width: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
}
::v-deep .van-empty__image {
  width: 5rem;
  height: 5rem;
}
</style>
