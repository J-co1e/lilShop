<template>
  <el-menu
    :default-active="routerPath"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#25242c"
    text-color="#fff"
    active-text-color="##25242c"
    style="height: 100vh"
  >
    <h2>
      <label for="">{{ isCollapse ? title.slice(0, 2) : title }}</label>
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: '123',
      // menu: [],
      activeMenu: '/',
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
      console.log(this.menu)
      console.log(this.$router.getRoutes())
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
    // ...mapState({
    //   menu: (state) => state.permission.routers,
    // }),
    menu() {
      return JSON.parse(sessionStorage.getItem('routers'))
    },
  },
  mounted() {
    this.getMenu()
  },
}
</script>

<style lang="less" scoped>
::v-deep.el-menu-item .el-tooltip {
  padding: 0 10px !important;
}
.el-aside {
  overflow: unset;
}
.el-menu-item.is-active {
  background-color: #5fdc84 !important;
  border-radius: 5px;
  color: #fff;
}
.el-menu-item {
  margin: 5px 10px;
  text-align: left;
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
  color: white;
  margin-top: 20px;
  text-align: center;
  margin-bottom: 30px;
}
</style>
