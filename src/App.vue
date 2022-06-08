<template>
  <div id="app">
    <Container />
  </div>
</template>

<script>
import Container from './components/layout/Container'

export default {
  name: 'App',
  components: { Container },
  mounted () {
    console.log(this.$firebase)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  font-family: 'Handlee', cursive;
  }
</style>
