<template>
  <div class="fl w-screen h-screen">
    <CommonSidebar class="sm:flex" :class="getSidebarClass" />
    <Transition>
      <div
        v-show="isMobile && isShowMenu"
        class="mask fixed w-screen h-screen .dark:bg-dark-mask bg-light-mask z-2"
        @click="appStore.changeShowMenu"
      ></div>
    </Transition>
    <div class="flex-1 flc h-full">
      <CommonHeader />
      <div class="flex-1 bg-[rgb(238,243,245)] rounded-[10px_10px_0_0] p-5 .dark:bg-#33333350">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CommonHeader from '@/layout/CommonHeader.vue'
import CommonSidebar from '@/layout/CommonSidebar.vue'
import useAppStore from '@/store/modules/app'
import { computed, onMounted } from 'vue'
const appStore = useAppStore()
const isMobile = computed(() => {
  return appStore.isMobile
})
const isShowMenu = computed(() => appStore.isShowMenu)
const isCollapse = computed(() => appStore.isCollapse)
const getSidebarClass = computed(() => {
  if (!isMobile.value) {
    return isCollapse.value ? 'w-100px hidden' : 'w-300px hidden'
  } else {
    return isShowMenu.value ? 'fixed left-0 h-full z-3 w-65%' : 'fixed left-[-100%] h-full z-3 w-65%'
  }
})
function handleResize() {
  appStore.isMobile = window.innerWidth < 768
  if (isMobile.value) {
    appStore.isCollapse = false
  }
}
window.addEventListener('resize', handleResize)
</script>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.a {
  color: #66666684;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
