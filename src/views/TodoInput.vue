<template>
  <div class="inputContainer">
    <input id="inputBox" type="text" v-model="InputTodoItem" placeholder="Type what you have to do and Enter!"
           v-on:keyup.enter="addTodo">
  </div>
</template>

<script>
export default {
  data () {
    return {
      InputTodoItem: ''
    }
  },
  methods: {
    addTodo () {
      if (this.InputTodoItem !== '') {
        let value = this.InputTodoItem
        this.$emit('addTodo', value)
        this.clearInput()
      }
    },
    clearInput () {
      this.InputTodoItem = ''
    }
  }
}
</script>

<style scoped>
.inputContainer{
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  align-items: center;
}
#inputBox {
  font-size: 0.9rem;
  width: 80%;
  text-align: center;
  border-color: black;
}
</style>
