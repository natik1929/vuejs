<template>
  <div class="weather-app">
    <h1>Погодное приложение</h1>
    <p>Узнать погоду в {{ city == "" ? "вашем городе" : cityName }}</p>
    <input type="text" v-model="city" placeholder="Введите город">
    <button v-if="city != ''" @click="getWeather()">Получить погоду</button>
    <button disabled v-else>Введите название города</button>
    <p class="error">{{ weatherError }}</p>

    <div v-if="weatherInfo != null">
      <p>{{ showTemp }}</p>
      <p>{{ showFeelsLike }}</p>
      <p>{{ showMinTemp }}</p>
      <p>{{ showMaxTemp }}</p>
    </div>

    <div v-if="averageTemp !== null">
      <h3>Средняя температура в регионе:</h3>
      <p>{{ averageTemp }}°C</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Weather',
  data() {
    return {
      city: "",
      weatherError: "",
      weatherInfo: null,
      regionCities: [],
      averageTemp: null
    };
  },
  computed: {
    cityName() {
      return "«" + this.city + "»";
    },
    showTemp() {
      return "Температура: " + this.weatherInfo.main.temp;
    },
    showFeelsLike() {
      return "Ощущается как: " + this.weatherInfo.main.feels_like;
    },
    showMinTemp() {
      return "Минимальная температура: " + this.weatherInfo.main.temp_min;
    },
    showMaxTemp() {
      return "Максимальная температура: " + this.weatherInfo.main.temp_max;
    }
  },
  methods: {
    getWeather() {
      // Проверяем минимальную длину названия города
      if(this.city.trim().length < 2) {
        this.weatherError = "Нужно название более одного символа :)";
        return false;
      }

      // Сбрасываем предыдущие данные и ошибки
      this.weatherError = "";
      this.regionCities = [];
      this.averageTemp = null;

      // Запрос текущей погоды
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=0ba39c23e0dd0a5b63ccdd6354473356`)
        .then(res => {
          // Сохраняем данные о погоде
          this.weatherInfo = res.data;

          // Получаем координаты для поиска городов региона
          const { lat, lon } = res.data.coord;
          this.getRegionCities(lat, lon);
        })
        .catch(() => {
          // Обрабатываем ошибку
          this.weatherError = "Не удалось найти данные о городе.";
        });
    },

    getRegionCities(lat, lon) {
      // Запрос городов в заданном регионе (окрестности города)
      axios.get(`https://api.openweathermap.org/data/2.5/box/city?bbox=${lon-5},${lat-5},${lon+5},${lat+5},10&units=metric&appid=0ba39c23e0dd0a5b63ccdd6354473356`)
        .then(res => {
          // Сохраняем список городов
          this.regionCities = res.data.list;

          // Рассчитываем среднюю температуру
          this.calculateAverageTemperature();
        })
        .catch(() => {
          // Обрабатываем ошибку
          this.weatherError = "Не удалось найти данные о регионе.";
        });
    },

    calculateAverageTemperature() {
      // Рассчитываем среднюю температуру в регионе
      if (this.regionCities.length === 0) return;
      const totalTemp = this.regionCities.reduce((sum, city) => sum + city.main.temp, 0);
      this.averageTemp = (totalTemp / this.regionCities.length).toFixed(2);
    }
  }
};
</script>

<style scoped>
.weather-app {
  width: 90%;
  padding: 20px;
  background: #1f0f24;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.weather-app input {
  margin-top: 20px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid #110813;
  color: #fcfcfc;
  font-size: 14px;
  padding: 5px 8px;
  outline: none;
}

.weather-app input:focus {
  border-bottom-color: #6e2d7d;
}

.weather-app button {
  background: #e3bc4b;
  color: #fff;
  border-radius: 10px;
  border: 2px solid #b99935;
  padding: 10px 15px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 500ms ease;
}

.weather-app button:hover {
  transform: scale(1.1) translateY(-5px);
}

.error {
  color: #d03939;
  font-weight: bold;
  margin-bottom: 15px;
}
</style>
