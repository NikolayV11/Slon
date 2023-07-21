const resultOut = document.querySelector('.result');
const inputIn = document.querySelector(".inputIn");
const btnIn = document.querySelector(".btnIn");
const timeOut = document.querySelector('.timeOut');

let array = [{name: "титаник", clue: "корабль"}, {name: "солнце", clue: "звезда"}, {name: "слон", clue: "большой серый"}, {name: "мкс", clue: "международная станция"}];
let rand; 
function wordUpdate(){
  
 rand = Math.floor(Math.random()*array.length);
 
//подсказка в input
  inputIn.setAttribute("placeholder", array[rand].clue);
}

wordUpdate();

//таймер отсчёта 
let secTime = 59;
let munTime = 1;

function countdown (){
  let times = setInterval(()=>{
  timeOut.innerHTML = `${munTime}:${secTime}`;
  if (munTime == 0 && secTime == 0){
    clearInterval(times);
  }
  if (secTime <= 0){
    munTime--;
    secTime = 5;
  }
  secTime--;
}, 1000);
}
countdown();


//ограничение ввода
function inResult (){
  if(munTime <= 0){
  this.value = this.value.substr(0, 0);
  alert("Время закончилось")
  }
  this.value = this.value.substr(0, 1);
}


// обработка слова
let strRan = "";
function updateStrRan(){
  for(let i= 0; i < array[rand].name.length; i++){
  strRan += "_";
  }
}
updateStrRan();

function strIn (){
  let arr = strRan.split("");
  for (let i = 0; i < array[rand].name.length; i++){
     for (let j = i; j < array[rand].name.length; j++){
        if(inputIn.value.toLowerCase() == array[rand].name[j]){
          arr.splice(j, 1, inputIn.value.toLowerCase());
    }
  }
  }
  inputIn.value = "";
  strRan = arr.join("");
  resultInput();
}

// вывод с поля ввода
function resultInput (){
    resultOut.innerHTML = `${strRan}`;
    if(array[rand].name == strRan){
      alert("победа");
    }
}
resultInput();

btnIn.ontouchstart = strIn;
inputIn.oninput = inResult;