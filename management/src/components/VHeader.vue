<template>
  <header>
    <div class="left">
      <el-button
        plain
        :icon="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        size="medium"
        @click="handleMenu"
        class="collapseBtn"
      ></el-button>
      <el-breadcrumb separator="/" class="aa">
        <el-breadcrumb-item
          v-for="item in tabList"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown trigger="hover" size="mini">
        <span>
          <img :src="UserImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>商店详情</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "VHeader",
  data() {
    return {
      UserImg: require("../assets/logo.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("changeCollapse");
    },
    logout() {
      this.$confirm("确定退出当前账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("token");
          this.$router.push({ path: "/login" });
        })
        .catch((err) => {});
    },
  },
  computed: {
    ...mapState({
      tabList: (state) => state.tab.tabList,
      isCollapse: (state) => state.tab.isCollapse,
    }),
  },
};
</script>

<style lang="less" scoped>
header .left button {
  height: 0;
  padding-bottom: 35px;
}
.collapseBtn {
  border: none;
  display: flex;
  justify-content: flex-start;
}
.el-button--medium {
  font-size: 25px;
}
::v-deep .el-breadcrumb__inner.is-link:hover {
  color: #5fdc84;
}
::v-deep .breadcrumb__inner.is-link:hover {
  cursor: pointer;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .left {
    display: flex;
    align-items: center;
    button {
      width: 45px;
      height: 28px;
      margin-right: 10px;
    }
    .aa {
      color: #fff;
    }
  }
  .right {
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: white;
      transform: translateY(5px);
    }
  }
}
</style>
