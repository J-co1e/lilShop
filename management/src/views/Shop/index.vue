<template>
  <div class="shop">123321</div>
</template>

<script>
import { getStoreInfo, updateStoreInfo } from '@/api/shop'
export default {
  data() {
    return {
      obj: {},
    }
  },
  methods: {
    getInfo() {
      getStoreInfo().then(({ data: res }) => {
        console.log(res.data)
      })
    },
  },
  mounted() {
    this.getInfo()
  },
}
</script>

<style></style>
