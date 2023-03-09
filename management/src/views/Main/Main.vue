<template>
  <el-container style="height: 100%">
    <el-aside width="auto"><Aside></Aside></el-aside>
    <el-container class="main-border">
      <el-header><VHeader></VHeader></el-header>
      <el-main class="main-div">
        <div class="rightBox" ref="rightBox">
          <div class="boxBtn" @click="toggle">
            <i :class="!isShow ? 'el-icon-setting' : 'el-icon-arrow-right'"></i>
          </div>
          <div class="optionsBox">
            <b>系统配置</b>
            <div class="item">
              <div class="title">夜间模式</div>
              <el-switch
                style="display: block"
                v-model="mode"
                @change="changeMode"
              >
              </el-switch>
            </div>
            <div class="item">
              <div class="tit">主题色</div>
              <el-color-picker
                v-model="themeColor"
                @change="changeThemeColor"
                :predefine="predefineColors"
                size="medium"
              ></el-color-picker>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/Aside.vue'
import VHeader from '@/components/VHeader.vue'
import { setThemeColor, setTheme } from '@/utils/color'
export default {
  data() {
    return {
      isShow: false,
      mode: false,
      themeColor: '',
      predefineColors: [
        '#5fdc84',
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
      ],
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
      const rightBox = document.querySelector('.rightBox')
      const boxWidth = rightBox.offsetWidth
      if (!this.isShow) {
        rightBox.style.right = `-${boxWidth}px`
      } else {
        rightBox.style.right = `0`
      }
    },
    changeThemeColor() {
      setThemeColor(this.themeColor)
    },
    changeMode() {
      const theme = this.mode ? 'dark' : 'light'
      const body = document.body
      body.style.colorScheme = theme
      setTheme(theme)
    },
    getThemeColor() {
      this.themeColor = sessionStorage.getItem('themeColor')
    },
    settTheme() {
      console.log(1)
      setTheme('light')
    },
  },
  mounted() {
    this.getThemeColor()
    this.settTheme()
  },
  components: { Aside, VHeader },
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: var(--background);
  box-shadow: 0 0 3px 1px var(--weakColor);
  padding-left: 0;
  display: flex;
  align-items: center;
}
.el-main {
  padding-top: 0;
}
.main-border {
  color: var(--color);
  background: var(--background);
}
.main-div {
  position: relative;
}
.rightBox {
  position: fixed;
  right: -13%;
  top: 50%;
  transform: translateY(-50%);
  width: 13%;
  height: 100%;
  background-color: var(--background);
  box-shadow: 0 0 10px 1px var(--shadowColor);
  z-index: 99;
  transition: all 0.4s ease;
}
.optionsBox {
  margin-top: 40px;
  padding: 0 20px;
  b {
    margin-bottom: 50px;
    display: block;
  }
  .item {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
  }
}
.boxBtn {
  position: absolute;
  left: -15%;
  top: 30%;
  width: 15%;
  background-color: var(--themeColor);
  color: var(--background);
  box-shadow: 0 0 5px 1px var(--shadowColor);
  height: 5%;
  font-size: 25px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &::after {
    content: '';
    width: 5px;
    height: 100%;
    background-color: var(--background);
    position: absolute;
    right: -5px;
    z-index: 9999999;
  }
}
</style>
