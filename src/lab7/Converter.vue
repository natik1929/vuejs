<template>
  <div class="bitcoin-app">
    <h2>Актуальная цена 1 биткоина:</h2>

    <div v-if="btcError" class="error">{{ btcError }}</div>

    <div v-if="btcRates.USD" class="rate-card">
      <p>USD (Доллар США): <span class="rate">{{ btcRates.USD }} $</span></p>
      <p>EUR (Евро): <span class="rate">{{ btcRates.EUR }} €</span></p>
      <p>GBP (Фунт стерлингов): <span class="rate">{{ btcRates.GBP }} £</span></p>
    </div>

    <div class="conversion-form">
      <label for="btcAmount">Введите количество биткоинов:</label>
      <input type="number" v-model="btcAmount" min="0" placeholder="Количество BTC" />

      <div class="currency-selection">
        <label for="convertTo">Выберите валюту для конвертации:</label>
        <select v-model="convertTo">
          <option value="USD">USD (Доллар США)</option>
          <option value="EUR">EUR (Евро)</option>
          <option value="GBP">GBP (Фунт стерлингов)</option>
        </select>
      </div>

      <p class="result">
        Итоговая сумма: <span>{{ convertBitcoin(btcAmount, convertTo).toFixed(2) }} {{ convertTo }}</span>
      </p>
    </div>

    <button @click="getBitcoinRates" class="update-button">Обновить курсы</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Converter',
  data() {
    return {
      btcRates: {},    // Содержит курсы биткоина в разных валютах
      btcAmount: 1,    // Количество биткоинов по умолчанию
      convertTo: 'USD', // Валюта для конвертации (по умолчанию - USD)
      btcError: ''     // Сообщение об ошибке
    };
  },
  methods: {
    // Метод для получения текущих курсов биткоина
    getBitcoinRates() {
      this.btcError = '';  // Сбрасываем ошибку
      axios
        .get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp')
        .then(response => {
          // Заполняем объект btcRates данными с API
          this.btcRates = {
            USD: response.data.bitcoin.usd,
            EUR: response.data.bitcoin.eur,
            GBP: response.data.bitcoin.gbp,
          };
        })
        .catch(err => {
          // В случае ошибки при получении данных
          this.btcError = 'Ошибка при получении данных о курсе биткоина';
          console.error(err);
        });
    },
    // Метод для конвертации биткоинов в другую валюту
    convertBitcoin(amount, currency) {
      if (!this.btcRates[currency]) {
        // Если курс для выбранной валюты не найден
        this.btcError = 'Выберите правильную валюту для конвертации';
        return 0; // Возвращаем 0
      }
      return amount * this.btcRates[currency]; // Конвертируем биткоины в выбранную валюту
    }
  },
  created() {
    this.getBitcoinRates();  // При создании компонента сразу получаем курсы
  }
};
</script>

<style scoped>
.bitcoin-app {
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
}

.rate-card {
  margin: 15px 0;
  padding: 15px;
  background-color: #eaf1f7;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rate {
  font-weight: bold;
  color: #007bff;
}

.conversion-form {
  margin: 20px 0;
}

button.update-button {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.update-button:hover {
  background-color: #0056b3;
}

.error {
  color: #d03939;
  font-weight: bold;
  margin-bottom: 15px;
}
</style>
