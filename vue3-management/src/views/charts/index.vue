<template>
  <div id="charts-container" class="w-full h-full relative bg-transparent">
    <div
      class="sm:w-40px aspect-square w-12% absolute top-50px right-50px .dark:(bg-btn-bg-black hover:bg-black-hover) bg-btn-bg-light hover:bg-[rgba(0,0,0,0.18)] p-5px rounded-lg cursor-pointer transition-(all duration-350 ease)"
      @click="toggleFullScreen"
    >
      <div class="w-full h-full i-ic:outline-fullscreen"></div>
    </div>
    <!-- <div id="chart" class="w-80% h-80%"></div> -->
    <a-row class="h-200px">
      <a-col :sm="12" :lg="8">
        <div class="bg-red w-full h-full"></div>
      </a-col>
      <a-col :sm="12" :lg="8">
        <div class="bg-blue w-full h-full"></div>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import useChart from '@/hooks/useChart'
import { ref, nextTick } from 'vue'
let isFullScreen = ref(false)
// const { chartInstance, updateChart } = useChart('chart', {
//   tooltip: {},
//   xAxis: {
//     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//   },
//   yAxis: {},
//   series: [
//     {
//       name: '销量',
//       type: 'bar',
//       data: [5, 20, 36, 10, 10, 20]
//     }
//   ]
// })
function toggleFullScreen() {
  isFullScreen.value = !isFullScreen.value
  if (isFullScreen.value) {
    document.getElementById('charts-container')?.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>
<style lang="scss" scoped></style>
