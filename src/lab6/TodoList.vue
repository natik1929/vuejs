<template>
  <div class="todo-list">
    <AddTodo @add-todo="addTodo" />
    <div v-for="todo in todos" :key="todo.id">
      <TodoItem
        :todo="todo"
        @delete-todo="deleteTodo"
        @toggle-complete="toggleComplete"
      />
    </div>
  </div>
</template>

<script>
import AddTodo from "./AddTodo.vue";
import TodoItem from "./TodoItem.vue";

export default {
  components: { AddTodo, TodoItem },
  data() {
    return {
      todos: [],
      nextId: 1,
    };
  },
  methods: {
    addTodo(text) {
      this.todos.push({ id: this.nextId++, text, completed: false });
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    toggleComplete(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
};
</script>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: 0 auto;
}
</style>
