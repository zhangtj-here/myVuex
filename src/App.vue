<template>
  <div id="app">
    <p>state: {{this.$store.state.num}}</p>
    <p>getter: {{this.$store.getter.getNum}}</p>
    <button @click="add">+1</button>
    <button @click="asyncAdd">await +2</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    add() {
      this.$store.commit('add', 1);
    },
    asyncAdd() {
      this.$store.dispatch('asyncAdd', 2);
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
  margin-top: 60px;
}
</style>
