<template>
  <div>
      <h1 class="top"> Memo everything!</h1>
      <MemoList :memos="memos" :tags="tags" @removeMemo="removeMemo" @removeTag="removeTag" @downTag="downTag" @upTag="upTag"/>
      <MemoInput @addMemo="addMemo" />
  </div>
</template>

<script>
import MemoList from './MemoList.vue'
import MemoInput from './MemoInput.vue'

export default {
  components: {
    MemoList,
    MemoInput
  },
  data () {
    return {
      memos: [],
      tags: []
    }
  },
  methods: {
    addMemo (content, tag) {
      const memoCheck = this.memos.filter(el => el[0] === content)
      if ((memoCheck.length === 0) && (content !== '')) this.memos.push([content, tag])
      if (this.tags.indexOf(tag) === -1) this.tags.push(tag)
    },
    removeMemo (memos, content) {
      this.memos = this.memos.filter(el => el[0] !== content)
    },
    removeTag (memos, tags, index) {
      const removedTag = tags[index]
      this.tags.splice(index, 1)
      this.memos = this.memos.filter(el => el[1] !== removedTag)
    },
    downTag (tags, index) {
      const changeArrayOrder = function (list, targetIdx, moveValue) {
        if (list.length < 0) return list
        const newPosition = targetIdx + moveValue
        if (newPosition < 0 || newPosition >= list.length) return list
        const tempList = JSON.parse(JSON.stringify(list))
        const target = tempList.splice(targetIdx, 1)[0]
        tempList.splice(newPosition, 0, target)
        return tempList
      }
      this.tags = changeArrayOrder(tags, index, 1)
    },
    upTag (tags, index) {
      const changeArrayOrder = function (list, targetIdx, moveValue) {
        if (list.length < 0) return list
        const newPosition = targetIdx + moveValue
        if (newPosition < 0 || newPosition >= list.length) return list
        const tempList = JSON.parse(JSON.stringify(list))
        const target = tempList.splice(targetIdx, 1)[0]
        tempList.splice(newPosition, 0, target)
        return tempList
      }
      this.tags = changeArrayOrder(tags, index, -1)
    }

  }
}
</script>

<style scoped>
</style>
