<template>
  <div class="add-todo">
    <input
      v-model="newTodo"
      type="text"
      placeholder="Введите новое дело"
    />
    <button @click="addTodo">Добавить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "", // Хранит текст, введённый пользователем
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) { // Проверяет, что строка не пустая или состоит не только из пробелов
        this.$emit("add-todo", this.newTodo);
        this.newTodo = ""; // Очищает поле ввода
      }
    },
  },
};
</script>

<style scoped>
.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 8px;
}
button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
