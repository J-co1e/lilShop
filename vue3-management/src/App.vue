<template>
  <a-config-provider
    :theme="{
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { computed, ref } from 'vue'
import useAppStore from './store/modules/app'
const appStore = useAppStore()
const isDark = computed(() => appStore.schema == 'dark')
</script>

<style scoped>
.a {
  color: rgb(97, 97, 250);
}
#app {
  width: 100vw;
  height: 100vh;
}
</style>
