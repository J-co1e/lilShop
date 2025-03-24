<template>
  <div class="h-full w-full">
    home
    <h2>{{ t('LbkpnTCx' /* 测试文本 */) }}</h2>
    <div class="bg-img-test-circle-png w-10px h10"></div>
  </div>
</template>

<script setup>
import { t } from '@/utils/translate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const inputVal = ref('')
const router = useRouter()
</script>

<style lang="scss" scoped></style>
