<template>
  <div class="container">
    <div>{{props}}</div>
    <DiaryEditor v-if="this.isEditMode" v-bind:date="props"></DiaryEditor>
    <div v-else>
      <div v-if="this.hasDiary">has Diary</div>
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
      title: '',
      moodSelected: 'Very Good',
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
        for (const elem in snapshot.val()) {
          if (elem === date) {
            found = true
            break
          }
        }
        found ? this.hasDiary = true : this.hasDiary = false

        const dt = new Date()
        const today = new Date(dt.getTime() - (dt.getTimezoneOffset() * 60000)).toISOString().substring(0, 10)

        today === this.props ? this.isEditMode = true : this.isEditMode = false
      })
    },
    setIsEditMode () {
      this.isEditMode = !this.isEditMode
    }
  }
}
</script>

<style scoped>

</style>
