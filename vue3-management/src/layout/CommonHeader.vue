<template>
  <div class="w-full h-10% sm:h-100px fl vc bt" :class="isMobile ? 'px-20px' : 'pr-20px'">
    <div
      class="aspect-square h-50% .dark:(bg-btn-bg-black hover:bg-black-hover) bg-btn-bg-light hover:bg-[rgba(0,0,0,0.18)] p-5px rounded-lg cursor-pointer transition-(all duration-350 ease)"
      @click="handleCollapse"
    >
      <div
        :class="
          isMobile ? 'i-lucide:align-justify' : isCollapse ? 'i-lucide:indent-increase' : 'i-lucide:indent-decrease'
        "
        class="w-full h-full"
      ></div>
    </div>
    <div class="fl h-full justify-end vc">
      <div
        class="h-50% mr-20px aspect-square .dark:(bg-btn-bg-black hover:bg-black-hover) bg-btn-bg-light hover:bg-[rgba(0,0,0,0.18)] rounded-lg cursor-pointer transition-(all duration-350 ease)"
        @click="handleTranslate"
      >
        <img :src="userInfo.imgUrl" class="w-full h-full rounded-lg" />
      </div>
      <div
        v-schema
        class="h-50% aspect-square .dark:(bg-btn-bg-black hover:bg-black-hover) bg-btn-bg-light hover:bg-[rgba(0,0,0,0.18)] p-5px rounded-lg cursor-pointer transition-(all duration-350 ease)"
      >
        <div :class="isDark ? 'i-lucide:moon' : 'i-lucide:sun'" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAppStore from '@/store/modules/app'
import { computed, ref, watchEffect } from 'vue'
import { i18n } from '@/utils/translate'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
let routerKey = ref(0)
const userInfo = JSON.parse(sessionStorage.getItem('userInfo') as string)
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const isDark = computed(() => {
  return appStore.schema == 'dark'
})
const isCollapse = computed(() => {
  return appStore.isCollapse
})
const isMobile = computed(() => {
  return appStore.isMobile
})
async function handleTranslate() {
  const currentLang = i18n.language
  await i18n.changeLanguage(currentLang == 'zh' ? 'en' : 'zh')
  router.replace({ query: { ...route.query, x: routerKey.value } })
  message.info(`${currentLang == 'zh' ? 'Switched to English' : '已切换为中文'}`)
  routerKey.value++
}
function handleCollapse() {
  if (!isMobile.value) {
    appStore.changeCollapse()
    return
  }
  appStore.changeShowMenu()
}
</script>
<style lang="scss" scoped></style>
