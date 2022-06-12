<template>
  <div id="memoApp">
      <h2 class="top"> Memo everything!</h2>
      <MemoList :memos="memos" :tags="tags" @removeMemo="removeMemo"/>
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
    return {
      memos: [],
      tags: [],
      numMemos: 0
    }
  },
  methods: {
    addMemo () {
      this.memos.push(this.numMemos)
      this.numMemos++
    },
    removeMemo (memos, number) {
      this.memos = this.memos.filter(el => el !== number)
    }
  }
}
</script>

<style scoped>
#memoContainer {
  border: 1px solid black;
}
.btn {
  border: 1px solid black;
  border-radius: 1vh;
  padding-left: 1.2vh;
  padding-right: 1.2vh;
}
</style>
