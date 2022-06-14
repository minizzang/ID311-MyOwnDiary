<template>
  <div class="inputContainer">
    <input id="inputBox" type="text" v-model="InputTodoItem" placeholder="Pick the date and type!"
           v-on:keyup.enter="addTodo" autocomplete="off">
    <button class="addButton" @click="addTodo">+</button>
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
  width: 70%;
  text-align: center;
  border: solid 1px black;
}
.addButton {
  width: 5%;
  background-color: #6f42c1;
  color: white;
  font-size: 18px;
  border-radius: 5px;
}
</style>
