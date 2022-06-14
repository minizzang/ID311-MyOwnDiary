<template>
  <span @click="clearTodo" id="clearAllSpan">
    <div class="clearAllContainer">
      <p class="clearAllBtn">Clear All</p>
    </div>
  </span>
</template>

<script>
export default{
  methods: {
    clearTodo () {
      this.$emit('removeAll')
    }
  }
}
</script>

<style>
.clearAllContainer{
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: #6f42c1;
  border-radius: 5px;
  margin: 0 auto;
}
#clearAllSpan{
  display: inline-block;
}
.clearAllBtn{
  color: white;
  cursor: pointer;
}
</style>
