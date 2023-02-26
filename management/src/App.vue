/* eslint-disable */
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Main from "./views/Main/Main";
export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
