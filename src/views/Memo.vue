<template>
  <div id="memoApp">
      <h2 class="top">Memo Board</h2>
      <div id="memoBoard">
        <MemoList :memos="memos" @removeMemo="removeMemo" @saveMemo="saveMemo"/>
      </div>
      <MemoInput @addMemo="addMemo" />
  </div>
</template>

<script>
import MemoList from './MemoList.vue'
import MemoInput from './MemoInput.vue'
import {onValue, push, ref, remove, update} from '@firebase/database'

export default {
  name: 'memoApp',
  components: {
    MemoList,
    MemoInput
  },
  data () {
    return {
      uid: '',
      memos: []
    }
  },
  mounted () {
    this.uid = localStorage.getItem('user')

    // get memos from firebase db
    const memoRef = ref(this.$db, 'memo/' + this.uid)
    onValue(memoRef, (snapshot) => {
      this.memos = []
      const memoData = snapshot.val()
      if (memoData != null) {
        this.memos = []
        Object.keys(memoData).forEach((key) => {
          this.memos.push({
            id: key,
            value: memoData[key].value
          })
        })
      }
    })
  },
  methods: {
    // store memo to db
    addMemo () {
      push(ref(this.$db, 'memo/' + this.uid), {
        value: ''
      }).catch((err) => console.log(err))
    },
    // delete memo from db
    removeMemo (elem) {
      remove(ref(this.$db, 'memo/' + this.uid + '/' + elem.id))
    },
    saveMemo (elem) {
      update(ref(this.$db, 'memo/' + this.uid + '/' + elem.id), {
        value: elem.value
      }).catch((err) => console.log(err))
    }
  }
}
</script>

<style scoped>
#memoBoard {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#memoContainer {
  border: 1px solid black;
}
.btn {
  border: 1px solid black;
  border-radius: 1vh;
  padding-left: 1.2vh;
  padding-right: 1.2vh;
}
.top {
  padding-top: 3vh;
}
</style>
