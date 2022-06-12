<template>
  <div id="memoApp">
      <h2 class="top">Memo Board</h2>
      <div id="memoBoard">
        <MemoList :memos="memos" :memoContents="memoContents" @removeMemo="removeMemo"/>
      </div>
      <MemoInput @addMemo="addMemo" />
  </div>
</template>

<script>
import MemoList from './MemoList.vue'
import MemoInput from './MemoInput.vue'

export default {
  name: 'memoApp',
  components: {
    MemoList,
    MemoInput
  },
  data () {
    // all the memo data is in the `memoContents`, not `memos`
    return {
      memos: [],
      tags: [],
      memoContents: [],
      numMemos: 0
    }
  },
  methods: {
    addMemo () {
      this.memos.push({id: this.numMemos, value: ''})
      this.memoContents.push({id: this.numMemos, value: ''})
      // console.log(this.memos)
      // console.log(this.memoContents)
      this.numMemos++
    },
    removeMemo (memos, memoContents, number) {
      this.memoContents = memoContents
      // console.log(memoContents)
      for (let i = memos.length; i >= 0; i--) {
        if (this.memos[i] === number) {
          this.memoContents.splice(i, 1)
        }
      }
      this.memos = this.memos.filter(el => el !== number)
      console.log(this.memos)
      console.log(this.memoContents)
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
