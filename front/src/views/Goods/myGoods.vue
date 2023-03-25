<template>
  <div class="goods">
    <div class="goodsContainer">
      <div class="orderList">
        <div class="orderTop">
          <span>订单列表</span>
          <div class="cartDiv">
            <van-icon name="delete-o" />
            <span class="cart" @click="clearCart">清空购物车</span>
          </div>
        </div>
        <div class="orderBtm">
          <div class="orderItem" v-for="(item, index) in orders">
            <div class="orderLeft">
              <span class="foodName">{{ item.foodName }}</span>
              <span class="price"
                >￥{{ (item.price * item.total).toFixed(2) }}</span
              >
            </div>
            <div class="orderRight">
              <i
                class="fa fa-minus-circle"
                @click="reduce2(item.foodId, index)"
              ></i>
              <span>{{ item.total }}</span>
              <i
                class="fa fa-plus-circle"
                @click="increase2(item.foodId, index)"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div class="left" ref="menuScroll">
        <ul>
          <li
            class="menu-item"
            :class="{ current: currentIndex === 0 }"
            @click="selectMenu(0)"
          >
            {{ firstNav.title }}
            <div class="num" v-show="calculateCount(firstNav.items)">
              {{ calculateCount(firstNav.items) }}
            </div>
          </li>
          <li
            v-for="(item, index) in goodList"
            :key="index"
            class="menu-item"
            :class="{ current: currentIndex === index + 1 }"
            @click="selectMenu(index + 1)"
          >
            {{ item.title }}
            <div class="num" v-show="calculateCount(item.items)">
              {{ calculateCount(item.items) }}
            </div>
          </li>
        </ul>
      </div>
      <div class="right" ref="foodScroll">
        <ul>
          <li
            v-for="(good, index1) in goods"
            :key="index1"
            :id="good.title"
            class="food-list-hook"
          >
            <h1 class="goodTitle">{{ good.title }}</h1>
            <ul class="good">
              <li v-for="(item, index2) in good.items" :key="index2">
                <div class="itemLeft">
                  <img :src="item.imgUrl" />
                  <div class="itemDetail">
                    <span class="foodName">{{ item.foodName }}</span>
                    <span class="foodDetail">{{ item.description }}</span>
                    <span class="foodPrice">￥{{ item.price }}</span>
                  </div>
                </div>
                <div>
                  <div :class="{ pop: true, mov: item.total > 0 }">
                    <i
                      class="fa fa-minus-circle"
                      @click="reduce(index1, index2)"
                    ></i>
                    <span>{{ item.total }}</span>
                  </div>
                  <i
                    class="fa fa-plus-circle"
                    @click="increase(index1, index2, $event)"
                  ></i>
                </div>
              </li>
            </ul>
          </li>
          <li class="food-list-hook lastLi"></li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <div
        class="logo-wrapper"
        :class="{ highlight: total > 0 }"
        @click="getOrderList"
      >
        <span
          class="icon-shopping_cart logo"
          :class="{ highlight: total > 0 }"
        ></span>
        <!--记录订单总数  -->
        <div class="total" v-show="total > 0">{{ total }}</div>
      </div>
      <div class="totalPrice" v-show="Math.round(totalPrice) !== 0">
        ￥{{ totalPrice }}
      </div>
      <div :class="{ pay: true, notPay: total == 0 }" @click="settle">下单</div>
    </div>
    <div id="points">
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
      <div class="pointOuter pointPre">
        <div class="point-inner"></div>
      </div>
    </div>
    <van-popup
      v-model:show="dialogShow"
      :style="{ padding: '20px 10px' }"
      :close-on-click-overlay="false"
      round
    >
      <div class="main">
        <div class="man">
          <span>用餐人数</span>
          <van-stepper v-model="manTotal" min="1" max="10" />
        </div>
        <div class="table">
          <span>桌号</span>
          <van-stepper v-model="tableNo" min="1" max="10" />
        </div>
        <div class="btn">
          <van-button round class="confirmBtn" @click="confirm"
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getFoods, getTypes, addOrders, paidOrder } from '@/api/index'
import $ from 'jquery'
import BScroll from 'better-scroll'
import '@/style/goods.css'
import '@/style/icon.css'
import '@/style/font-awesome/css/font-awesome.css'
export default {
  name: 'myGoods',
  components: {},
  data() {
    return {
      isShow: false,
      dialogShow: false,
      flag: '',
      manTotal: 1,
      tableNo: 1,
      total: 0,
      navs: [],
      goods: [],
      goodList: [],
      firstNav: {},
      listHeight: [],
      orders: [],
      menuScroll: {},
      foodScroll: {},
      scrollY: 0,
    }
  },
  methods: {
    getAllFoods() {
      sessionStorage.setItem('token', '')
      this.manTotal = sessionStorage.getItem('manTotal')
      this.tableNo = sessionStorage.getItem('tableNo')
      const flag = sessionStorage.getItem('flag')
      if (flag) {
        this.flag = sessionStorage.getItem('flag')
        this.goods = JSON.parse(sessionStorage.getItem('orders'))
        this.firstNav = this.goods[0]
        this.goodList = this.goods.slice(1)
        this.$nextTick(() => {
          this.initScroll()
          this.calculateHeight()
        })
        return
      }
      getTypes({}).then(({ data: res }) => {
        this.navs = res.data.map(item => {
          return item.type
        })
        this.navs.forEach(item => {
          const obj = {
            title: item,
            items: [],
          }
          if (this.flag === '') {
            this.goods.push(obj)
          }
        })
        this.getGoods()
      })
    },
    getGoods() {
      getFoods({ current: 1, size: 999 }).then(({ data: res }) => {
        const foods = res.data
        foods.forEach(food => {
          food.total = 0
          this.goods.forEach(item => {
            if (food.type === item.title) {
              item.items.push(food)
            }
          })
        })
        sessionStorage.setItem('orders', JSON.stringify(this.goods))
        this.firstNav = this.goods[0]
        this.goodList = this.goods.slice(1)
        this.$nextTick(() => {
          this.initScroll()
          this.calculateHeight()
        })
      })
    },
    settle() {
      if (this.total === 0) return
      console.log(JSON.parse(JSON.stringify(this.orders)))
      const params = {
        orderData: this.orders,
        tableNo: this.tableNo,
        diners: this.manTotal,
      }
      addOrders(params).then(({ data: res }) => {
        if (res.code === '200') {
          this.$toast({
            message: '下单成功',
            type: 'success',
          })
          sessionStorage.removeItem('flag')
          sessionStorage.removeItem('orders')
          this.$router.go(0)
        }
      })
    },
    getOrderList() {
      if (this.total === 0) return
      const orderList = document.querySelector('.orderList')
      const height = orderList.offsetHeight
      this.isShow
        ? (orderList.style.transform = `translateY(${height + 55}px)`)
        : (orderList.style.transform = `translateY(0)`)
      this.isShow = !this.isShow
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        click: true,
      })
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3,
        click: true,
      })
      //foodScroll监听事件
      this.foodScroll.on('scroll', pos => {
        this.scrollY = Math.abs(pos.y)
      })
    },
    calculateHeight() {
      let foodList =
        this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        // 累加
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    // 食品选购按钮
    increase(index1, index2, event) {
      const item = this.goods[index1].items[index2]
      item.total++
      if (item.total - 1 === 0) {
        this.orders.push(item)
      }
      this.total++
      if (event) {
        this.controlBall(event)
      }
      this.firstNav = this.goods[0]
      this.goodList = this.goods.slice(1)
      sessionStorage.setItem('orders', JSON.stringify(this.goods))
    },
    reduce(index1, index2) {
      this.total--
      const item = this.goods[index1].items[index2]
      item.total--
      this.orders = this.orders.filter(item => {
        return item.total > 0
      })
      this.firstNav = this.goods[0]
      this.goodList = this.goods.slice(1)
      sessionStorage.setItem('orders', JSON.stringify(this.goods))
    },
    increase2(foodId, i) {
      this.total++
      this.goods.forEach(food => {
        food.items.forEach(item => {
          if (item.foodId === foodId) {
            item.total++
          }
        })
      })
      this.firstNav = this.goods[0]
      this.goodList = this.goods.slice(1)
      sessionStorage.setItem('orders', JSON.stringify(this.goods))
    },
    reduce2(foodId, i) {
      this.total--
      this.goods.forEach(food => {
        food.items.forEach(item => {
          if (item.foodId === foodId) {
            item.total--
          }
        })
      })
      this.firstNav = this.goods[0]
      this.goodList = this.goods.slice(1)
      this.orders = this.orders.filter(item => {
        return item.total > 0
      })
      sessionStorage.setItem('orders', JSON.stringify(this.goods))
    },
    controlBall(event) {
      let top = event.clientY, // 小球降落起点
        left = event.clientX,
        endTop = window.innerHeight - 30, // 小球降落终点
        endLeft = 20
      // // 小球到达起点
      let outer = $('#points .pointPre')
        .first()
        .removeClass('pointPre')
        .css({
          left: left + 'px',
          top: top + 'px',
        })
      let inner = outer.find('.point-inner')
      setTimeout(function () {
        // 将jquery对象转换为DOM对象
        outer[0].style.webkitTransform =
          'translate3d(0,' + (endTop - top) + 'px,0)'
        inner[0].style.webkitTransform =
          'translate3d(' + (endLeft - left) + 'px,0,0)'
        // 小球运动完毕恢复到原点
        setTimeout(function () {
          outer.removeAttr('style').addClass('pointPre')
          inner.removeAttr('style')
        }, 1000) //这里的延迟值和小球的运动时间相关
      }, 1)
    },
    selectMenu(index) {
      let foodList =
        this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      let element = foodList[index]
      this.foodScroll.scrollToElement(element, 250)
    },
    calculateCount(items) {
      if (items) {
        try {
          let count = 0
          items.forEach(food => {
            if (food.total > 0) {
              count += food.total
            }
          })
          return count
        } catch (error) {
          console.log(error)
        }
      }
    },
    clearCart() {
      this.orders = []
      this.goods.forEach(food => {
        food.items.forEach(item => {
          item.total = 0
        })
      })
      this.total = 0
      sessionStorage.setItem('orders', '[]')
      const orderList = document.querySelector('.orderList')
      const height = orderList.offsetHeight
      orderList.style.transform = `translateY(${height + 55}px)`
    },
    getTableNo() {
      if (sessionStorage.getItem('tableNo')) {
      } else {
        this.dialogShow = true
      }
    },
    confirm() {
      this.dialogShow = false
      sessionStorage.setItem('manTotal', this.manTotal)
      sessionStorage.setItem('tableNo', this.tableNo)
      sessionStorage.setItem('flag', '1')
    },
    getOrders() {
      if (
        sessionStorage.getItem('orders') &&
        JSON.parse(sessionStorage.getItem('orders')).length > 0
      ) {
        this.goods = JSON.parse(sessionStorage.getItem('orders'))
        let orders = []
        this.goods.forEach(good => {
          good.items.forEach(item => {
            if (item.total > 0) {
              orders.push(item)
            }
          })
        })
        this.orders = orders
        this.total = this.orders
          .map(item => {
            return item.total
          })
          .reduce((pre, cur) => {
            return pre + cur
          }, 0)
      }
    },
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    totalPrice() {
      return this.orders
        .map(item => {
          return item.price * item.total
        })
        .reduce((pre, cur) => {
          return pre + cur
        }, 0)
        .toFixed(2)
    },
  },
  created() {
    this.getAllFoods()
    this.getTableNo()
    this.getOrders()
  },
}
</script>
<style lang="less">
.van-popup {
  width: 80%;
}
</style>
<style lang="less" scoped>
.goods {
  height: 75vh;
}
::v-deep .van-button__content {
  margin: 5px 10px;
}
.btn {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.confirmBtn {
  background-color: #07c160;
  color: #fff !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .van-button__text {
  color: #fff;
}
.itemLeft {
  display: flex;
  padding: 10px 0;
  .itemDetail {
    margin-left: 5px;
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .foodName {
      font-size: 16px;
    }
    .foodDetail {
      font-size: 14px;
      color: #aaaaaa;
      white-space: nowrap;
    }
    .foodPrice {
      color: #ff4b4b;
      font-size: 16px;
    }
  }
  img {
    width: 85px;
    height: 85px;
  }
}
.orderList {
  width: 100%;
  height: fit-content;
  min-height: 20%;
  background-color: #fff;
  z-index: 99;
  position: absolute;
  transition: all 0.3s ease-in-out;
  bottom: 55px;
  transform: translateY(100%);
  i.fa-plus-circle {
    color: #53f179;
  }
  i.fa-minus-circle {
    color: #ccc;
  }
  .orderTop {
    display: flex;
    width: 100%;
    background-color: #f4f4f4;
    justify-content: space-between;
    padding: 10px 8px;
    border: 1px solid #ccc;
    .cartDiv {
      font-size: 0.32rem;
      display: flex;
      align-items: center;
      .cart {
        font-size: 0.28rem;
        color: #666;
      }
    }
  }
  .orderBtm {
    padding: 5px 0 15px 0;
  }
  .orderItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;
    width: 100%;
    .orderLeft {
      padding-left: 5px;
      font-size: 0.32rem;
      .foodName {
        margin-right: 10px;
      }
      .price {
        color: #dd6666;
      }
    }
    .orderRight {
      font-size: 20px;
      span {
        margin: 0 10px;
      }
    }
  }
}
.main {
  width: 100%;
}
.lastLi {
  height: 200px;
}
.man {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 10px;
}
.table {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.totalPrice {
  font-size: 18px;
  color: #fff;
  position: relative;
  bottom: 10%;
  right: 23%;
}
</style>
