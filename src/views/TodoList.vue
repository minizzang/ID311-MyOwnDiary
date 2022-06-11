<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="index" class="shadow">
        {{ todoItem }}
        <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
            <i class="far fa-trash-alt" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
export default {
  props: ['propsdata'],
  methods: {
    removeTodo (todoItem, index) {
      this.$emit('removeTodo', todoItem, index)
    }
  }
}
</script>

<style>
.list-enter-active{
  transition: all 1s;
}
.list-enter{
  opacity: 0;
  transform: translateY(30px);
}
ul{
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  padding-left: 0px;
  margin-top: 10px;
  text-align: left;
}
li{
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.removeBtn{
  margin-left: auto;
  color: #DE4343;
}
</style>
