import { UserLoginParams } from '@/api/model/userModel'
import { userLogin } from '@/api/user'
import { defineStore } from 'pinia'
const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      role: [] as string[]
    }
  },
  persist: {
    key: 'user-store',
    storage: sessionStorage
  },
  actions: {
    Login(loginForm: UserLoginParams) {
      return new Promise((resolve, reject) => {
        userLogin(loginForm)
          .then(({ data: res }) => {
            if (res.code === '9999') {
              reject('用户名或密码错误，请重新输入')
            } else {
              this.token = res.token
              resolve({ roles: res.roles, id: res.id })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  }
})

export default useUserStore
