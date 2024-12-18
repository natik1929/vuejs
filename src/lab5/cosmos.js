
import { createApp, ref, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup() {
    const objects = ref([]);
    const searchString = ref('');
    const sortKey = ref('name');

    const fetchObjects = async () => {
      const response = await fetch('cosmos.json');
      objects.value = await response.json();
    };

    const sortedObjects = computed(() => {
      // Фильтрация объектов по строке поиска
      let filtered = objects.value.filter(object => {
        const searchText = searchString.value.trim().toLowerCase();
        return (
          object.name.toLowerCase().includes(searchText) ||
          object.size.toString().includes(searchText)
        );
      });

      // Сортировка объектов
      return filtered.sort((a, b) => {
        if (sortKey.value === 'size') {
          return a.size - b.size;
        } else if (sortKey.value === 'name') {
          return a.name.localeCompare(b.name);
        }
      });
    });

    onMounted(fetchObjects);

    return {
      objects,
      searchString,
      sortKey,
      sortedObjects
    };
  }
}).mount('#app');
