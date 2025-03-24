<template>
  <div class="w-full h-full">
    Manage
    <TestT :msg="'this is from father'" v-model="isShow" />
    {{ isShow }}
  </div>
</template>
<script setup lang="ts">
import TestT from './components/TestT.vue'
import { ref, type Ref } from 'vue'
const isShow: Ref<boolean> = ref(true)
</script>
<style lang="less" scoped></style>
