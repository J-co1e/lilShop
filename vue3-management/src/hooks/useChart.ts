import { computed, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import useAppStore from '@/store/modules/app'
const appStore = useAppStore()
const isMobile = computed(() => {
  return appStore.isMobile
})
function handleResize() {
  appStore.isMobile = window.innerWidth < 768
  if (isMobile.value) {
    appStore.isCollapse = false
  }
}

export default function useChart(id: string, option: echarts.EChartsOption) {
  let chartInstance: echarts.ECharts | null = null
  const initChart = () => {
    if (chartInstance) return
    const attachNode = document.getElementById(id)
    chartInstance = echarts.init(attachNode)
    chartInstance.setOption(option)
  }
  const updateChart = (newOption: echarts.EChartsOption) => {
    if (!chartInstance) return
    chartInstance.setOption(newOption)
  }
  function resizeChart() {
    if (chartInstance) {
      chartInstance.resize()
    }
  }
  window.addEventListener('resize', resizeChart)
  window.addEventListener('resize', handleResize)
  onMounted(() => {
    initChart()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }
  })

  return { chartInstance, updateChart }
}
