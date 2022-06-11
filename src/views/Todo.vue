<template>
  <div>
    <h1>Todo List</h1>
    <TodoInput v-on:addTodo="addTodo"/>
    <TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo"/>
    <TodoFooter v-on:removeAll="clearAll"/>
  </div>
</template>

<script>
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
export default {
  data () {
    return {
      todoItems: []
    }
  },
  components: {
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  },
  methods: {
    created () {
      // firebase 연동
      this.todoItems = []
    },
    addTodo (todoItem) {
      if (this.todoItems.length >= 10) {
        alert('Too Many Todo Items! (Max: 10)')
      } else {
        this.todoItems.push(todoItem)
        console.log(this.todoItems.length)
      }
    },
    removeTodo (todoItem, index) {
      // firebase 연동 부분
      this.todoItems.splice(index, 1)
    },
    clearAll () {
      // firebase 연동 부분
      this.todoItems = []
    }
  }
}
</script>
