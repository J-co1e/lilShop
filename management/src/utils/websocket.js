class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url
    this.options = {
      reconnectInterval: options.reconnectInterval || 3000, // 重连间隔时间
      heartbeatInterval: options.heartbeatInterval || 30000, // 心跳间隔时间
      maxReconnectAttempts: options.maxReconnectAttempts || 5, // 最大重连次数
    }
    this.ws = null
    this.isConnected = false
    this.reconnectAttempts = 0
    this.heartbeatTimer = null
    this.reconnectTimer = null
    this.messageCallbacks = new Map()
    this.statusCallbacks = new Map()

    // 绑定方法到实例
    this.connect = this.connect.bind(this)
    this.reconnect = this.reconnect.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
  }

  // 连接WebSocket
  connect() {
    try {
      this.ws = new WebSocket(this.url)
      this.ws.onopen = this.handleOpen
      this.ws.onclose = this.handleClose
      this.ws.onerror = this.handleError
      this.ws.onmessage = this.handleMessage
    } catch (error) {
      console.error('WebSocket连接错误:', error)
      this.reconnect()
    }
  }

  // 重新连接
  reconnect() {
    if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
      console.error('WebSocket重连次数超过最大限制')
      this.notifyStatusChange('maxReconnectAttemptsReached')
      return
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
    }

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++
      console.log(
        `WebSocket尝试重连 (${this.reconnectAttempts}/${this.options.maxReconnectAttempts})`
      )
      this.connect()
    }, this.options.reconnectInterval)
  }

  // 处理连接打开
  handleOpen() {
    console.log('WebSocket连接成功')
    this.isConnected = true
    this.reconnectAttempts = 0
    this.startHeartbeat()
    this.notifyStatusChange('connected')
  }

  // 处理连接关闭
  handleClose(event) {
    console.log('WebSocket连接关闭:', event)
    this.isConnected = false
    this.stopHeartbeat()
    this.notifyStatusChange('disconnected')
    this.reconnect()
  }

  // 处理错误
  handleError(error) {
    console.error('WebSocket错误:', error)
    this.notifyStatusChange('error')
  }

  // 处理消息
  handleMessage(event) {
    try {
      console.log('收到消息2:', event)
      const message = JSON.parse(event.data)
      if (message.type === 'heartbeat') {
        return // 忽略心跳响应
      }
      this.messageCallbacks.forEach((callback) => callback(message))
    } catch (error) {
      console.error('消息处理错误:', error)
    }
  }

  // 开始心跳
  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected) {
        this.send({ type: 'heartbeat' })
      }
    }, this.options.heartbeatInterval)
  }

  // 停止心跳
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  // 发送消息
  send(data) {
    if (!this.isConnected) {
      console.warn('WebSocket未连接，无法发送消息')
      return false
    }

    try {
      const message = typeof data === 'string' ? data : JSON.stringify(data)
      this.ws.send(message)
      return true
    } catch (error) {
      console.error('发送消息错误:', error)
      return false
    }
  }

  // 添加消息监听器
  onMessage(callback) {
    const id = Date.now().toString()
    this.messageCallbacks.set(id, callback)
    return id
  }

  // 添加状态监听器
  onStatusChange(callback) {
    const id = Date.now().toString()
    this.statusCallbacks.set(id, callback)
    return id
  }

  // 移除监听器
  removeListener(id) {
    this.messageCallbacks.delete(id)
    this.statusCallbacks.delete(id)
  }

  // 通知状态变化
  notifyStatusChange(status) {
    this.statusCallbacks.forEach((callback) => callback(status))
  }

  // 关闭连接
  close() {
    this.stopHeartbeat()
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
    }
    if (this.ws) {
      this.ws.close()
    }
  }
}

export default WebSocketClient
