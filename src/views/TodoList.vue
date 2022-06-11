<template>
  <section>
    <transition-group name="list" tag="ul" id="todoUl">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem.text + index" id="todoLi">
        <input type="checkbox" id="checkboxInput" v-bind:value="index" v-bind:checked="todoItem.checked" v-on:change="changed(index)">
        {{ todoItem.text }}
        <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
            <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
export default {
  watch: {
    propsdata () {
      console.log('props data watch')
      this.localTodo = this.propsdata
    }
  },
  props: ['propsdata'],
  methods: {
    removeTodo (todoItem, index) {
      this.$emit('removeTodo', todoItem, index)
    },
    changed (index) {
      console.log(index)
      this.$emit('checkTodo', index)
    }
  }
}
</script>

<style>
.list-enter-active {
  transition: all 1s;
}

.list-enter {
  opacity: 0;
  transform: translateY(30px);
}

#todoUl {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  padding-left: 0px;
  margin-top: 10px;
  text-align: left;
}

#todoLi {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
  border: solid 0.1em black;
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
