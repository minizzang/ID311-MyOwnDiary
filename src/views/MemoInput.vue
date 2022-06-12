<template>
  <div id="memoinput">
    <button type="button" class="addButton shadow" @click="addMemo"> + </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    addMemo () {
      this.$emit('addMemo')
    }
  }
}
</script>

<style scoped>
#memoinput {
    display: flex;
    flex-direction: row;
    justify-content: right;
}
.addButton {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 5vh;
    background-color: plum;
    color: white;
    font-size: 30px;
}
</style>
