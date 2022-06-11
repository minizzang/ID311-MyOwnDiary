<template>
  <div id="todoinput">
    <input type="text" v-model="tag"/>
    <input type="text" v-model="content"/>
    <button type="button" @click="addMemo">ADD</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tag: '',
      content: ''
    }
  },
  methods: {
    addMemo () {
      this.$emit('addMemo', this.content, this.tag)
      this.content = ''
      this.tag = ''
    }
  }
}
</script>

<style></style>
