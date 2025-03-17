const controlsSection = document.getElementById("controlsSection");
const restartButton = document.getElementById("restart");
const changeBetButton = document.getElementById("changeBet");

const signalDisplay = document.getElementById("signalDisplay");
const signal = document.getElementById("signal");
const balloon = document.getElementById("balloonImg");

const betContainer = document.getElementById("bet-container");
const submit = document.getElementById("submit");
const betSelect = document.getElementById("bet-select");


function generateNumber(min, max) {
    // Генерирует сообщение
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playAnim(element, animatedClass) { 
    // Добавляет класс анимации
    element.classList.add(animatedClass);
    
    element.addEventListener('animationend', () => {
        element.classList.remove(animatedClass);
    }, {once: true});
}

function animateNumber(element, start, end, duration) {
    let startTime = null;

    function step(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }
        const progress = Math.min((currentTime - startTime) / duration, 1); // Прогресс от 0 до 1
        const currentNumber = start + (end - start) * progress;
        element.textContent = currentNumber.toFixed(2); // Форматируем до 2 знаков после запятой

        if (progress < 1) {
            requestAnimationFrame(step); // Продолжаем анимацию
        }
    }

    requestAnimationFrame(step); // Запускаем анимацию
}


function getSignal(selectedBet) {
    let minRandom, maxRandom;

    // Логика зависимости диапазона от ставки
    if (selectedBet === 5) {
        minRandom = 7;
        maxRandom = 15;
    } else if (selectedBet === 10) {
        minRandom = 15;
        maxRandom = 30;
    } else if (selectedBet === 20) {
        minRandom = 27;
        maxRandom = 60;
    } else if (selectedBet <= 30) {
        minRandom = 40;
        maxRandom = 90;
    } else if (selectedBet <= 50) {
        minRandom = 65;
        maxRandom = 150;
    } else {
        minRandom = 100 + (selectedBet - 50) * 2; // Базовый минимум + прирост
        maxRandom = 250 + (selectedBet - 50) * 4; // Базовый максимум + прирост
    }
    minRandom *= 100;
    maxRandom *= 100;

    return generateNumber(minRandom, maxRandom) / 100;
}


function showSignal() {
    const selectedBet = parseInt(betSelect.value, 10);

    // Генерируем новое число и запускаем анимацию
    const randomFloat = getSignal(selectedBet); // Делим на 100 для получения дробного числа

    // Добавляем класс для появления текста с задержкой
    setTimeout(() => {
        signalDisplay.classList.remove("hidden");
    }, 200);
    animateNumber(signal, 0, randomFloat, 1000); // Анимация от 0 до сгенерированного числа за 1 секунду
}


submit.onclick = function() {
    betContainer.classList.add("hidden");

    balloon.classList.add("balloon-big");
    controlsSection.classList.remove("hidden");

    showSignal();
}
// Кнопка рестарт
restartButton.onclick = function() { 
    playAnim(restartButton.querySelector("img"), "spin-on-click");
    showSignal();
};


changeBetButton.onclick = function() {
    // Скрываем signalDisplay сразу
   signalDisplay.classList.add("hidden");

   // Задержка для других действий
   setTimeout(() => {
        betContainer.classList.remove("hidden");
   }, 400); // Задержка 500 ms перед другими действиями

   playAnim(restartButton.querySelector("img"), "spin-on-click");
    balloon.classList.remove("balloon-big");
   controlsSection.classList.add("hidden");
}
