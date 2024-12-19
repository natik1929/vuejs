<template>
  <div id="app">
    <!-- Меню навигации -->
    <div class="menu">
      <button @click="currentTest = 'attention'" :class="{'active': currentTest === 'attention'}">
        Тест 1 - Тест на избирательность внимания
      </button>
      <button @click="currentTest = 'memory'" :class="{'active': currentTest === 'memory'}">
        Тест 2 - Тест по методике "Оперативная память"
      </button>
    </div>

    <!-- Контент тестов -->
    <div v-if="currentTest === 'attention'">
      <Attention />
    </div>
    <div v-if="currentTest === 'memory'">
      <Memory />
    </div>
  </div>
</template>

<script>
import Attention from './Attention.vue';
import Memory from './Memory.vue';

export default {
  components: {
    Attention,
    Memory
  },
  data() {
    return {
      currentTest: 'attention' // Начинаем с первого теста
    };
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
}

.menu {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.menu button {
  padding: 12px 24px;
  font-size: 1.1rem;
  background-color: #e8e8e8;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.menu button:hover {
  background-color: #dcdcdc;
}

.menu .active {
  background-color: #b3d9ff;
}

</style>
