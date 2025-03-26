interface WebSocketOptions {
  reconnectInterval?: number
  heartbeatInterval?: number
  maxReconnectAttempts?: number
}
interface WebSocketMessage {
  type: number | string
  data: any
}
class WebSocketClient {
  private url: string
  private options: WebSocketOptions
  private socket: WebSocket | null = null
  private isConnected: boolean
  private reconnectAttempts: number
  private heartbeatTimer: NodeJS.Timeout | null
  private reconnectTimer: NodeJS.Timeout | null
  private messageCallbacks: Map<number | string, () => void>
  private statusCallbacks: Map<number | string, () => void>
  constructor(url: string, options: WebSocketOptions) {
    this.url = url
    this.options = {
      reconnectInterval: options.reconnectInterval || 3000, // 重连间隔时间
      heartbeatInterval: options.heartbeatInterval || 30000, // 心跳间隔时间
      maxReconnectAttempts: options.maxReconnectAttempts || 5 // 最大重连次数
    }
    this.socket = null
    this.isConnected = false
    this.reconnectAttempts = 0
    this.heartbeatTimer = null
    this.reconnectTimer = null
    this.messageCallbacks = new Map()
    this.statusCallbacks = new Map()
  }
  connect() {
    try {
      this.socket = new WebSocket(this.url)
      this.socket.onopen = this.handleOpen.bind(this)
      this.socket.onmessage = this.handleMessage.bind(this)
      this.socket.onerror = this.handleError.bind(this)
      this.socket.onclose = this.handleClose.bind(this)
    } catch (error) {
      console.log('Socket连接出错:' + error)
      this.reconnect()
    }
  }
  reconnect() {
    if (this.reconnectAttempts >= (this.options.maxReconnectAttempts ?? 5)) {
      console.log('Socket重连次数已达上限')
      return
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
    }
    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++
      console.log(`WebSocket重连第${this.reconnectAttempts}次`)
      this.connect()
    }, this.options.reconnectInterval)
  }
  handleError(error: Event) {
    console.log('Socket连接出错:' + error)
  }
  handleClose() {
    console.log('Socket连接关闭')
    this.isConnected = false
    this.stopHeartbeat()
    this.reconnect()
  }
  handleOpen() {
    console.log('Socket连接成功')
    this.isConnected = true
    this.reconnectAttempts = 0
    this.startHeartbeat()
  }
  handleMessage(event: MessageEvent) {
    console.log('Socket收到消息:' + event.data)
  }
  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      if (this.isConnected) {
        this.sendMessage({
          type: 'heartbeat',
          data: 'ping'
        })
      }
    }, this.options.heartbeatInterval)
  }
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }
  sendMessage(message: WebSocketMessage) {
    if (!this.isConnected) {
      console.log('Socket未连接，无法发送消息')
      return
    }
    try {
      this.socket?.send(JSON.stringify(message))
    } catch (error) {
      console.log('Socket发送消息出错:' + error)
    }
  }
}
export default WebSocketClient
