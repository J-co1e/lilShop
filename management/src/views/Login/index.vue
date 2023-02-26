<template>
	<div class="login">
		<img src="@/assets/wave.png" class="wave">
		<div class="container">
			<div class="img">
				<img src="@/assets/data.svg" alt="" class="data">
			</div>
			<div class="login-content">
				<div class="form">
					<img src="@/assets/avatar.svg" alt="" class="avatar">
					<h2 class="title"></h2>
					<div class="input-div one">
						<div class="i">
							<i class="fas fa-user"></i>
						</div>
						<div class="inputClass1">
							<el-input placeholder="" v-model.trim="form.username" ref="nameInput"></el-input>
						</div>
					</div>
					<div class="input-div pass">
						<div class="i">
							<i class="fas fa-lock"></i>
						</div>
						<div class="inputClass2">
							<el-input placeholder="" type="password" v-model.trim="form.password" show-password @keyup.enter.native="login"></el-input>
						</div>
					</div>
					<input type="submit" class="btn" value="登录" @click="login">
				</div>
			</div>
		</div>
	</div>
</template>

<script src="https://kit.fontawesome.com/a81368914c.js"></script>
<script src="./main.js"></script>
<script>
import './style.css'
import { handleLogin } from '@/api'
export default {
	data () {
		return {
			form: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		focusInput () {
			this.$refs.nameInput.focus()
		},
		login () {
			if (this.form.username === '') return this.$message.warning('请输入用户名')
			if (this.form.password === '') return this.$message.warning('请输入密码')
			handleLogin(this.form).then(({ data: res }) => {
				if (res.code === '9999') {
					this.$message.warning('用户名或密码错误，请重新输入')
				} else {
					this.$message.success('登录成功')
					this.$store.commit('clearMenu')
					this.$store.commit('setMenu',res.routes)
					sessionStorage.setItem('token', res.token)
					this.$router.push({ path: '/home' })
				}
			})
		}
	},
	mounted () {
		this.focusInput()
	}
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