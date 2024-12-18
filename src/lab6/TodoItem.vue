<template>
  <div class="todo-item">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="toggleComplete"
    />
    <span class="todo-text" :class="{ completed: todo.completed }">
      {{ todo.text }}
    </span>
    <button @click="$emit('delete-todo', todo.id)">Удалить</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object,
  },
  methods: {
    toggleComplete() {
      this.$emit("toggle-complete", this.todo.id);
    },
  },
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 4px;
}

.todo-text {
  flex: 1;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

input[type="checkbox"] {
  margin-right: 10px;
  cursor: pointer;
}

button {
  padding: 5px 10px;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #e04444;
}
</style>
