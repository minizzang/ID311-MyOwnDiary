<template>
  <div id = "app">
    <Container />
  </div>
</template>

<script>
import Container from './components/layout/Container'

export default {
  name: 'App',
  components: { Container }
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
  /* font-family: 'Handlee', cursive;
  font-family: 'Gaegu', cursive; */
  font-family: 'EarlyFontDiary';
  }
@font-face {
  font-family: 'EarlyFontDiary';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_220508@1.0/EarlyFontDiary.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-size: small;
}
</style>
