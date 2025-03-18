const env = process.env.NODE_ENV

const config = {
  development: {
    baseUrl: 'http://192.168.1.6:88/api',
  },
  production: {
    baseUrl: 'https://106.53.115.216:88/api',
  },
}
export default {
  baseUrl: config[env].baseUrl,
}
