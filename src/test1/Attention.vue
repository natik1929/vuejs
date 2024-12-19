<template>
  <div class="card">
    <h1>Тест на избирательность внимания</h1>
    <p class="description">
      Вы увидите перед собой список из 10 трехзначных чисел, а ниже таблицу из 100 ячеек с трехзначными числами. Ваша задача состоит в том, чтобы как можно быстрее найти и выделить в таблице эти 10 чисел.
    </p>
    <button v-if="!testStarted" @click="startTest" class="start-btn">Начать</button>
    <div v-if="testStarted">
      <div>
        <h2>Заданные числа:</h2>
        <div class="numbers-row">
          <span v-for="(number, index) in targetNumbers" :key="index">{{ number }}</span>
        </div>
      </div>
      <div class="grid">
        <div
          v-for="(cell, index) in gridNumbers"
          :key="index"
          :class="getCellClass(index)"
          @click="toggleCell(index)"
        >
          {{ cell }}
        </div>
      </div>
      <div class="controls">
        <div v-if="timeLeft > 0" class="timer">Оставшееся время: {{ timeLeft }} секунд</div>
        <div v-else class="timer">Время вышло!</div>
        <button v-if="timeLeft > 0 && !testFinished" @click="finishTest" class="control-btn">Готово</button>
        <button v-if="testFinished" @click="resetTest" class="control-btn">Начать заново</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      testStarted: false,
      targetNumbers: [],
      gridNumbers: [],
      selectedIndexes: [],
      timeLeft: 90,
      timer: null,
      testFinished: false,
    };
  },
  methods: {
    startTest() {
      this.testStarted = true;
      this.targetNumbers = this.generateRandomNumbers(10);  // 10 целевых чисел
      this.gridNumbers = this.generateGridNumbers(100, this.targetNumbers);  // Сгенерировать 100 чисел с 10 целевыми числами
      this.selectedIndexes = [];
      this.timeLeft = 90;
      this.testFinished = false;
      this.startTimer();
    },
    resetTest() {
      clearInterval(this.timer);
      this.testStarted = false;
      this.testFinished = false;
    },
    generateRandomNumbers(count) {
      const numbers = new Set();
      while (numbers.size < count) {
        numbers.add(Math.floor(100 + Math.random() * 900));
      }
      return Array.from(numbers);
    },
    generateGridNumbers(gridCount, targetNumbers) {
      // Создаём таблицу с 100 ячейками, в которых гарантированно будут целевые числа
      const gridNumbers = [...targetNumbers];
      while (gridNumbers.length < gridCount) {
        const randomNum = Math.floor(100 + Math.random() * 900);
        if (!gridNumbers.includes(randomNum)) {
          gridNumbers.push(randomNum);
        }
      }
      // Перемешиваем числа в таблице
      for (let i = gridNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gridNumbers[i], gridNumbers[j]] = [gridNumbers[j], gridNumbers[i]];
      }
      return gridNumbers;
    },
    toggleCell(index) {
      if (this.testFinished || this.timeLeft <= 0) return;
      const selectedIndex = this.selectedIndexes.indexOf(index);
      if (selectedIndex !== -1) {
        this.selectedIndexes.splice(selectedIndex, 1);
      } else {
        this.selectedIndexes.push(index);
      }
    },
    getCellClass(index) {
      if (this.testFinished) {
        const isCorrect = this.targetNumbers.includes(this.gridNumbers[index]);
        if (this.selectedIndexes.includes(index)) {
          return isCorrect ? 'correct' : 'wrong';
        }
        return '';
      }
      return this.selectedIndexes.includes(index) ? 'highlighted' : '';
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          clearInterval(this.timer);
          this.finishTest();
        }
      }, 1000);
    },
    finishTest() {
      this.testFinished = true;
      clearInterval(this.timer);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.card {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(135deg, #fdfbfb, #ebedee);
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 32px;
  color: #333;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
}
.description {
  color: #6c757d;
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.numbers-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #555;
}

.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 5px;
  margin-top: 20px;
}

.grid div {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #444;
  user-select: none;
  transition: background 0.3s, transform 0.2s;
}

.grid div:hover {
  transform: scale(1.1);
  background: #e1e1e1;
}

.grid div.highlighted {
  background: #b0e0e6;
}

.grid div.correct {
  background: #98fb98;
  border: 2px solid #32cd32;
}

.grid div.wrong {
  background: #f4cccc;
  border: 2px solid #ff4500;
}

.controls {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.timer {
  font-size: 18px;
  font-weight: bold;
  color: #555;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

.start-btn {
  background: #ffcccb;
  color: #333;
}

.start-btn:hover {
  background: #ffa07a;
}

.control-btn {
  background: #add8e6;
  color: #333;
}

.control-btn:hover {
  background: #87cefa;
}

button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}
</style>
