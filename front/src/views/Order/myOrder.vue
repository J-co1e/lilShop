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
          <div class="itemLeft">
            <img :src="goods.imgUrl" alt="" />
            <div class="foodName">
              {{ goods.foodName }}
            </div>
          </div>
          <div class="itemRight">
            <div class="total">份数：{{ goods.total }}</div>
            <div class="price">
              总价：￥<span> {{ (goods.total * goods.price).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="orderItem last"></div>
    </div>
    <div class="orderFooter">
      <div class="total">
        <span>总价:</span><span>￥{{ total }}</span>
      </div>
      <div class="settle" :class="orderData.length === 0 ? '' : 'active'">
        <span @click="settle">结算</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrders, settleOrder, queryPaidStatus, paidOrder } from '@/api/index'
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      orderData: [],
      outTradeNo: '',
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
    settle() {
      // 结算
      if (this.orderData.length === 0)
        return this.$toast({
          type: 'fail',
          message: '请先添加商品',
        })
      const outTradeNo = uuidv4()
      this.outTradeNo = outTradeNo
      settleOrder({ outTradeNo: outTradeNo, total: +this.total }).then(res => {
        window.open(res.data.url, '_blank')
        this.$toast({
          type: 'loading',
          message: '正在获取支付结果',
          overlay: true,
          forbidClick: true,
          duration: 0,
          className: 'toast',
        })
        this.getResult()
      })
    },
    getResult() {
      queryPaidStatus({ outTradeNo: this.outTradeNo }).then(({ data: res }) => {
        if (res === '交易支付成功') {
          this.$toast({
            message: '支付成功',
            type: 'success',
          })
          const tableNo = sessionStorage.getItem('tableNo')
          paidOrder({ tableNo })
          sessionStorage.clear()
          this.$router.push({ path: '/' })
          return
        }
        setTimeout(() => {
          this.getResult()
        }, 1000)
      })
    },
  },
  computed: {
    total() {
      let orders = []
      this.orderData.forEach(item => {
        orders.push(...item.orders)
      })
      const totalPrice = orders
        .map(item => {
          return item.total * item.price
        })
        .reduce((pre, cur) => {
          return pre + cur
        }, 0)
        .toFixed(2)
      return totalPrice
    },
  },
  mounted() {
    this.getOrderData()
  },
}
</script>

<style lang="less" scoped>
.foodName {
  margin-left: 10px;
}
.price {
  margin-left: 5px;
}
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
  .listItem {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    width: 100%;
    .itemLeft {
      display: flex;
      align-items: center;
    }
    .itemRight {
      width: 50%;
      justify-content: flex-end;
      display: flex;
      align-items: center;
    }
    img {
      width: 45px;
      height: 45px;
    }
  }
}
.orderItem.last {
  height: 50px;
}
.orderFooter {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 6%;
  background-color: #f3f3f3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .total {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-weight: bold;
    font-size: 17px;
    span:nth-child(2) {
      color: #ff4b4b;
      font-size: 20px;
    }
  }
  .settle {
    &.active {
      background-color: #53f179;
    }
    background-color: #bbb;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    padding: 0 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.order {
  height: 75vh;
  position: relative;
}
.orderList {
  height: 100%;
  width: 100%;
  overflow: auto;
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
