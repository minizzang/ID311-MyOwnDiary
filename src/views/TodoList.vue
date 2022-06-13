<template>
  <section style="overflow: scroll; z-index: 5000;" id="todoSection">
    <transition-group name="list-date" tag="ul" id="todoWithDateUl">
      <li v-for="(todoItemWithDate, index) in propsdata" :key="todoItemWithDate.date + index" id="todoWithDateLi">
        <div id="todoDate">
          {{ todoItemWithDate.date }}
        </div>
        <section>
          <transition-group name="list" tag="ul" id="todoUl">
            <li v-for="(todoItem, index2) in todoItemWithDate.todoItems" :key="todoItem.text + index2" id="todoLi">
              <div id="todoText">
                <input type="checkbox" id="checkboxInput" v-bind:checked="todoItem.checked" v-on:change="changed(index, index2)">
                {{ todoItem.text }}
                <span class="removeBtn" type="button" @click="removeTodo(todoItem, index, index2)">
                    <i class="far fa-trash-alt" aria-hidden="true"></i>
                  </span>
              </div>
            </li>
          </transition-group>
        </section>
      </li>
    </transition-group>
  </section>
</template>

<script>
export default {
  props: ['propsdata'],
  methods: {
    removeTodo (todoItem, index, index2) {
      this.$emit('removeTodo', todoItem, index, index2)
    },
    changed (index, index2) {
      console.log(index)
      this.$emit('checkTodo', index, index2)
    }
  }
}
</script>

<style>

#todoSection {
  display: block;
  max-height: 70%;
}

#todoSection::-webkit-scrollbar {
  width: 0;
}

#todoWithDateUl {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  padding-left: 0px;
  margin-top: 10px;
  text-align: left;
}

#todoWithDateLi {
  margin: 0.5rem 0;
}

#todoUl {
  margin-top: 5px;
  padding-left: 0;
}

#todoDate {
  text-align: center;
  font-size: 12px;
  background-color: #6f42c1;
  color: white;
  border-radius: 5px;
}

#todoLi {
  list-style: none;
  border-radius: 5px;
  border: solid 0.1em black;
  margin-top: 5px;
}

#todoText {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  padding: 0 0.9rem;
  background: white;
  align-items: center;
}

#checkboxInput {
  margin-right: 10px;
}

.removeBtn {
  margin-left: auto;
  color: #DE4343;
}
</style>
