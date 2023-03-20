<template>
  <div class="search">
    <div class="searchTop">
      <van-icon name="arrow-left" @click="goBack" size=".4rem" />
      <van-field
        v-model.trim="keyword"
        clearable
        placeholder="请输入搜索内容"
        @clear="clearInput"
        @keyup.enter="handleSearch"
      />
      <span @click="handleSearch">搜索</span>
    </div>
    <div class="searchContent" v-show="!isSearch">
      <div class="contTop">
        <span>历史搜索</span>
        <van-icon
          name="delete-o"
          size=".5rem"
          color="#aaa"
          @click="clearKeyword"
        />
      </div>
      <div class="contBtm">
        <span
          v-for="(item, index) in keyList"
          :key="index"
          @click="spanClick(item)"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="searchResult" v-show="isSearch">
      <ul class="good">
        <li v-for="(item, index2) in searchList" :key="index2">
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
              <i class="fa fa-minus-circle" @click="reduce(index1, index2)"></i>
              <span>{{ item.total }}</span>
            </div>
            <i
              class="fa fa-plus-circle"
              @click="increase(index1, index2, $event)"
            ></i>
          </div>
        </li>
      </ul>
      <van-empty
        image="search"
        v-show="isEmpty"
        description="暂无相关的商品，换个关键词试试吧"
      />
    </div>
  </div>
</template>

<script>
import '@/style/goods.css'
import '@/style/icon.css'
import '@/style/font-awesome/css/font-awesome.css'
export default {
  name: 'mySearch',
  data() {
    return {
      keyword: '',
      isSearch: false,
      isEmpty: false,
      keyList: [],
      searchList: [],
    }
  },
  props: ['orders', 'goods'],
  methods: {
    increase() {},
    reduce() {},
    goBack() {
      // 回退
      this.$parent.$parent.isPopupShow = false
      this.keyword = ''
      this.clearInput()
    },
    handleSearch() {
      // 搜索事件
      this.isEmpty = false
      if (this.keyword === '') return
      this.isSearch = true
      this.searchList = this.searchList.filter(item => {
        return item.foodName.indexOf(this.keyword) !== -1
      })
      if (this.searchList.length === 0) {
        this.isEmpty = true
        return
      }
      if (!this.keyList.includes(this.keyword)) {
        this.keyList.unshift(this.keyword)
      } else {
        this.keyList.splice(this.keyList.indexOf(this.keyword), 1)
        this.keyList.unshift(this.keyword)
      }
      localStorage.setItem('keywordList', JSON.stringify(this.keyList))
    },
    getKeyword() {
      // 从localStorage拿历史记录
      this.searchList = this.$parent.$parent.goods
      this.keyList = JSON.parse(localStorage.getItem('keywordList') || '[]')
    },
    clearKeyword() {
      // 删除历史记录
      this.$dialog({
        showConfirmButton: true,
        showCancelButton: true,
        title: '提示',
        message: '确认删除全部历史记录？',
      })
        .then(() => {
          this.keyList = []
          localStorage.setItem('keywordList', [])
        })
        .catch(() => {})
    },
    clearInput() {
      // 清除输入
      this.isSearch = false
      this.searchList = this.$parent.$parent.goods
    },
    spanClick(item) {
      // 点击历史记录
      this.keyword = item
      this.handleSearch()
    },
  },
  mounted() {
    this.getKeyword()
  },
}
</script>

<style lang="less" scoped>
::v-deep .van-empty__description {
  font-size: 16px;
}
.good {
  height: 100%;
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
.search {
  height: 100vh;
  background-color: #fff;
  padding-top: 0.2rem;
  display: flex;
  flex-direction: column;
  .searchTop {
    margin: 0 auto;
    background-color: rgb(245, 245, 245);
    border-radius: 0.5rem;
    padding: 0 0.2rem;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-cell {
      flex: 1;
      border: none;
      font-size: 0.32rem;
      padding: 0.2rem 0.1rem;
      margin-left: 0.1rem;
      background-color: rgb(245, 245, 245);
    }
    span {
      display: inline-block;
      padding: 0 0.2rem;
      font-size: 0.32rem;
      border-left: 0.02rem solid #ccc;
      color: rgb(130, 130, 130);
    }
  }
  .searchContent {
    background-color: #fff;
    margin-top: 0.4rem;
    flex: 1;
    .contTop {
      margin: 0.2rem auto;
      width: 90%;
      display: flex;
      justify-content: space-between;
      font-size: 0.35rem;
      font-weight: 600;
      border-bottom: 1px solid rgb(200, 200, 200);
      padding-bottom: 0.3rem;
    }
    .contBtm {
      padding: 0 10px;
      max-height: 15vh;
      overflow: hidden;
      span {
        display: inline-block;
        background-color: rgb(241, 241, 241);
        border-radius: 25px;
        padding: 0.14rem 0.3rem;
        margin: 0.1rem;
      }
    }
  }
  .searchResult {
    background-color: #fff;
    margin-top: 0.4rem;
    flex: 1;
  }
}
</style>
