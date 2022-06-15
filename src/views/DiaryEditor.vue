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
          <!-- <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="btn-radios-1"
              v-model="moodSelected"
              :options="moodOptions"
              :aria-describedby="ariaDescribedby"
              button-variant="outline-primary"
              name="plain-inline"
              buttons
            ></b-form-radio-group>
          </b-form-group> -->
          <div class="moodRadio">
            <figure>
              <input type="radio" id="happy" name="mood" class="hidden" v-bind:value="Happy" v-model="moodSelected"/>
              <label for="happy" class="mood">
                <img class="moodImg" src="../assets/mood/happy.png" width="30px" alt="" />
              </label>
            </figure>
            <figure>
              <input type="radio" id="soso" name="mood" class="hidden" v-bind:value="Soso" v-model="moodSelected"/>
              <label for="soso" class="mood">
                <img class="moodImg" src="../assets/mood/soso.png" width="30px" alt="" />
              </label>
            </figure>
            <figure>
              <input type="radio" id="sad" name="mood" class="hidden" v-bind:value="Sad" v-model="moodSelected"/>
              <label for="sad" class="mood">
                <img class="moodImg" src="../assets/mood/sad.png" width="30px" alt="" />
              </label>
            </figure>
            <figure>
              <input type="radio" id="angry" name="mood" class="hidden" v-bind:value="Angry" v-model="moodSelected"/>
              <label for="angry" class="mood">
                <img class="moodImg" src="../assets/mood/angry.png" width="30px" alt="" />
              </label>
            </figure>
            <figure>
              <input type="radio" id="tired" name="mood" class="hidden" v-bind:value="Tired" v-model="moodSelected"/>
              <label for="tired" class="mood">
                <img class="moodImg" src="../assets/mood/tired.png" width="30px" alt="" />
              </label>
            </figure>
            <div class="moodSelected">{{moodSelected}}</div>
          </div>
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
        <button class="top saveButton shadow" @click="callCanvas">Save</button>
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
      moodSelected: '',
      comment: '',
      Happy: 'What a happy day!',
      Soso: 'So-so.',
      Sad: 'Want to cry TT',
      Angry: 'Really upset!',
      Tired: 'Eww.. Tired..'
    }
  },
  mounted () {
  },
  methods: {
    callCanvas () {
      const date = this.date.replace(/-/g, '') // 2022-06-11 -> 20220611
      this.$refs.canvas.saveImageToStorage(date)
    },
    saveDiary (imageRef) {
      if (!this.title || !this.moodSelected) {
        alert('Enter the title and select your mood')
      } else {
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
}
</script>

<style scoped>
.moodRadio input[type="radio"]:checked + label .moodImg {
  width: 40px;
}
.moodImg:hover {
  width: 35px;
}
.hidden {
  position: absolute;
  left: -9999px;
}
.mood {
  margin-right: 1vh;
  width: 35px;
}
.moodRadio {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  height: 40px;
}
.container {
  display: flex;
  flex-direction: column;
  height: 90%;
  padding-top: 0;
  /* align-items: center;
  justify-content: center; */
}
.textarea {
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
  margin-left: 3em;
  margin-right: 20%;
  z-index: 5000;
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
  position: absolute;
  right: 13%;
  bottom: 5%;
  width: 10vh;
  height: 10vh;
  border-radius: 100%;
  margin-left: 5vh;
  background-color: #C3B1E1;
  color: white;
  font-size: 3vh;
}
.moodSelected {
  margin-left: 1vh;
  color: #C3B1E1;
}
</style>
