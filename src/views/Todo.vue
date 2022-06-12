<template>
  <div>
    <h2 class="top">Todo List</h2>
    <TodoInput v-on:addTodo="addTodo"/>
    <br/>
    <TodoList v-bind:propsdata="todoItemsWithDate" @removeTodo="removeTodo" @checkTodo="checkTodo"/>
    <TodoFooter v-on:removeAll="clearAll"/>
  </div>
</template>

<script>
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
export default {
  props: ['props'],
  data () {
    return {
      todoItemsWithDate: [],
      temp: 1
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
      this.todoItemsWithDate = []
    },
    addTodo (todoItem) {
      let item = {
        text: todoItem,
        checked: false
      }
      for (let i = 0; i < this.todoItemsWithDate.length; i++) {
        if (this.props === this.todoItemsWithDate[i].date) {
          for (let j = 0; j < this.todoItemsWithDate[i].todoItems.length; j++) {
            if (this.todoItemsWithDate[i].todoItems[j].text === todoItem) {
              alert('Already exist Todo!')
              return
            }
          }
          this.todoItemsWithDate[i].todoItems.push(item)
          return
        }
      }
      let dateItem = {
        date: this.props,
        todoItems: [item]
      }
      this.todoItemsWithDate.push(dateItem)
      this.sortTodo()
      console.log(this.todoItemsWithDate.length)
    },
    checkTodo (index, index2) {
      let item = this.todoItemsWithDate[index].todoItems[index2]
      item.checked = !item.checked
      this.todoItemsWithDate[index].todoItems.splice(index2, 1)
      if (item.checked) {
        this.todoItemsWithDate[index].todoItems.push(item)
      } else {
        this.todoItemsWithDate[index].todoItems.unshift(item)
      }
    },
    removeTodo (todoItem, index, index2) {
      // firebase 연동 부분
      this.todoItemsWithDate[index].todoItems.splice(index2, 1)
      if (this.todoItemsWithDate[index].todoItems.length === 0) {
        this.todoItemsWithDate.splice(index, 1)
      }
    },
    sortTodo () {
      this.todoItemsWithDate.sort((a, b) => a.date > b.date ? 1 : -1)
    },
    clearAll () {
      // firebase 연동 부분
      this.todoItemsWithDate = []
    }
  }
}
</script>

<style scoped>
.top {
  padding-top: 3vh;
}
</style>
