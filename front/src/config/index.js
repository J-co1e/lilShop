const env = process.env.NODE_ENV

const config = {
  development: {
    baseUrl: 'http://127.0.0.1:88'
  },
  production: {
    baseUrl: 'https://106.53.115.216:88'
  }
}

export default {
  baseUrl: config[env].baseUrl
}