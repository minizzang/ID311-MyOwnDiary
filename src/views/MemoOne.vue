/* eslint-disable */

<template>
<div class="container">
  <div class="button-container top">
    <input v-model="message">
    <button @click="add">add memo</button>
  </div>
  <div class="memo-container">
    <component v-for="(item, index) in buttons" :is="item" :key="index"></component>
  </div>
</div>
</template>

<script>
import Vue from 'vue'

Vue.component('my-button', {
  template: '<div class="memo"> memo {{message}} </div>',
  data: function () {
    return {
    }
  },
  methods: {
  }
})

export default {
  data: function () {
    return {
      buttons: [],
      message: ''
    }
  },
  methods: {
    input (e) {
      this.inputText = e.target.value
    },
    add () {
      this.buttons.push('my-button')
    },
    remove () {
      this.buttons.pop()
    }
  }
}
</script>

<style scoped>
.memo {
    border-style: solid;
    border-color: black;
    margin: 1em;
    width: 10em;
    height: 10em;
}
.button-container {
    position: absolute;
    /* display: flex;
    justify-content: flex-end; */
}
.memo-container {
    overflow: scroll;
    height:82%;
    padding-top: 3em;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
.container {
    height: 90vh
}
.top {
    margin-top: 1em;
}
</style>
