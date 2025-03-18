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
              <div class="title">暗黑模式</div>
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
import WebSocketClient from '@/utils/websocket'

export default {
  data() {
    return {
      isShow: false,
      refresh: 1,
      wsClient: null,
      mode: false,
      themeColor: '#5fdc84',
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
    initWebSocket() {
      const token = sessionStorage.getItem('token')
      if (token) {
        // 创建WebSocket客户端实例
        this.wsClient = new WebSocketClient('ws://127.0.0.1:81/ws', {
          reconnectInterval: 3000,
          heartbeatInterval: 30000,
          maxReconnectAttempts: 5,
        })

        // 添加消息处理器
        this.wsClient.onMessage((message) => {
          console.log('收到消息:', message)
          if (message === 'new orders' || message.type === 'new_order') {
            this.$notify.info({
              title: '提示',
              message: '当前有新订单，请注意查看',
            })
            if (this.$route.path === '/orders') {
              ++this.refresh
              this.$router.push({
                path: '/orders',
                query: { refresh: this.refresh },
              })
            } else {
              this.$router.push({ path: '/orders' })
            }
          }
        })

        // 添加状态变化处理器
        this.wsClient.onStatusChange((status) => {
          switch (status) {
            case 'connected':
              console.log('WebSocket连接成功')
              break
            case 'disconnected':
              console.log('WebSocket连接断开')
              break
            case 'error':
              console.error('WebSocket发生错误')
              break
            case 'maxReconnectAttemptsReached':
              this.$notify.error({
                title: '错误',
                message: 'WebSocket连接失败，请刷新页面重试',
              })
              break
          }
        })

        // 开始连接
        this.wsClient.connect()
      }
    },
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
      if (sessionStorage.getItem('themeColor')) {
        this.themeColor = sessionStorage.getItem('themeColor')
      } else {
        this.themeColor = '#5fdc84'
      }
    },
    settTheme() {
      setTheme('light')
      this.changeThemeColor()
    },
  },
  beforeDestroy() {
    if (this.wsClient) {
      this.wsClient.close()
    }
  },
  mounted() {
    this.getThemeColor()
    this.settTheme()
    this.initWebSocket()
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
  left: -20%;
  top: 30%;
  width: 20%;
  aspect-ratio: 1;
  background-color: var(--themeColor);
  color: var(--background);
  box-shadow: 0 0 5px 1px var(--shadowColor);
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
