<template>
  <div class="app">
    <div class="card">
      <!-- Bitcoin Converter Component -->
      <Converter />
    </div>

    <div class="card">
      <!-- Weather App Component -->
      <Weather />
    </div>
  </div>
</template>

<script>
import Converter from './Converter.vue';
import Weather from './Weather.vue';

export default {
  name: 'App',
  components: {
    Converter,
    Weather
  }
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
  font-family: Arial, sans-serif;
}

.card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
