<template>
  <div class="w-full h-full flc vc">
    <div class="text-[#000] fw-bold fs-20 w-200px h-150px rounded-2xl bg-(img-map-map5-jpg cover no-repeat)">test</div>
    <div class="w-200px h-180px bg-[#fff]">
      <img src="@/assets/map/map5.jpg" class="object-fill w-full h-full" />
    </div>
    <div class="i-logos-vue text-3xl"></div>
    <div class="complex-node">
      <h1>Test</h1>
    </div>
    <div class="w-100 h-50 bg-red sm:hidden">another test</div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import useAppStore from '@/store/modules/app'
const appStore = useAppStore()
let currentSchema = computed(() => appStore.schema)
</script>
<style lang="scss">
.complex-node {
  @apply flc vc w-100 h-50 bg-(emerald opacity-50) border-(2px dashed blue) p-10px hv text-red shadow-[0px_0px_10px_0px_rgba(0,0,0,1)];
}
</style>
