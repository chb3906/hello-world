<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route'(to, from) { //监听路由是否变化
      console.log(to)
      console.log(from)
      if (to.path == from.path && JSON.stringify(to.query) != JSON.stringify(from.query)) {
        window.location.reload()
      }
    }
  },
}
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
