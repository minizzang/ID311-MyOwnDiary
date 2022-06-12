<template>
  <div class="container">
    <div>{{props}}</div>
    <DiaryEditor v-if="this.isEditMode" v-bind:date="props"></DiaryEditor>
    <div v-else>
      <div v-if="this.hasDiary" class="diary-content">
        <div class="row-box">
          <h4>Title {{title}}</h4>
          <div>Mood {{mood}}</div>
        </div>
        <img
          :src="sketch"
          class="sketch"
        />
        <div class="comment">{{comment}}</div>
        <div v-if="this.isToday">
          <button
            @click="setIsEditMode"
          >다시 쓰기</button>
        </div>
      </div>
      <div v-else>
        No diary & not today -> 다이어리 쓸래요?
        <button
          @click="setIsEditMode"
        >다이어리 쓰기</button>
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
    setIsEditMode () {
      this.isEditMode = !this.isEditMode
    }
  }
}
</script>

<style scoped>
.diary-content{
  width: 100%;
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
  width: 45vw;
  height: 45vh;
  object-fit: contain;
  margin: 5px;
  box-shadow: 2px 2px 7px 0px rgba(201, 201, 201, 1);
}
.comment {
  height: 30%;
  background-color: aqua;
  margin: 5px;
}
</style>
