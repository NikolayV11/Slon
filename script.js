const resultOut = document.querySelector(".result");
const inputIn = document.querySelector(".inputIn");
const btnIn = document.querySelector(".btnIn");
const timeOut = document.querySelector(".timeOut");
const clueBtn = document.querySelector(".clue"); // кнопка
const clueBlock = document.querySelector(".clueBtn"); //блок кнопки
const clueText = document.querySelector(".clueText");

let rand;
let strRan = "";
let statusStop = false;
let secTime;
let munTime;
let array = [
  { name: "титаник", clue: "корабль" },
  { name: "солнце", clue: "звезда" },
  { name: "слон", clue: "большой серый" },
  { name: "мкс", clue: "международная станция" },
];

function wordUpdate() {
  rand = Math.floor(Math.random() * array.length);

  //подсказка в input
  // inputIn.setAttribute("placeholder", array[rand].clue);
}

function checkClueText() {
  if (munTime == 0 && secTime < 59) {
    alert("у вас недостаточно времени");
  } else {
    secTime -= 30;
    clueBlock.style.display = "none";
    clueText.style.display = "block";
    clueText.innerHTML = `<p>${array[rand].clue}</p>`;
  }
}

// wordUpdate();

//таймер отсчёта

function countdown() {
  let times = setInterval(() => {
    timeOut.innerHTML = `${munTime}:${secTime}`;

    if (statusStop) {
      clearInterval(times);
    }
    if (munTime == 0 && secTime == 0) {
      clearInterval(times);
      return (munTime = 0), (secTime = 0), (statusStop = true);
    }
    if (secTime <= 0) {
      munTime--;
      secTime = 59;
    }

    secTime--;
  }, 1000);
}
// countdown();

//ограничение ввода
function inResult() {
  if (munTime == 0 && secTime == 0) {
    this.value = this.value.substr(0, 0);
    alert("Время закончилось");
  }
  this.value = this.value.substr(0, 1);
  strIn();
}

// обработка слова

function updateStrRan() {
  for (let i = 0; i < array[rand].name.length; i++) {
    strRan += "_";
  }
}
// updateStrRan();

function strIn() {
  let arr = strRan.split("");
  for (let i = 0; i < array[rand].name.length; i++) {
    for (let j = i; j < array[rand].name.length; j++) {
      if (inputIn.value.toLowerCase() == array[rand].name[j]) {
        arr.splice(j, 1, inputIn.value.toLowerCase());
      }
    }
  }
  inputIn.value = "";
  strRan = arr.join("");
  resultInput();
}

// вывод с поля ввода
function resultInput() {
  resultOut.innerHTML = `${strRan}`;
  if (array[rand].name == strRan) {
    statusStop = true;
  }
}
// resultInput();

function now() {
  clueBlock.style.display = "block";
  clueText.style.display = "none";
  strRan = "";
  munTime = 1;
  secTime = 59;
  if (statusStop == true) {
    statusStop = false;
    countdown();
  }

  wordUpdate();
  updateStrRan();
  resultInput();
}
countdown();
now();

// btnIn.ontouchstart = now;
clueBtn.onclick = checkClueText;
btnIn.onclick = now;
inputIn.oninput = inResult;
