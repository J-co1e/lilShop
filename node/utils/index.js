const AliPaySdk = require('alipay-sdk').default
exports.getNowDate = () => {
  const d = new Date()
  const year = d.getFullYear()
  let month = d.getMonth() + 1
  let date = d.getDate()
  let hour = d.getHours()
  let minute = d.getMinutes()
  let second = d.getSeconds()
  month = month > 9 ? month : '0' + month
  date = date > 9 ? date : '0' + date
  hour = hour > 9 ? hour : '0' + hour
  minute = minute > 9 ? minute : '0' + minute
  second = second > 9 ? second : '0' + second
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}
exports.aliPay = new AliPaySdk({
  appId: '2021000122621423', // 开放平台上创建应用时生成的 appId
  signType: 'RSA2', // 签名算法,默认 RSA2
  gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改
  alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiKid06ouisaHMNwh4YK5yo4KEMwgNqY7f8fHjBIfF2jXlwB7qximsnecwhgFrscIo7B5pqrBTqbeEl6AHzvZzlihuhRJc6GxMtNcxADPf6Sl9HVGfiP43JZqIaSJsRz+U17iO4S1ryratsvMrNqWHKvrv6gkQIrUs243c3p6xqZWoIcLIaee23ovklIXqt7vmE95VH/KalNiy7Wf/pjpH/zOhS+WU5XVaFFLNfloBHDxLwrMztWk9U5OIlJObTR8mzyB+gHUp5MsiUVTyr9wxAuYKzSJOLxtMYH+OYhUokSV548v4GBl1Xvto5mV6VlY6c+9DydR+zoq9zBbzSb5lwIDAQAB', // 支付宝公钥，需要对结果验签时候必填
  privateKey: 'MIIEpAIBAAKCAQEAmA3JnWVlkXSX1MW8fr5/tT7xxInOlhDzjt6O0UP7rvlrMU2rCocbIHbMoLGpodrt9uqQ2Xq10bVOMPpTA2yWALz9EIxLccKFtWZ6U6VHcQwBt8pT+iECSntyAW68wxriZHd6s+A6ZNX0mt629w0soCYU7sWCcJ4ZNLDVEJGpelN0BhyQcjL3rb9o2GK/zGcnFLlcRVJhqe93zBpTUiTjvc3acmPhurLu66SpfufwN3BOIh7UfRo9zMlObxwJyng7hEn5ckHMegwlelR3kqpwT4y/GyvZopXaAg0MTe6j7jwrJI4zL480KTEV1i0+N05vkRwutPNHB2llKo1NFhYPNwIDAQABAoIBAQCVSvxJARSfo2WsMNXpb+t+LqY8/b2L1Gr/PP/m8iP84cHgr8yfUpZM4rf5k1blp0p8ZEUCc5xvod968V1ugEAry2OByu4MbRzRRiQXWrFxioNpTEv1zFEuhlQimfLWceAVGsasNB3Bgd1f7gqhORs2xw1Ifz6ainBfLryUPyCzDBeVMk4garfSmvNaus5Z1ypNQmjqq6I1Pq49LCqRXsQ/VaslKV9/XY5iTHCNyOGcRpNx8Js3Ae06RgYY3hVEliquM2y+TXi7fmGpiYYYA61NTtZe+6cXLczPyF5fR2I8EJTfMPiZN92ugjeqRV92C8mCsxeho8UqwkNm4WtFjhcxAoGBAM36ia1AwwznztICmxH8n95ymsiLKgXn8w76tY68WBp6KYP6ZE4aaz4to1LqCDzIPB9vzQBEDdP/7tySJHAweNTLJx7DvJvJ+v05JCWt9ADFuZbb74uWuG8DdvR92awpMrRGrixmIaUxbrwm3e0PmGAiqVKuD1WIjh7QE4tX+Tr5AoGBALz6zh32rSf1zRwXAXYaZE/QCiSlJ0C+pQBdZ6Y6RFLXhkRS5Lk/RhaNAOzPZAy80XqLE4KgdZDzfaV82P1LWrSFGQ46MraV/vSPK1EGIub/rWMk90VXm0/5glTgClTa7VEzKEeUKrij7x91Y0IKFjh+rqdpyuVa8QlDmbDo9XevAoGBAIwDw3Su8ieip3cgaFLYu7+VfdvWpXEwU4uaJrJpGyacZf4dxfNFiCLTGRNynLjcj+n6sIp+uDuk3LS47uYIPQrBMc161om7yc45+nVWgufHgDmpNXNYt/RWkZTuu3mI47uh1CHAJxzItnJVpUPQ9w5aYWkfgrLsyVbusGpnGbbZAoGAPJkT9Qm/lpu8LLC32D44QluMlRmcT6eSU16gOO5gMExKEqieDUTb3alTTZxnEaqOZYQpOm7npBZgCOvSzM4YBODVGvnQfznz6knqcu3LzVTZLXySCdtAw1FX2I2K4pDdHneQB/vcAx8WM3k53dhMLct5h9dlp0wVFIpnwxHAfKMCgYBElRz2wydeuYxRF5T9i6WF+TIWiOuil4OSQZMLQ0FCE4LRxBnbk20ra9O6yDXdNtBl6D/2ljreweqd8a8QN0vRT3avoNpOl9PZNrvLo+D/4i7wG8XMt31FBiYpnCeh7/Rq2xCsPureMtbfy8DDsDa+tVL6EUXQZsNWyr6shD8Oug==', // 应用私钥字符串
});