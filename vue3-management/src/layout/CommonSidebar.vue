<template>
  <div class="flc vc transition-(left duration-500 ease) p-0 sm:p-2">
    <div class="w-full h-90px py-20px fl hv bg-white .dark:bg-[rgb(5,20,32)]">
      <div class="i-lucide:annoyed w-50px h-50px bg-#333 .dark:bg-[#e7e7e7]"></div>
    </div>
    <a-menu
      style="width: 100%"
      mode="inline"
      :inline-collapsed="isCollapse"
      :theme="theme"
      class="flex-1 .dark:bg-[rgb(5,20,32)]"
    >
      <SubMenuItem :data="allRoutes" />
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import SubMenuItem from '@/components/SubMenuItem.vue'
import useAppStore from '@/store/modules/app'
import type { MenuTheme } from 'ant-design-vue'
const appStore = useAppStore()
const allRoutes = computed(() => appStore.routes)
const isDark = computed(() => {
  return appStore.schema == 'dark'
})
const isCollapse = computed(() => {
  return appStore.isCollapse
})
const theme = ref<MenuTheme>('dark')
watchEffect(() => {
  theme.value = isDark.value ? 'dark' : 'light'
})
</script>
<style lang="scss" scoped></style>
