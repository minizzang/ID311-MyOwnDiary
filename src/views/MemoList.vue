<template>
  <div id="memoList">
    <div id="memoTag" v-for="(tag, index) in tags" v-if="tag != ''" :key="tag.id" class="shadow">
        <strong class="tagEach">
            #{{tag}} :
        </strong>
        <div class="memoEach" v-for="([content, thistag]) in memos" v-if="(thistag == tag)" :key="content.id">
            {{ content }}
            <button type="button" @click="removeMemo(memos, content)">❌</button>
        </div>
        <button type="button" id="tagBtn" @click="upTag(tags, index)">⬆️</button>
        <button type="button" id="tagBtn" @click="downTag(tags, index)">⬇️</button>
        <button type="button" id="tagBtn" @click="removeTag(memos, tags, index)">🗑</button>
    </div>
    <div id="memoTag" v-for="(tag) in tags" v-if="tag == ''" :key="tag.id" class="shadow">
        <div class="memoEach" v-for="([content, thistag]) in memos" v-if="(thistag == tag)" :key="content.id">
            {{ content }}
            <button type="button" @click="removeMemo(memos, content)">❌</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    memos: [],
    tags: []
  },
  methods: {
    removeMemo (memos, index) {
      this.$emit('removeMemo', memos, index)
    },
    removeTag (memos, tags, index) {
      this.$emit('removeTag', memos, tags, index)
    },
    downTag (tags, index) {
      this.$emit('downTag', tags, index)
    },
    upTag (tags, index) {
      this.$emit('upTag', tags, index)
    }
  }
}
</script>

<style scoped>
#tagBtn {
    margin-left: 1em;
}
#memoList {
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: scroll;
  height: 65vh;
  padding: 1em
}
#memoTag {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: scroll;
  margin-left: 0.5em;
  margin-top: 0.5em;
  padding: 0.5em;
  border-radius: 10px;
}
.memoEach {
 border: 1px solid black;
 width: auto;
 height: auto;
 padding: 0.5em;
 border-radius: 10px;
 margin-right: 0.5em;
}
.tagEach {
 width: auto;
 height: auto;
 padding: 0.5em;
 border-radius: 10px;
 margin-right: 0.5em;
}
</style>
