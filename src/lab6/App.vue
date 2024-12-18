<template>
  <div id="app">
    <h1>Список дел</h1>
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";

export default {
  components: { TodoList },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
