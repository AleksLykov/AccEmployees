<template>
  <div class="search">
    <p>Search employee (name/surmane):</p>
    <input v-model="query" type="text" />
    <button @click="search(query)">SEARCH</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Search",
  computed: {
    ...mapGetters(["SEARCH_QUERY"]),
    query: {
      get() {
        return this.SEARCH_QUERY;
      },
      set(val) {
        this.SET_SEARCH_QUERY(val);
      }
    }
  },
  methods: {
    ...mapActions(["SEARCH_RESULT", "SET_SEARCH_QUERY"]),
    search(val) {
      this.$store.dispatch("SEARCH_RESULT", val);
    }
  }
}
</script>

<style lang="less" scoped>
.search{
  display: flex;
  width: 400px;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  p{
    margin: 0;
  }
  input{
    width: 65%;
    height: 1.8em;
    text-decoration: none;
    border: solid 1px #ddd;
    border-radius: .5em;
    outline: none;
    padding: 0.06em .5em;
    margin: 1em 0;
    font-weight: lighter;
    font-size: .8em;
  }
  button{
    width: 110px;
    font-weight: 700;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    margin: 2px 0 2px 5px;
    border: solid 1px #ddd;
    border-radius: .5em;
    padding: 0.5em 1em;
    outline: none;
    &:hover{
      background-color: #eee;
    }
    &:active{
      background-color: #ddd;
    }
  }
}
</style>