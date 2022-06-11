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
          <b-form-input v-model="title" placeholder="Enter the Title"></b-form-input>
        </b-col>
        <b-col>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="btn-radios-1"
              v-model="moodSelected"
              :options="moodOptions"
              :aria-describedby="ariaDescribedby"
              button-variant="outline-primary"
              name="plain-inline"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    <br/>
    <Canvas class="canvas" ref="canvas" @imageRef="saveDiary"></Canvas>
    <br/>
    <div class="textarea">
      <b-form-textarea
        id="textarea"
        v-model="comment"
        placeholder="Please describe your day..."
        size="lg"
        rows="6"
        max-rows="6"
      ></b-form-textarea>
      <br/>
      <div style="float: right;">
        <button class="top" @click="callCanvas">Save</button>
      </div>
    </div>
    <br/>
  </div>
</template>

<script>
import { ref, set } from '@firebase/database'
import Canvas from './Canvas'

export default {
  components: {
    Canvas
  },
  props: {
    date: {
      type: String
    }
  },
  data () {
    return {
      title: '',
      moodSelected: 'Very Good',
      moodOptions: [
        { text: ' Best ', value: 'Very Good' },
        { text: ' Nice', value: 'second' },
        { text: ' OK', value: 'Just OK' },
        { text: ' Bad', value: 'Bad' }
      ],
      comment: ''
    }
  },
  mounted () {
  },
  methods: {
    callCanvas () {
      const date = this.date.replace(/-/g, '') // 2022-06-11 -> 20220611
      this.$refs.canvas.downloadImage(date)
    },
    saveDiary (imageRef) {
      const uid = localStorage.getItem('user')
      const date = this.date.replace(/-/g, '')
      set(ref(this.$db, 'diary/' + uid + '/' + date), {
        title: this.title,
        mood: this.moodSelected, // todo: mood 숫자로 저장하기
        image: imageRef,
        comment: this.comment
      })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  margin-top: 1em;
}
.left2 {
  margin-left: 1em;
}
.canvas {
  width: 90%;
  height: 60%;
}
.saveButton {
  float: right;
}
</style>
