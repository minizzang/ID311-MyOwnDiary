<template>
  <div>
    <h2 class="top">Todo List</h2>
    <br/>
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
import {onValue, push, ref, remove, update} from '@firebase/database'
export default {
  props: ['props'],
  components: {
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  },
  data () {
    return {
      uid: '',
      todoItemsWithDate: [],
      temp: 1
    }
  },
  mounted () {
    this.uid = localStorage.getItem('user')

    // get todo list from firebase db
    const todoRef = ref(this.$db, 'todo/' + this.uid)
    onValue(todoRef, (snapshot) => {
      this.todoItemsWithDate = []
      const todoData = snapshot.val()
      if (todoData != null) {
        Object.keys(todoData).forEach((date) => {
          const tempTodoItems = []
          Object.keys(todoData[date]).forEach((todoKey) => {
            const data = todoData[date][todoKey]
            const item = {
              key: todoKey,
              text: data.text,
              checked: data.checked
            }
            if (data.checked) { // add item as last element
              tempTodoItems.push(item)
            } else { // add item as first element
              tempTodoItems.unshift(item)
            }
          })
          const dateItem = {
            date: date,
            todoItems: tempTodoItems
          }
          this.todoItemsWithDate.push(dateItem)
        })
      }
    })
  },
  methods: {
    addTodo (todoItem) {
      // store to firebase db
      push(ref(this.$db, 'todo/' + this.uid + '/' + this.props + '/'), {
        text: todoItem,
        checked: false
      }).catch((err) => console.log(err))
    },
    checkTodo (index, index2) {
      // update checked value
      const targetDate = this.todoItemsWithDate[index].date
      const targetItem = this.todoItemsWithDate[index].todoItems[index2]

      update(ref(this.$db, 'todo/' + this.uid + '/' + targetDate + '/' + targetItem.key), {
        checked: !targetItem.checked
      }).catch((err) => console.log(err))

      // let item = this.todoItemsWithDate[index].todoItems[index2]
      // item.checked = !item.checked
      // this.todoItemsWithDate[index].todoItems.splice(index2, 1)
      // if (item.checked) {
      //   this.todoItemsWithDate[index].todoItems.push(item)
      // } else {
      //   this.todoItemsWithDate[index].todoItems.unshift(item)
      // }
    },
    removeTodo (todoItem, index, index2) {
      // delete todo in db
      const targetDate = this.todoItemsWithDate[index].date
      const targetItem = this.todoItemsWithDate[index].todoItems[index2]

      remove(ref(this.$db, 'todo/' + this.uid + '/' + targetDate + '/' + targetItem.key))
    },
    sortTodo () {
      this.todoItemsWithDate.sort((a, b) => a.date > b.date ? 1 : -1)
    },
    clearAll () {
      // firebase 연동 부분
      remove(ref(this.$db, 'todo/' + this.uid))
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
