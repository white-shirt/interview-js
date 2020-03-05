<template>
  <div id="app">
    <router-link :to='{ name: "world", params: { username: "zk_world" } }'>world</router-link>
    <router-link :to='{ name: "hello", params: { username: "zk_hello" } }'>hello</router-link>
    <router-view></router-view>
    <router-view name='left' style='float:left;width:50%;background-color:#ccc;height:300px;'></router-view>
    <router-view name='right' style='float:right;width:50%;background-color:yellowgreen;height:300px;'></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body {
  width: 100%;
  height: 100%;
}
</style>
