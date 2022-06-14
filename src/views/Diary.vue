<template>
  <div>
    <h2 class="top">{{props}}</h2>
    <DiaryEditor v-if="this.isEditMode" v-bind:date="props"></DiaryEditor>
    <div v-else class="diaryBox">
      <div v-if="this.hasDiary" class="diary-content">
        <div class="row-box">
          <h3>{{title}}</h3>
          <h3 class="moodText">{{mood}}</h3>
        </div>
        <img
          :src="sketch"
          class="sketch"
        />
        <div class="comment"> {{comment}}</div>
        <div>
          <button
            @click="setIsEditMode"
            class="writeButton shadow rightBottom"
          >Edit</button>
        </div>
      </div>
      <div v-else>
        <div v-if="this.checkIsFuture() === false">
          <br/>
          *** There's no diary yet. Record your past memories! ***
          <br/>
          <br/>
          <button
            @click="setIsEditMode"
            class="writeButton shadow"
          > Click to Write </button>
        </div>
        <div v-else>
          <br/>
          *** You can't write future diary ***
          <br/>
          <br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onValue, ref } from '@firebase/database'
import DiaryEditor from './DiaryEditor.vue'

export default {
  components: {
    DiaryEditor
  },
  props: ['props'],
  watch: {
    props () {
      // whenever props(checked date) changes, check diary
      this.checkHasDiary()
    }
  },
  data () {
    return {
      isEditMode: true,
      hasDiary: false,
      isToday: true,
      title: '',
      mood: '',
      sketch: '',
      comment: ''
    }
  },
  mounted () {
    // first check diary
    this.checkHasDiary()
  },
  methods: {
    checkHasDiary () {
      const uid = localStorage.getItem('user')
      const userDiaryRef = ref(this.$db, 'diary/' + uid)

      onValue(userDiaryRef, (snapshot) => {
        const date = this.props.replace(/-/g, '')

        let found = false
        let contents = null
        for (const elem in snapshot.val()) {
          if (elem === date) {
            found = true
            contents = snapshot.val()[elem]
            break
          }
        }
        found ? this.hasDiary = true : this.hasDiary = false
        if (contents) {
          this.title = contents['title']
          this.mood = contents['mood']
          this.sketch = contents['image']
          this.comment = contents['comment']
        }

        const dt = new Date()
        const today = new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)
        today === this.props ? this.isToday = true : this.isToday = false
        if (!this.hasDiary && this.isToday) {
          this.isEditMode = true
        } else {
          this.isEditMode = false
        }
      })
    },
    checkIsFuture () {
      const dt = new Date()
      const today = new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)
      if (today >= this.props) return false
      else if (today < this.props) return true
    },
    setIsEditMode () {
      this.isEditMode = !this.isEditMode
    }
  }
}
</script>

<style scoped>
.rightBottom {
  position: absolute;
  bottom: 2vh;
  right: 11vw;
}
.moodText {
  color: #C3B1E1;
}
.diaryBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.writeButton {
  border-radius: 5px;
  border: 2px solid grey;
  margin-bottom: 0.5em;
  padding: 0.5em;
}
.diary-content{
  justify-content: center;
  align-content: center;
  width: 90%;
  height: 100%;
  padding: 1em;
}
.row-box {
  display: flex;
  flex-direction: row;
  border-bottom: dashed 2px;
  justify-content: space-between;
}
.sketch{
  width: 42vw;
  height: 40vh;
  object-fit: contain;
  margin: 5px;
  box-shadow: 2px 2px 7px 0px rgba(201, 201, 201, 1);
}
.comment {
  display: flex;
  flex-direction: row;
  word-break: break-all;
  overflow-y: scroll;
  margin-top: 1vh;
  margin-bottom: 1vh;
  padding: 1vh;
  height: 11vh;
  width: 100%;
  box-shadow: 2px 2px 7px 0px rgba(201, 201, 201, 1);
  /* border: 1px solid black; */
  border-radius: 5px;
  text-align: left;
  justify-content: space-between;
  align-content: center;
}
.top {
  padding-top: 3vh;
}
.comment::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: #ffffff;
}
.comment::-webkit-scrollbar-thumb {
  border-radius: 3.5px;
  background-color: #C3B1E1;
}
.comment::hover {
  background-color: #adb5bd;
}

.comment::-webkit-scrollbar-track {
    background: #ffffff;
}

</style>
