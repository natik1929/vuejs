<template>
  <div class="memory-test">
    <h1 class="title">Тест по методике "Оперативная память"</h1>
    <p class="description">
      Внимательно смотрите на экран и запоминайте появляющиеся на нем цифры для дальнейшего сложения.
      Напоминаю: ваша цель сложить первую цифру со второй, вторую цифру с третьей, третью с четвертой. Результаты введите в таблицу ниже.
    </p>

    <!-- Стартовая кнопка -->
    <div v-if="stage === 'intro'" class="start-btn-container">
      <button @click="startTest" class="start-btn">Начать</button>
    </div>

    <div class="screen">
      <div v-if="stage === 'intro'">{{ message }}</div>
      <div v-else-if="stage === 'numbers'">
        <div v-if="showRowNumber" class="row-number">Ряд №{{ currentRowNumber }}</div>
        <div v-else class="number">{{ currentNumber }}</div>
      </div>
    </div>

    <!-- Таблица для ввода значений -->
    <div class="input-table" v-if="stage !== 'intro'">
      <table>
        <tr v-for="(_, rowIndex) in results" :key="'row-' + rowIndex">
          <td v-for="(_, colIndex) in results[rowIndex]" :key="'col-' + colIndex">
            <input
              type="number"
              v-model="userInputs[rowIndex][colIndex]"
              :disabled="isSubmitted"
            />
          </td>
        </tr>
      </table>
      <button @click="submitResults" :disabled="isSubmitted" class="submit-btn">Готово</button>
    </div>

    <!-- Результаты -->
    <div v-if="isSubmitted" class="results">
      <div class="result-tables">
        <div class="result-header">Правильный ответ</div>
        <div class="result-header">Ваш ответ</div>
      </div>
      <div class="result-tables">
        <!-- Таблица правильных ответов -->
        <table class="correct-table">
          <tr v-for="(row, rowIndex) in results" :key="'result-row-' + rowIndex">
            <td v-for="(value, colIndex) in row" :key="'correct-' + colIndex">
              {{ value }}
            </td>
          </tr>
        </table>

        <!-- Таблица пользовательских ответов -->
        <table class="user-table">
          <tr v-for="(row, rowIndex) in userInputs" :key="'input-row-' + rowIndex">
            <td
              v-for="(value, colIndex) in row"
              :key="'input-' + colIndex"
              :class="{ correct: value == results[rowIndex][colIndex] }"
            >
              {{ value }}
            </td>
          </tr>
        </table>
      </div>
      <!-- Кнопка начать заново -->
      <div class="restart-btn-container">
        <button @click="resetTest" class="restart-btn">Начать заново</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stage: "intro",
      message: "Приготовились",
      currentNumber: null,
      currentRowNumber: null,
      showRowNumber: false,
      results: Array.from({ length: 5 }, () => Array(3).fill(null)),
      userInputs: Array.from({ length: 5 }, () => Array(3).fill("")),
      isSubmitted: false,
      rowIndex: 0,
      numIndex: 0,
      numbers: [],
    };
  },
  methods: {
    startTest() {
      const introMessages = ["Приготовились", "Ряд №1"];
      let index = 0;

      const introInterval = setInterval(() => {
        this.message = introMessages[index];
        index++;

        if (index >= introMessages.length) {
          clearInterval(introInterval);
          this.startRow();
        }
      }, 1000);
    },
    startRow() {
      if (this.rowIndex >= 5) {
        this.stage = "input";
        return;
      }

      this.stage = "numbers";
      this.currentRowNumber = this.rowIndex + 1;
      this.numbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1);
      this.results[this.rowIndex] = [
        this.numbers[0] + this.numbers[1],
        this.numbers[1] + this.numbers[2],
        this.numbers[2] + this.numbers[3],
      ];

      this.showRowLabel();
    },
    showRowLabel() {
      this.showRowNumber = true;

      setTimeout(() => {
        this.showRowNumber = false;
        setTimeout(() => {
          this.showNextNumber();
        }, 500);
      }, 1000);
    },
    showNextNumber() {
      if (this.numIndex >= this.numbers.length) {
        this.numIndex = 0;
        this.rowIndex++;
        setTimeout(() => {
          this.startRow();
        }, 1000);
        return;
      }

      this.currentNumber = this.numbers[this.numIndex];
      this.numIndex++;

      setTimeout(() => {
        this.currentNumber = null;
        setTimeout(() => {
          this.showNextNumber();
        }, 500);
      }, 1000);
    },
    submitResults() {
      this.isSubmitted = true;
    },
    resetTest() {
      this.stage = "intro";
      this.message = "Приготовились";
      this.rowIndex = 0;
      this.numIndex = 0;
      this.results = Array.from({ length: 5 }, () => Array(3).fill(null));
      this.userInputs = Array.from({ length: 5 }, () => Array(3).fill(""));
      this.isSubmitted = false;
    },
  },
};
</script>

<style scoped>
.memory-test {
  text-align: center;
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  font-family: Arial, sans-serif;
  width: 700px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  color: #333;
  font-size: 2rem;
}

.description {
  color: #6c757d;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.start-btn-container {
  margin-top: 50px;
}

.start-btn {
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #ffd4d4;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-btn:hover {
  background-color: #f8b3b3;
}

.screen {
  margin: 20px auto;
  width: 200px;
  height: 100px;
  border: 2px solid #ffb3b3;
  background-color: #fce4ec;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.row-number {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.number {
  font-size: 36px;
  font-weight: bold;
  color: #ff4081;
}

.input-table table {
  margin: 20px auto;
  border-collapse: collapse;
}

input {
  width: 50px;
  text-align: center;
  padding: 5px;
  margin: 5px;
  border: 2px solid #ffccd5;
  border-radius: 5px;
  background-color: #fff0f3;
}

.submit-btn {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #b3e5fc;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #81d4fa;
}

.results {
  margin-top: 20px;
}

.result-tables {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.result-header {
  font-weight: bold;
  text-align: center;
  width: 150px;
  background-color: #f3e5f5;
}

.correct-table,
.user-table {
  width: 150px;
  border-collapse: collapse;
  table-layout: fixed;
}

.correct-table td,
.user-table td {
  border: 1px solid #ffb3b3;
  text-align: center;
  padding: 5px;
}

.correct {
  background-color: #4caf50;
  color: white;
}

.restart-btn-container {
  margin-top: 20px;
}

.restart-btn {
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #ffb3b3;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.restart-btn:hover {
  background-color: #ff8080;
}
</style>
