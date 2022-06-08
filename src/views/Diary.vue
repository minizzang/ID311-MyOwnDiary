<template>
  <div class="container">
    <b-container fluid>
      <!-- <b-row>
        <b-col>
          <h1 style="text-decoration: underline; text-underline-position:under;" class="top">✍️ How was your day?</h1>
        </b-col>

      </b-row>
      <br/> -->
      <b-row class="top3">
        <b-col cols="1" class="left2">
          <h4>Title: </h4>
        </b-col>
        <b-col cols="5">
          <b-form-input v-model="text" placeholder="Enter the Title"></b-form-input>
        </b-col>
        <b-col>
          <Mood/>
        </b-col>
      </b-row>
    </b-container>
    <br/>
    <Canvas class="canvas"/>
    <br/>
    <Textarea class="textarea" />
    <br/>
  </div>
</template>

<script>
import Mood from './DiaryMood.vue'
import Textarea from './DiaryTextarea'
import Canvas from './Canvas'

export default {
  components: {
    Mood,
    Textarea,
    Canvas
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
}
.textarea {
  margin-left: 5em;
  margin-right: 5em;
}
h2 {
  text-align: left;
}
.top {
  margin-top: 1em;
}
.top3 {
  margin-top: 3em;
}
.left2 {
  margin-left: 3em;
}
.canvas {
  width: 25em;
}
</style>
