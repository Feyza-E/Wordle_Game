const words = [
  "badem",
  "ceket",
  "fular",
  "ferah",
  "gazoz",
  "tahta",
  "tabak",
  "lamba",
  "tablo",
  "rende",
  "sehpa",
  "radyo",
  "dolap",
  "kalem",
  "kavun",
  "merak",
  "gazap",
  "roman",
  "duvar",
  "badem",
  "ekran"
];
const state = {
  choosenWord: words[Math.floor(Math.random() * words.length)],
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill("")),
  currentRow: 0,
  currentColumn: 0,
};

const keys = [
  "A",
  "B",
  "C",
  "Ç",
  "D",
  "E",
  "F",
  "G",
  "Ğ",
  "H",
  "I",
  "İ",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ö",
  "P",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Ü",
  "V",
  "Y",
  "Z",
];

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, letter = "") {
  const box = document.createElement("div");
  box.className = "box";
  box.id = `box${row}${col}`;
  box.textContent = letter;

  container.appendChild(box);
  return box;
}

function drawGrid(container) {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      drawBox(grid, i, j);
    }
  }

  container.appendChild(grid);
}

function registerKeyboardEvents() {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      if (state.currentColumn === 5) {
        let word = getCurrentWord();
        if (isWordValid(word)) {
          check(word);
          state.currentRow++;
          state.currentColumn = 0;
          console.log(word);

        } else {
          alert("Not a valid word.");
          state.currentRow.classList.add("wrong");
          // there is a problem after the alert, program stops. i tied adding continue but gives error :()
        }
      }
    }
    if (key === "Backspace") {
      removeLetter();
    }
    if (isLetter(key)) {
      addLetter(key);
    }
    updateGrid();
  };
}

function getCurrentWord() {
  return state.grid[state.currentRow]
    .reduce((prev, curr) => prev + curr)
    .toLowerCase();
}

function isWordValid(word) {
  word = word.toLowerCase();
  return words.includes(word);
}

function check(guess) {
  const row = state.currentRow;
  

  let keyboard = document.getElementById("keyboard");
  const divs = keyboard.querySelectorAll("div");

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent;

    
    let currentColor;

    if (letter === state.choosenWord[i]) {
      box.classList.add("right");
      currentColor="right";
    } else if (state.choosenWord.includes(letter)) {
      box.classList.add("wrong");
      currentColor="wrong";
    } else {
      box.classList.add("empty");
      currentColor="empty";
    }

    colorKeyboard(divs,letter,currentColor);
  }


  function colorKeyboard(divs, currentChar,color) {
    divs.forEach(function (div) {
     
     if(div.innerHTML.toLowerCase() === currentChar){
      div.className ="key " + color
     }
    })

  }


  const isWinner = state.choosenWord === guess;
  const isLoser = state.currentRow === 5;

  let alertArea = document.getElementById("alertArea");
  let mainContent = document.getElementById("mainContent");
  if (isWinner) {
    alertArea.style.display = "block";
    alertArea.classList.add("success");
    alertArea.textContent = "Congratz!";
    mainContent.style.filter = "blur(1.5rem)";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  if (isLoser) {
    alertArea.style.display = "block";
    alertArea.classList.add("danger");
    alertArea.style.zIndex="10";
    alertArea.textContent = "Game Over!";
    mainContent.style.filter = "blur(1.5rem)";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

function isLetter(key) {
  return key.length === 1 && key.match(/[a-zA-Z]/i);
}

function addLetter(letter) {
  if (state.currentColumn === 5) return;
  state.grid[state.currentRow][state.currentColumn] = letter;
  state.currentColumn++;
}

function removeLetter() {
  if (state.currentColumn === 0) return;
  state.grid[state.currentRow][state.currentColumn - 1] = "";
  state.currentColumn--;
}

function createKeyboard() {

  const keyboard = document.getElementById("keyboard");
  for (let i = 0; i < keys.length; i++) {
    var key = document.createElement("div");
    key.id = "div" + i;
    key.className = "key";
    key.textContent = keys[i];
    key.addEventListener("click", function () {
      // console.log('clicked on key: ', keys[i])  this line was only for check if the function works.
      keyInfo = keys[i];
      addLetter(keyInfo);
      updateGrid();
    });
    keyboard.appendChild(key);
  }
}




function registerOnlineKeyboardEvents() {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      if (state.currentColumn === 5) {
        let word = getCurrentWord();


        if (isWordValid(word)) {
          check(word);
          state.currentRow++;
          state.currentColumn = 0;


        } else {
          alert("Not a valid word.");
          state.currentRow.classList.add("wrong");
          // there is a problem after the alert, program stops. i tied adding continue but gives error :()
        }
      }
    }
    if (key === "Backspace") {
      removeLetter();
    }
    if (isLetter(key)) {
      addLetter(key);
    }
    updateGrid();
  };
}

const slider = document.querySelector(".card-slider");
const sliderButtons = document.querySelectorAll(".slider-button");

let slideIndex = 0;

sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("slider-button-left")) {
      slideIndex--;
    } else if (button.classList.contains("slider-button-right")) {
      slideIndex++;
    }
    slider.style.transform = `translateX(-${slideIndex * 1350}px)`; // 710 is the width of each card including margin-right
  });
});

const navShow = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    links.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ``;
      } else {
        link.style.animation = `linksFade 0.5s ease forwards ${index / 5 + 0.2
          }s`;
      }
    });
  });
};

function startup() {

  const game = document.getElementById("game");
  const enterButton = document.getElementById("enter-button");
  enterButton.addEventListener("click", function () {
    if (state.currentColumn === 5) {
      let word = getCurrentWord();
      if (isWordValid(word)) {
        check(word);
        state.currentRow++;
        state.currentColumn = 0;
      } else {
        alert("Not a valid word.");
        state.currentRow.classList.add("wrong");
        // there is a problem after the alert, program stops. i tied adding continue but gives error :()
      }
    }
  });
  navShow();
  drawGrid(game);
  createKeyboard();
  registerKeyboardEvents();
}

document.addEventListener("DOMContentLoaded", function (event) {
  startup();
});








