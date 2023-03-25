<template>
  <div class="login">
    <img src="@/assets/wave.png" class="wave" />
    <div class="container">
      <div class="img">
        <img src="@/assets/data.svg" alt="" class="data" />
      </div>
      <div class="login-content">
        <div class="form">
          <img src="@/assets/avatar.svg" alt="" class="avatar" />
          <h2 class="title"></h2>
          <div class="input-div one">
            <div class="i">
              <i class="fas fa-user"></i>
            </div>
            <div class="inputClass1">
              <el-input
                placeholder=""
                v-model.trim="form.username"
                ref="nameInput"
              ></el-input>
            </div>
          </div>
          <div class="input-div pass">
            <div class="i">
              <i class="fas fa-lock"></i>
            </div>
            <div class="inputClass2">
              <el-input
                placeholder=""
                type="password"
                v-model.trim="form.password"
                show-password
                @keyup.enter.native="login"
              ></el-input>
            </div>
          </div>
          <input type="submit" class="btn" value="登录" @click="login" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://kit.fontawesome.com/a81368914c.js"></script>
<script src="./main.js"></script>
<script>
import './style.css'
import { searchUsers } from '@/api/users'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    focusInput() {
      sessionStorage.removeItem('userObj')
      this.$refs.nameInput.focus()
      this.form.username = ''
      this.form.password = ''
    },
    login() {
      if (this.form.username === '')
        return this.$message.warning('请输入用户名')
      if (this.form.password === '') return this.$message.warning('请输入密码')
      sessionStorage.setItem('userObj', JSON.stringify(this.form))
      this.$store
        .dispatch('Login', this.form)
        .then(res => {
          this.$notify({
            title: '登录成功',
            message: `欢迎，${this.form.username}`,
            type: 'success',
          })
          this.$store.dispatch('permission/GenerateRoutes', res)
          const addRouters = this.$store.state.permission.addRouters
          if (addRouters.length > 0) {
            for (let i = 0; i < addRouters.length; i++) {
              this.$router.addRoute('main', addRouters[i])
            }
          }
          searchUsers({ username: this.form.username }).then(
            ({ data: res }) => {
              console.log(res)
              sessionStorage.setItem('userInfo', JSON.stringify(res.data[0]))
              sessionStorage.setItem('isAdmin', '' + res.data[0].status)
              this.$router.push({ path: '/home' })
            }
          )
        })
        .catch(err => {
          this.$message.warning(err)
        })
    },
  },
  mounted() {
    this.focusInput()
  },
}
</script>

<style lang="less" scoped>
::v-deep .el-input__inner {
  border: none;
}
.inputClass1,
.inputClass2 {
  position: relative;
  flex: 1;
  ::v-deep input {
    height: 30px;
  }
}
.inputClass1::before {
  content: '用户名';
  position: absolute;
  font-weight: 600;
  font-size: 20px;
  left: 1%;
  top: -65%;
  font-size: 16px;
}
.inputClass2::before {
  content: '密码';
  position: absolute;
  font-weight: 600;
  font-size: 20px;
  left: 1%;
  top: -65%;
  font-size: 16px;
}
.inputClass1:focus {
  background-color: red;
}
.data {
  animation: around 5s ease infinite;
}
@keyframes around {
  50% {
  }
}
.avatar {
  transition: 0.3s ease;
}
.avatar:hover {
  & {
    transform: scale(1.2);
    transition: 0.3s ease;
  }
}
</style>
