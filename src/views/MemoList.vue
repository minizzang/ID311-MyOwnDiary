<template>
  <div id="memoList">
    <div class="memoEach" v-for="(elem) in memos" :key="elem.id">
      <textarea class="shadow memoText" v-model="elem.value" @input="inputMemo(elem, $event)"></textarea>
      <div>
        <button type="button" class="memoButton" @click="removeMemo(elem)"><strong>x</strong></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    memos: []
  },
  methods: {
    removeMemo (elem) {
      this.$emit('removeMemo', elem)
    },
    inputMemo (elem, event) { // used input event for Korean IME problem
      elem.value = event.target.value
      this.$emit('saveMemo', elem)
    }
  }
}
</script>

<style scoped>
#memoList {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: scroll;
  width: 90%;
  height: 60vh;
  padding: 1em;
  padding-left: 3em;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  background-color: #C3B1E1;
}
.memoEach {
  display: flex;
  align-content: flex-start;
  padding: 0.5em;
}
.memoText {
  width: 20vh;
  height: 20vh;
  padding: 0.5em;
  border-radius: 10px;
  margin-right: 0.5em;
  overflow: scroll;
  background-color: whitesmoke;
}
.memoButton {
  height: 20px;
  width: 20px;
  margin-bottom: 1vh;
  border-radius: 100%;
  color: white;
  text-align: center;
  line-height: 1em;
}
</style>
