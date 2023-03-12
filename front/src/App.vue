<template>
  <div id="app">
    <VHeader></VHeader>
    <VTab></VTab>
    <router-view></router-view>
  </div>
</template>

<script>
import VTab from '@/components/VTab'
import VHeader from '@/components/VHeader'
export default {
  name: 'App',
  components: { VTab, VHeader },
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: Microsoft YaHei;
  color: #2c3e50;
  height: 100vh;
}
p {
  margin: 0;
}
ul {
  list-style: none;
}
</style>
