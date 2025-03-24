<!-- eslint-disable vue/attributes-order -->
<template>
  <div class="w-full h-full bg-blueGray">
    Edit
    <a-button type="primary" @click="change">Primary Button</a-button>
    <div class="w-300px h-100px border-(2 solid #000) fl relative overflow-hidden">
      <div class="w-300px h-100px" v-for="i in 5" :key="i">
        <img :src="imgMapper(i)" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import map1 from '@/assets/map/map1.jpg'
import map2 from '@/assets/map/map2.jpg'
import map3 from '@/assets/map/map3.jpg'
import map4 from '@/assets/map/map4.jpg'
import map5 from '@/assets/map/map5.jpg'
function imgMapper(i: number) {
  return {
    1: map1,
    2: map2,
    3: map3,
    4: map4,
    5: map5
  }[i]
}
const initArr = ref(Array.from({ length: 10 }, (v, i) => i + 1))
async function change() {
  const random = ~~(Math.random() * 10)
  console.log(random)
}
</script>
<style lang="less" scoped></style>
