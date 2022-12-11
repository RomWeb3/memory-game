// Start game menu
const numbersBtn = document.querySelector(".numbers");
const iconsBtn = document.querySelector(".icons");
const onePlayerBtn = document.querySelector(".one-player");
const twoPlayersBtn = document.querySelector(".two-players");
const threePlayersBtn = document.querySelector(".three-players");
const fourPlayersBtn = document.querySelector(".four-players");
const grid4Btn = document.querySelector(".grid-4");
const grid6Btn = document.querySelector(".grid-6");
const startGameBtn = document.querySelector(".start-game");
const gameStartScreen = document.querySelector(".game-start");
const gameScreen = document.querySelector(".game");

function startGame(btn1, btn2) {
  btn1.addEventListener("click", () => {
    btn1.classList.add("checked");
    btn2.classList.remove("checked");
  });
}

function numbersOfPlayers(btn1, btn2, btn3, btn4) {
  btn1.addEventListener("click", () => {
    btn1.classList.add("checked");
    btn2.classList.remove("checked");
    btn3.classList.remove("checked");
    btn4.classList.remove("checked");
  });
}

startGame(numbersBtn, iconsBtn);
startGame(iconsBtn, numbersBtn);
numbersOfPlayers(onePlayerBtn, twoPlayersBtn, threePlayersBtn, fourPlayersBtn);
numbersOfPlayers(twoPlayersBtn, onePlayerBtn, threePlayersBtn, fourPlayersBtn);
numbersOfPlayers(threePlayersBtn, onePlayerBtn, twoPlayersBtn, fourPlayersBtn);
numbersOfPlayers(fourPlayersBtn, onePlayerBtn, twoPlayersBtn, threePlayersBtn);
startGame(grid4Btn, grid6Btn);
startGame(grid6Btn, grid4Btn);

startGameBtn.addEventListener("click", () => {
  if (numbersBtn.classList.contains("checked")) {
    gameScreen.classList.add("numbers");
  } else {
    gameScreen.classList.add("icons");
  }
  if (grid4Btn.classList.contains("checked")) {
    gameScreen.classList.add("grid-4");
  } else {
    gameScreen.classList.add("grid-6");
  }
  newGame();
  gameStartScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
});

//Menu mobile in game
const modalMenu = document.querySelector(".modal-menu");
const modalSoloGameOver = document.querySelector(".modal-solo-game-over");
const menuBtn = document.querySelector(".menu-btn");
const restartBtn = document.querySelectorAll(".restart");
const newGameBtn = document.querySelectorAll(".new-game");
const resumeGameBtn = document.querySelector("#resume-game");
const gameBody = document.querySelector(".body");

menuBtn.addEventListener("click", () => {
  modalMenu.classList.remove("hidden");
});

restartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalMenu.classList.add("hidden");
    modalSoloGameOver.classList.add("hidden");
    reset();
    generateRandomNumbers();
  });
});

newGameBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalMenu.classList.add("hidden");
    modalSoloGameOver.classList.add("hidden");
    gameStartScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    gameScreen.classList.remove("grid-4");
    gameScreen.classList.remove("grid-6");
    reset();
    removeCards();
  });
});

resumeGameBtn.addEventListener("click", () => {
  modalMenu.classList.add("hidden");
});

//Generate cards
function createCards() {
  if (gameScreen.classList.contains("grid-4")) {
    for (let i = 0; i < 4; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      gameBody.appendChild(row);
    }
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      for (let i = 0; i < 4; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        row.appendChild(card);
      }
    });
  } else if (gameScreen.classList.contains("grid-6")) {
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      gameBody.appendChild(row);
    }
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
      for (let i = 0; i < 6; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        row.appendChild(card);
        card.style.width = "4.69rem";
        card.style.height = "4.69rem";
        card.style.fontSize = "2.4rem";
        card.style.lineHeight = "3rem";
      }
    });
  }
}

function removeCards() {
  const rows = document.querySelectorAll(".row");
  rows.forEach((row) => {
    row.remove();
  });
}

function generateRandomNumbers() {
  const cards = document.querySelectorAll(".card");
  let ArrayOf4Cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  let ArrayOf6Cards = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
    12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
  ];
  const isGrid4 = gameScreen.classList.contains("grid-4");

  if (isGrid4) {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf4Cards.length);
      const p = document.createElement("p");
      p.textContent = ArrayOf4Cards[randomNumber];
      ArrayOf4Cards.splice(randomNumber, 1);
      card.appendChild(p);
    });
  } else {
    cards.forEach((card) => {
      let randomNumber = Math.floor(Math.random() * ArrayOf6Cards.length);
      const p = document.createElement("p");
      p.textContent = ArrayOf6Cards[randomNumber];
      ArrayOf6Cards.splice(randomNumber, 1);
      card.appendChild(p);
    });
  }
}

function generateRandomIcons() {
  const cards = document.querySelectorAll(".card");
  let ArrayOf4Icons = [
    "car-side",
    "car-side",
    "football",
    "football",
    "moon",
    "moon",
    "star",
    "star",
    "snowflake",
    "snowflake",
    "cloud",
    "cloud",
    "bug",
    "bug",
    "heart",
    "heart",
  ];
  let ArrayOf6Icons = [];

  cards.forEach((card) => {
    let randomNumber = Math.floor(Math.random() * ArrayOf4Icons.length);
    const i = document.createElement("i");
    i.classList.add("fa-solid", `fa-${ArrayOf4Icons[randomNumber]}`);
    ArrayOf4Icons.splice(randomNumber, 1);
    card.appendChild(i);
  });
}

//Game logic
const movesPlayed = document.querySelector(".moves-played");
const timeElapsed = document.querySelector(".chrono");
const movesTotal = document.querySelector(".moves-total");
let moves = 0;

function game() {
  const cards = document.querySelectorAll(".card");
  let flippedCards = [];

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      launchChrono();
      card.classList.add("flip");
      flippedCards.push(card);
      const NumberOfCardsFlipped = document.querySelectorAll(".flip").length;
      const cardsFlipped = document.querySelectorAll(".flip");
      const cardsNumbers = document.querySelectorAll(".card p");
      cardsNumbers.forEach((cardNumber) => {
        if (
          NumberOfCardsFlipped === 2 &&
          flippedCards[0].children[0].innerHTML ===
            flippedCards[1].children[0].innerHTML
        ) {
          cardsFlipped.forEach((card) => {
            card.classList.add("matched");
            card.matched = true;
          });
        }
      });

      const cardsIcons = document.querySelectorAll(".card i");
      cardsIcons.forEach((cardIcon) => {
        if (
          gameScreen.classList.contains("icons") &&
          NumberOfCardsFlipped === 2 &&
          flippedCards[0].children[0].classList[1] ===
            flippedCards[1].children[0].classList[1]
        ) {
          cardsFlipped.forEach((card) => {
            card.classList.add("matched");
            card.matched = true;
          });
        }
      });

      if (NumberOfCardsFlipped >= 2) {
        moves++;
        movesPlayed.textContent = moves;
        cardsFlipped.forEach((card) => {
          setTimeout(() => {
            card.classList.remove("flip");
            flippedCards = [];
          }, 600);
        });
      }
    });
  });
}

const chrono = document.querySelector(".timer");
let interval;
let min = 0;
let sec = 1;
let done = false;

function launchChrono() {
  if (!done) {
    done = true;
    interval = setInterval(function () {
      chrono.innerHTML = `${min}:${sec <= 9 ? "0" + sec : sec}`;
      sec++;
      if (sec === 60) {
        min++;
        sec = 0;
      }
    }, 1000);
  }
}

function stopChrono() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const matchedCards = document.querySelectorAll(".matched").length;
      if (matchedCards === 16 && gameScreen.classList.contains("grid-4")) {
        clearInterval(interval);
        timeElapsed.innerHTML = chrono.innerHTML;
        movesTotal.innerHTML = movesPlayed.innerHTML + " Moves";
        setTimeout(() => {
          modalSoloGameOver.classList.remove("hidden");
        }, 200);
      } else if (
        matchedCards === 36 &&
        gameScreen.classList.contains("grid-6")
      ) {
        clearInterval(interval);
        timeElapsed.innerHTML = chrono.innerHTML;
        movesTotal.innerHTML = movesPlayed.innerHTML + " Moves";
        setTimeout(() => {
          modalSoloGameOver.classList.remove("hidden");
        }, 200);
      }
    });
  });
}

function reset() {
  const cards = document.querySelectorAll(".card");
  moves = 0;
  movesPlayed.textContent = moves;
  min = 0;
  sec = 1;
  chrono.innerHTML = `0:00`;
  clearInterval(interval);
  done = false;
  cards.forEach((card) => {
    card.innerHTML = "";
    card.classList.remove("flip");
    card.classList.remove("matched");
    card.matched = false;
  });
}

function newGame() {
  createCards();
  generateRandomIcons();
  game();
  stopChrono();
}
