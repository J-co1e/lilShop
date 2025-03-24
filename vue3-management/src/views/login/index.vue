<template>
  <div class="h-screen w-screen flc hv">
    <div
      v-schema
      class="fixed top-3% right-3% cursor-pointer w-30px h-30px"
      :class="isDark ? 'i-lucide:moon' : 'i-lucide:sun'"
    >
      change
    </div>
    <div
      class="w-90% h-50% sm:w-120 sm:h-100 .dark:bg-black-bg .dark:shadow-[0px_0px_10px_3px_rgba(255,255,255,.2)] bg-[#fff] py-20px px-40px shadow-[0px_0px_10px_3px_rgba(0,0,0,.1)] rounded-sm flc hv"
    >
      <h1>登录</h1>
      <a-input
        v-model:value="form.username"
        placeholder="用户名"
        allow-clear
        class="py-8px px-10px w-100% mb-20px mt-40px"
        ref="inputRef"
      >
        <template #prefix>
          <user-outlined />
        </template>
      </a-input>
      <a-input-password
        v-model:value="form.password"
        placeholder="密码"
        allow-clear
        class="py-8px px-10px w-100%"
        @keyup.enter="handleLogin"
      >
        <template #prefix>
          <lock-outlined />
        </template>
      </a-input-password>
      <a-button type="primary" class="w-100% h-40px mt-80px" :loading="loading" @click="handleLogin">登录</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, Ref, ref } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message, notification } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
import { UserLoginParams } from '@/api/model/userModel'
import { searchUsers } from '@/api/user'
const inputRef: Ref<HTMLInputElement | null> = ref(null)
onMounted(() => {
  inputRef.value?.focus()
})
const appStore = useAppStore()
const userStore = useUserStore()
const isDark = computed(() => {
  return appStore.schema == 'dark'
})
const loading: Ref<boolean> = ref(false)
const router = useRouter()
const form = reactive<UserLoginParams>({
  username: '',
  password: ''
})
async function handleLogin() {
  if (form.username && form.password) {
    loading.value = true
    userStore
      .Login({
        username: form.username,
        password: form.password
      })
      .then((res) => {
        const { roles, id } = res as { roles: string[]; id: string | number }
        const identity = roles as string[]
        appStore.setIdentityRoutes(identity)
        searchUsers({ id }).then(({ data: res }) => {
          sessionStorage.setItem('userInfo', JSON.stringify(res.data[0]))
          sessionStorage.setItem('isAdmin', '' + res.data[0].status)
          loading.value = false
          notification.open({
            message: '登录成功',
            description: `欢迎，${form.username}`
          })
          router.push({ path: '/home' })
        })
      })
      .catch((err) => {
        loading.value = false
        message.error(err)
      })
  } else {
    loading.value = false
    message.error('请输入用户名和密码')
  }
}
</script>
<style lang="scss"></style>
