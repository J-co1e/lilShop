<template>
  <el-menu
    :default-active="routerPath"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    active-text-color="##25242c"
    style="height: 100vh"
  >
    <h2>
      <img :src="storeImg" alt="">
      <label for="" v-show="!isCollapse">{{  title }}</label>
    </h2>
    <el-menu-item
      :index="item.path"
      v-for="item in menu"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :index="item.path + ''"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subitem, index) in item.children"
        :key="subitem.path"
      >
        <el-menu-item :index="index.toString()" @click="clickMenu(subitem)">{{
          subitem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getStoreInfo } from '@/api/shop'
export default {
  data() {
    return {
      title: '',
      // menu: [],
      activeMenu: '/',
      storeImg: ''
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      })
      this.$store.commit('selectMenu', item)
    },
    getMenu() {
      // this.menu = this.$store.state.permission.routers
      getStoreInfo({}).then(({ data: res }) => {
        this.title = res.data[0].shopName
        this.storeImg = res.data[0].shopPic
      })
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    routerPath() {
      return this.$route.path
    },
    menu() {
      return JSON.parse(sessionStorage.getItem('routers')).slice(0,-1)
    },
  },
  mounted() {
    this.getMenu()
  },
}
</script>

<style lang="less" scoped>
ul{
  background-color: var(--sidebarBG);
}
::v-deep.el-menu-item .el-tooltip {
  padding: 0 10px !important;
}
.el-aside {
  overflow: unset;
}
.el-menu-item.is-active {
  background-color: var(--themeColor) !important;
  border-radius: 5px;
  color: var(--background);
}
 .el-menu-item:not(.is-active):hover{
  background-color: var(--hoverColor);
  color: var(--color);
  border-radius: 5px;
 }
.el-menu-item {
  margin: 5px 10px;
  text-align: left;
  color: var(--color);
}
.el-submenu {
  margin: 5px 10px;
  text-align: left;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.el-menu-item,
.el-submenu__title {
  height: 50px;
  line-height: 50px;
}
h2 {
  color: var(--color);
  margin-top: 20px;
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border-radius: 5px;
  }
}
</style>
