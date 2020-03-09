<template>
  <div id="app">
    <h1>The best company in the world :)</h1>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/categories">Categories</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("GET_EMPLOYEES");
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: .5em;

  a {
    font-weight: bold;
    color: #444;

    &:hover { color: #777; }

    &.router-link-exact-active {
      color: #999;
    }
  }
}
</style>
