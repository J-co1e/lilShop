<template>
  <div class="goods">
    <div class="goodsContainer">
      <div class="left" ref="left">
        <ul>
          <li
            v-for="(item, index) in navs"
            :key="index"
            :class="{ click: selector === index }"
            @click="toHash(item, index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="right" @scroll="listScroll">
        <ul>
          <li v-for="(good, index1) in goods" :key="index1" :id="good.title">
            <h1 class="goodTitle">{{ good.title }}</h1>
            <ul class="good">
              <li v-for="(item, index2) in good.items" :key="index2">
                <div class="itemLeft">
                  <img :src="item.imgUrl" />
                  {{ item.foodName }}
                </div>
                <div>
                  <div :class="{ pop: true, mov: item.total > 0 }">
                    <i
                      class="fa fa-minus-circle"
                      @click="reduce(index1, index2)"
                    ></i>
                    {{ item.total }}
                  </div>
                  <i
                    class="fa fa-plus-circle"
                    @click="increase(index1, index2, $event)"
                  ></i>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
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
    <div class="footer">
      <div>
        <i class="fa fa-shopping-cart"></i>
        <!--记录订单总数  -->
        <div class="total" v-show="total > 0">{{ total }}</div>
      </div>
      <div :class="{ pay: true, notPay: total == 0 }">去结算</div>
    </div>
  </div>
</template>

<script>
import { getFoods, getTypes } from '@/api/index'
import $ from 'jquery'
import '@/style/goods.css'
import '@/style/font-awesome/css/font-awesome.css'
export default {
  name: 'myGoods',
  components: {},
  data() {
    return {
      total: 0,
      selector: 0,
      navs: [],
      goods: [],
    }
  },
  methods: {
    getAllFoods() {
      getTypes({}).then(({ data: res }) => {
        this.navs = res.data.map(item => {
          return item.type
        })
        this.navs.forEach(item => {
          const obj = {
            title: item,
            items: [],
          }
          this.goods.push(obj)
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
      })
    },
    toHash(item, index) {
      this.selector = index
      window.location.hash = item
      // 导航栏向上滚动相应距离，一个li的高度为54px
      this.$refs.left.scrollTop = (index > 7 ? index - 7 : 0) * 54
    },
    // 食品选购按钮
    increase(index1, index2, event) {
      this.total++
      this.goods[index1].items[index2].total++
      // 小球动画
      var top = event.clientY, // 小球降落起点
        left = event.clientX,
        endTop = window.innerHeight - 30, // 小球降落终点
        endLeft = 20
      // // 小球到达起点
      var outer = $('#points .pointPre')
        .first()
        .removeClass('pointPre')
        .css({
          left: left + 'px',
          top: top + 'px',
        })
      var inner = outer.find('.point-inner')
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
    reduce(index1, index2) {
      this.total--
      this.goods[index1].items[index2].total--
    },
    // 右侧菜单滑动
    listScroll() {
      // 为了达到联动效果，右侧滑动则改变左侧导航栏样式
      var titles = document.getElementsByClassName('goodTitle')
      const clientHeight = document.documentElement.clientHeight * 0.252
      for (var i = 0; i < titles.length; i++) {
        var style = titles[i].getBoundingClientRect()
        if (style.top < clientHeight) {
          if (i === 0) continue
          console.log(titles[i])
          this.toHash(titles[i].innerHTML, i)
        }
      }
    },
  },
  mounted() {
    this.getAllFoods()
  },
}
</script>

<style lang="less" scoped>
.goods {
  height: 75vh;
}
.itemLeft {
  img {
    width: 75px;
    height: 75px;
  }
}
</style>
