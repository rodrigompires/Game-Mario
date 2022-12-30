"use strict";

//  DECLARAÇÃO DE VARIÁVEIS E CONSTANTES DO DOM
// ---------------------------------------------------------------------------------------------------

const $buttonB = document.querySelector(".b");
const $buttonA = document.querySelector(".a");
const $mario = document.querySelector(".display__mario");
const $obj = document.querySelector(".display__obj");
const $start = document.querySelector(".start");
const $select = document.querySelector(".select");
const $salutation = document.querySelector(".display__salutation");
const $gate = document.querySelector(".display__gate");
const $clouds = document.querySelector(".display__clouds");
const $flower = document.querySelector(".display__flower");
const $princess = document.querySelector(".display__princess");
const $coin = document.querySelector(".display__coin");
const $photo = document.querySelector(".display__photo");
const $displayBoard = document.querySelector(".display__board");
const $blockOn = document.querySelector(".display__on");
const $blockOff = document.querySelector(".display__off");
const $fireworks = document.querySelector(".display__fireworks");
const $loader = document.querySelector(".display__loader");
const $enemy = document.querySelector(".display__enemy");
const $goomba = document.querySelector(".display__goomba");
const $blockI = document.querySelector(".display__blocki");
const $ghosts = document.querySelector(".display__ghosts");
const $koppa = document.querySelector(".display__koppa");
const $gold = document.querySelector(".display__gold");
const $yoshi = document.querySelector(".display__yoshi");
const $egg = document.querySelector(".display__egg");
const $babyMario = document.querySelector(".display__babymario");
const $babyMarioCrying = document.querySelector(".display__babymariocrying");
const $star = document.querySelector(".display__star");
const $lightning = document.querySelector(".display__lightning");
const $volcano = document.querySelector(".display__volcano");
const $storm = document.querySelector(".display__storm");
const $messageBlock = document.querySelector('.display__msg');
const $modalScore = document.querySelector('.display__score');
const $modalClose = document.querySelector('.display__close');
// const $goldCoin = document.querySelector('.display__goldcoin');
const $countDown = document.querySelector('.display__count');

let $userName = document.querySelector(".display__username");
let $attempts = document.querySelector(".display__attempts");
let $victories = document.querySelector(".display__victories");
let $defeats = document.querySelector(".display__defeats");

const $gameboy = document.querySelector(".gameboy");
const $power = document.querySelector(".power");

// VARIÁVEIS DE AUDIO
//---------------------------------------------------------------------------------------------------------
const audio = new Audio("../sounds/audio2.mp3");
const audioJump = new Audio(
  "../sounds/Super Mario World - Jump Sound Effect.mp3"
);
const audioGameOver = new Audio("../sounds/Super Mario World - Game Over.mp3");
const audioMusic = new Audio(
  "../sounds/Super Mario World Music - Overworld.mp3"
);
const audioTheme = new Audio(
  "../sounds/Super Mario World Music - Opening Title.mp3"
);
const audioSpin = new Audio(
  "../sounds/Super Mario World - Spin Sound Effect.mp3"
);
const audioVictory = new Audio(
  "../sounds/Super Mario World Music - Course Clear Fanfare.mp3"
);
const audioItem = new Audio("../sounds/item.mp3");
const audioPrincess = new Audio(
  "../sounds/Super Mario World Music - Castle Clear Demo.mp3"
);
const audioCoin = new Audio("../sounds/coin.mp3");
const audioToasty = new Audio("../sounds/TOASTY! MK.mp3");
const audioOn = new Audio("../sounds/on.mp3");
const audioFireworks = new Audio(
  "../sounds/Fogos de artifício -Efeitos sonoros.mp3"
);
const audioInitial = new Audio("../sounds/initial.mp3");
const audioMessage = new Audio("../sounds/message_block.mp3");
const audioClose = new Audio("../sounds/midway_gate.mp3");
// const audioGoldCoin = new Audio("../sounds/goldcoin.mp3");

// ------------------------------------------------------------------------------------------------------------

let initial = true;

// EVENTO DE CLIQUE AO BOTÃO POWER
// ------------------------------------------------------------------------------------------------------------

$power.addEventListener("click", () => {
  $gameboy.classList.toggle("on");
  if ($gameboy.classList.contains("on")) {
    audioInitial.play();
    audioTheme.play();
  } else {
    audioTheme.pause();
    location.reload();
  }
});

// EVENTO DE CLIQUE NO BOTÃO START
// ------------------------------------------------------------------------------------------------------------

$start.addEventListener("click", start);

function start() {
  let i = 3;
  let timer = setInterval(() => {
    $countDown.innerHTML = i;
    // audio.src = `../sounds/${i}.mp3`;
    audio.src = `../sounds/countdown.mp3`;
    audio.play();
    if (i == 0) {
      clearInterval(timer)
      $countDown.style.display = 'none';
    }
    i--
  },1000)




  setTimeout(() => {

    $salutation.style.display = "none";
    $messageBlock.style.display = "none";
  
  if (initial && $gameboy.classList.contains("on")) {
    audioTheme.pause();

    $obj.classList.add("start");
    $coin.classList.add("start");
    $blockOn.classList.add("start");
    $blockOff.classList.add("start");
    $blockI.classList.add("start");
    $star.classList.add("start");
    // $goldCoin.classList.add("start");

    enemy();
    koppa();

    interval();
    checkToasty();

    $buttonB.addEventListener("click", jumpMario);
    $buttonA.addEventListener("click", jumpMarioA);

    function jumpMario() {
      $mario.classList.add("jump");
      audioJump.play();
      setTimeout(() => {
        $mario.classList.remove("jump");
      }, 500);
    }

    function jumpMarioA() {
      $mario.classList.add("jump");
      audioSpin.play();
      setTimeout(() => {
        $mario.classList.remove("jump");
      }, 500);
    }

    $select.addEventListener("click", changeItem);
    audioMusic.play();
  } else {
    location.reload();
  }
  }, 4000)

  
}

// FUNCÕES DA PASSAGEM DE ALGUNS ITENS QUE NÃO IMPEDEM O ANDAR DO JOGO
// -------------------------------------------------------------------------------------------------------------

function enemy() {
  setTimeout(() => {
    $enemy.classList.add("start");
  }, 5000);
}

function koppa() {
  setTimeout(() => {
    $koppa.classList.add("start");
  }, 7000);
}

// FUNÇÃO DO ITEM FLOR
// ------------------------------------------------------------------------------------------------------------
function changeItem() {
  $flower.classList.add("start");
  audioItem.play();
}

//FUNÇÃO DE TROCA DE INIMIGOS
// ------------------------------------------------------------------------------------------------------------

let t;

function interval() {
  t = setInterval(change, 1500);
}

let frame = 1;

function change() {
  frame++;
  audio.src = `../sounds/audio${frame}.mp3`;
  // $obj.src = `.../images/obj${frame}.png`;
  audio.play();

  if (frame >= 2 && frame <= 4) {
    // debugger
    $obj.src = `../images/obj${frame}.png`;
  }

  if (frame >= 5 && frame <= 15) {
    $obj.src = `../images/obj${frame}.gif`;
  }

  if (frame === 9) {
    $displayBoard.style.background = "linear-gradient(#2E4266, #8D99C9)";
    $ghosts.style.display = "block";
    $ghosts.classList.add("start");
    audioMusic.src = "../sounds/Super Mario World - Trilha Sonora (Castelo).mp3";
    audioMusic.play();
    $obj.style.width = "30px";
    $lightning.style.display = "block";
    $volcano.style.display = "block";
    $storm.style.display = "block";
  }

  if (frame === 10) {
    $obj.style.width = "40px";
    $obj.style.bottom = "-8px";
  }

  if (frame === 12) {
    $obj.src = `../images/obj${frame}.png`;
    $obj.style.width = "30px";
    $obj.style.bottom = "-5px";
    $obj.style.margin = "0";
  }

  if (frame === 14) {
    $obj.style.transform = "rotateY(180deg)";
    $obj.style.bottom = "-5px";
    $obj.style.width = "25px";
  }

  if (frame === 15) {
    $obj.style.transform = "rotateY(-360deg)";
    $obj.style.width = "30px";
    $obj.style.bottom = "0";
  }

  if (frame === 16) {
    $obj.style.display = "none";
    checkVictory();
  }
}

function stop() {
  clearInterval(t);
}

// FUNÇÃO E EVENTO DE ABERTURA e FECHAMENTO DO SCORE DO JOGADOR
// ------------------------------------------------------------------------------------------------------------

$messageBlock.addEventListener('click', () => {
  audioMessage.play();
  $modalScore.classList.add("show");

  const storage =  JSON.parse(localStorage.getItem('superMario'));
  $userName.innerHTML = storage.name;
  $attempts.innerHTML = storage.attempt;
  $victories.innerHTML = storage.victorie;
  $defeats.innerHTML = storage.defeat;

})

$modalClose.addEventListener('click', () => {
  $modalScore.classList.remove("show");
  audioClose.play();
})

// FUNÇÃO PARA O EFEITO TOASTY COM MINHA FOTO
// ------------------------------------------------------------------------------------------------------------

let toasty;

function checkToasty() {
  toasty = setInterval(startToasty, 100);
}

function startToasty() {
  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);
  if (randomNumber(1, 81) === 15) {
    $photo.classList.add("start");
    audioToasty.play();
    stopToasty();
  }
}

function stopToasty() {
  clearInterval(toasty);
}

//FUNÇÃO QUE CHECA SE O JOGADOR  PERDEU
// ------------------------------------------------------------------------------------------------------------

// let qtd = 0
let yoshiOn = false;
let rotate = false;

let defeat; // score variavel


const checkGameOver = setInterval(() => {
  let objPosition = $obj.offsetLeft;
  const marioPosition = +window
    .getComputedStyle($mario)
    .bottom.replace("px", "");

  let coinLeftPosition = $coin.offsetLeft;
  let blockOnLeftPosition = $blockOn.offsetLeft;
  let blockOffLeftPosition = $blockOff.offsetLeft;
  // let goldCoinLeftPosition = $goldCoin.offsetLeft;


  // CONDIÇÃO DO BABY MARIO PARA INICIAR A ANIMAÇÃO E TROCA DE SRC E TOCAR O AUDIO - REFERE-SE Á FINAL ALTERNATIVA
  // -------------------------------------------------------------------------------------------------------

  if ($babyMario.offsetLeft === 60) {
    $babyMarioCrying.style.display = "block";
    $babyMario.style.display = "none";
    audio.src = `../sounds/crying.mp3`;
    audio.play();
  }

  // CONDIÇÃO QUE VERIFICA SE O MARIO PEGOU A MOEDA DO YOSHI PARA A FINAL ALTERNATIVA
  // ---------------------------------------------------------------------------------------------------------

  if (coinLeftPosition >= 3 && coinLeftPosition <= 25 && marioPosition === 50) {
    $coin.style.animation = "none";
    audioCoin.play();
    $gold.style.display = "block";
    yoshiOn = true;
  }

  // CONDIÇÃO QUE VERIFICA SE O MARIO PEGOU A MOEDA DE OURO
  // ---------------------------------------------------------------------------------------------------------

  // if (goldCoinLeftPosition >= 3 && goldCoinLeftPosition <= 25 && marioPosition === 50) {
  //   $goldCoin.style.animation = "none";
  //   audioGoldCoin.play();
  //   $goldCoin.style.display = "block";
    
  // }

  //CONDIÇÃO QUE ALTERA AS POSIÇÕES DA TELA
  // ---------------------------------------------------------------------------------------------------------

  if (
    blockOnLeftPosition >= 3 &&
    blockOnLeftPosition <= 25 &&
    marioPosition === 50
  ) {
    $displayBoard.classList.add("start");
    $blockOn.style.display = "none";
    $blockOff.style.display = "block";
    audioOn.play();
    $salutation.style.transform = "rotateY(180deg)";
    $gold.style.transform = "rotateY(180deg)";
    rotate = true;
  }

  if (
    blockOffLeftPosition >= 3 &&
    blockOffLeftPosition <= 25 &&
    marioPosition === 50
  ) {
    $displayBoard.classList.remove("start");
    $blockOn.style.display = "block";
    $blockOff.style.display = "none";
    audioOn.play();
    $salutation.style.transform = "rotateY(-360deg)";
    $gold.style.transform = "rotateY(-360deg)";
    rotate = false;
  }

  // CONDIÇÃO DO INIMIGO GOOMBA
  // ----------------------------------------------------------------------------------------------------------

  const enemyGoombaPosition = +window
    .getComputedStyle($enemy)
    .top.replace("px", "");
  let goombaLeftPosition = $goomba.offsetLeft;

  if (
    +enemyGoombaPosition.toFixed(2) === 162.8 ||
    +enemyGoombaPosition.toFixed(2) === 162.79
  ) {
    $goomba.style.display = "block";
    $goomba.classList.add("start");
    $enemy.style.display = "none";
  }

  // REMOVE O EVENTO DE TROCA DE INIMIGOS
  // -----------------------------------------------------------------------------------------------------------

  function removeEvent() {
    $select.removeEventListener("click", changeItem);
  }

  // CHECA POSIÇÃO DO MARIO E DEMAIS INIMIGOS PARA VERIFICAR SE HOUVE COLISÃO E ASSIM A DERROTA
  // --------------------------------------------------------------------------------------------------------------

  

  if (
    (objPosition <= 32 && objPosition > 0 && marioPosition < 25) ||
    (goombaLeftPosition <= 32 && goombaLeftPosition > 0 && marioPosition < 25)
  ) {
    $obj.style.animation = "none";
    $obj.style.left = `${objPosition}px`;

    $goomba.style.left = `${goombaLeftPosition}px`;

    $mario.style.animation = "none";
    $mario.style.bottom = `${marioPosition}px`;
    $mario.src = "../images/game-over.png";
    $mario.style.width = "20px";
    $mario.style.marginLeft = "12px";
    $coin.style.animation = "none";
    $blockOff.style.animation = "none";
    $blockOn.style.animation = "none";
    $ghosts.style.display = "none";
    $ghosts.classList.remove("start");

    defeat = true;
    score(defeat);


    removeEvent();

    function stopMusic() {
      audioMusic.pause();
    }
    stopMusic();

    audioGameOver.play();

    function stopAudio() {
      audioGameOver.pause();
    }
    setTimeout(stopAudio, 10000);

    $salutation.style.display = "block";
    $salutation.textContent = `Oh no! You lost. Do not give up and save the princess. Try again.`;
    // $salutation.textContent = `Oh no! You lost ${userName}. Do not give up and save the princess. Try again.`

    initial = false;
    clearInterval(checkGameOver);
    stop();
    stopToasty();
  }
}, 10);

// FUNÇÃO QUE CHECA SE O JOGADOR GANHOU
// ------------------------------------------------------------------------------------------------------------

function checkVictory() {
  const msgVictory =
    "Congratulations! You saved the princess! Thanks for playing. Encoded by Rodrigo Pires 😎";

  if ($displayBoard.classList.contains("start")) {
    $displayBoard.classList.remove("start");
  }

  if (rotate) {
    $salutation.style.transform = "rotateY(-360deg)";
    $gold.style.transform = "rotateY(-360deg)";
  }

  $salutation.style.display = "block";
  $salutation.textContent = msgVictory;
  $obj.style.animation = "none";
  $obj.style.right = "-30px";
  $gate.classList.add("start");
  audioMusic.pause();
  audioVictory.play();
  audioFireworks.play();
  $fireworks.style.display = "block";
  $loader.classList.add("start");
  $messageBlock.classList.add("start");
  $displayBoard.style.background = "linear-gradient(#87ceeb, #e0f6ff)";
  $ghosts.style.display = "none";
  $ghosts.classList.remove("start");
  $lightning.style.display = "none";
  $volcano.style.display = "none";
  $storm.style.display = "none";

  defeat = false;
  score(defeat);

  stop();
  stopToasty();
  $coin.style.animation = "none";
  $blockOff.style.animation = "none";
  $blockOn.style.animation = "none";

  const checkGate = setInterval(() => {
    let gatePosition = $gate.offsetLeft;

    if (gatePosition === 27) {
      $mario.src = "../images/Mario Wins.svg";
      $mario.style.width = "30px";
      $mario.style.marginLeft = "5px";
      $mario.style.bottom = "-5px";

      clearInterval(checkGate);
      setTimeout(checkPrincess, 2000);
    }
  }, 10);
}

// FUNÇÃO QUE MOSTRA O FINAL DO JOGO
// ------------------------------------------------------------------------------------------------------------

function checkPrincess() {
  $princess.classList.add("start");
  $mario.src = "../images/mario.gif";
  $mario.classList.add("start");
  $mario.style.width = "40px";
  $mario.style.bottom = "0px";
  audioPrincess.play();

  // CONDIÇÃO DA FINAL ALTERNATIVA CASO O JOGARDOR RECOLHA A MOEDA DO YOSHI
  // ---------------------------------------------------------------------------------------------------------

  if (yoshiOn) {
    $yoshi.classList.add("start");
    $egg.classList.add("start");
    $babyMario.classList.add("start");
  }
}

// MAPEAMENTO DO TECLADO
// ------------------------------------------------------------------------------------------------------------

const mapKeyboard = {
  1: "select",
  2: "a",
  3: "b",
  Enter: "start",
  Delete: "power",
};

document.addEventListener("keydown", captureKeys);

function captureKeys({ key }) {
  const _key = key;
  const keyMapped = Object.keys(mapKeyboard).indexOf(_key) !== -1;
  if (keyMapped) document.getElementById(mapKeyboard[_key]).click();
}

// INTERAÇÃO COM O USUÁRIO - ATUALIZA O SCORE E SALVA NO LOCALSTORAGE
// -------------------------------------------------------------------------------------------------------------

function score (derr) {

  const data =  JSON.parse(localStorage.getItem('superMario'));

  if (derr) {
    data.defeat += 1;
    data.attempt += 1;
    localStorage.setItem('superMario', JSON.stringify(data));

  } else {
    data.victorie += 1;
    data.attempt += 1;
    localStorage.setItem('superMario', JSON.stringify(data));
  }

    $userName.innerHTML = data.name;
    $attempts.innerHTML = data.attempt;
    $victories.innerHTML = data.victorie;
    $defeats.innerHTML = data.defeat;
}