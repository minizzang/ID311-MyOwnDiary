<template>
  <div>
    <b-container fluid>
      <!-- <b-row>
        <b-col>
          <h1 style="text-decoration: underline; text-underline-position:under;" class="top">✍️ How was your day?</h1>
        </b-col>

      </b-row>
      <br/> -->
      <b-row class="top3">
        <b-col cols="1" class="left2">
          <h3>Title: </h3>
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
    <UplodedImage class="uploadedImage"/>

    <br/>
    <Textarea class="textarea" />
    <br/>

  </div>
</template>

<script>
import Mood from './DiaryMood.vue'
import Textarea from './DiaryTextarea'
import UplodedImage from './DiaryImage'

export default {
  components: {
    Mood,
    Textarea,
    UplodedImage
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style>
* {
  font-family: 'Handlee', cursive;
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
.uploadedImage {
  width: 25em;
}
</style>
