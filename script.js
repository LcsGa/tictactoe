let numberOfTurns = 0;
const everyCells = document.querySelectorAll(".cell");
const score = document.querySelectorAll(".score");
const endGameDisplay = document.querySelector(".end-game");
const endGameMsg = document.querySelector(".end-game h2");
const players = document.querySelectorAll(".player");
const playerSettings = document.querySelector(".players-settings");
const gamePage = document.querySelector(".game-page");
const playerName = document.querySelectorAll(".players-settings input");
const playerNameInGame = document.querySelectorAll(".player h2");
const playerInputs = document.querySelectorAll("input");

const game = {
  cells: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],

  play: function (cell) {
    switch (cell.id) {
      case "top-left": {
        this.playerAction(cell, 0, 0);
        break;
      }
      case "top-middle": {
        this.playerAction(cell, 0, 1);
        break;
      }
      case "top-right": {
        this.playerAction(cell, 0, 2);
        break;
      }
      case "middle-left": {
        this.playerAction(cell, 1, 0);
        break;
      }
      case "middle-middle": {
        this.playerAction(cell, 1, 1);
        break;
      }
      case "middle-right": {
        this.playerAction(cell, 1, 2);
        break;
      }
      case "bottom-left": {
        this.playerAction(cell, 2, 0);
        break;
      }
      case "bottom-middle": {
        this.playerAction(cell, 2, 1);
        break;
      }
      case "bottom-right": {
        this.playerAction(cell, 2, 2);
        break;
      }
      default: {
        break;
      }
    }
    this.verifyVictory();
  },

  playerAction: function (cell, row, col) {
    if (!this.cells[row][col]) {
      if (this.player.active[0] === true) {
        this.playerActionSub(cell, 0, "0.2", "1", row, col, "X");
      } else {
        this.playerActionSub(cell, 1, "1", "0.2", row, col, "O");
      }
    }
  },

  playerActionSub: function (
    cell,
    playerNb,
    player1Style,
    player2Style,
    row,
    col,
    symbol
  ) {
    for (let status of this.player.active) {
      status = !status;
    }
    this.player.active[0] = !this.player.active[0];
    this.player.active[1] = !this.player.active[1];
    cell.innerHTML = this.player.symbol[playerNb];
    players[0].style.opacity = player1Style;
    players[1].style.opacity = player2Style;
    numberOfTurns++;
    this.cells[row][col] = symbol;
  },

  player: {
    name: ["Joueur 1", "Joueur 2"],
    symbol: [
      `<i class="cross" style="background: blue"></i><i class="cross-2" style="background: blue"></i>`,
      `<i class="circle" style="border-color: red"></i>`,
    ],
    score: [0, 0],
    active: [true, false],
  },

  doesOneWin: false,

  verifyVictory: function () {
    if (numberOfTurns >= 5) {
      for (let i = 0; i < 3; i++) {
        this.isVictory(i, 0, i, 1, i, 2);
        this.isVictory(0, i, 1, i, 2, i);
      }
      this.isVictory(0, 0, 1, 1, 2, 2);
      this.isVictory(0, 2, 1, 1, 2, 0);
      if (numberOfTurns === 9 && this.doesOneWin === false) {
        this.endGameAlert();
      }
    }
  },

  isVictory: function (r1, c1, r2, c2, r3, c3) {
    if (
      this.cells[r1][c1] !== "" &&
      this.cells[r1][c1] === this.cells[r2][c2] &&
      this.cells[r2][c2] === this.cells[r3][c3]
    ) {
      this.doesOneWin = true;
      this.addScore(this.whichPlayerWon(this.cells[r1][c1]));
      this.endGameAlert(this.cells[r1][c1]);
    }
  },

  // A chaque clic dans une cellule, on vérifie la victoire d'un des deux joueur.
  // Le code ci-dessous vérifie au même moment lequel des deux à marqué un point :
  whichPlayerWon: function (cellSymbol) {
    return cellSymbol === "X" ? this.player.name[0] : this.player.name[1];
  },

  addScore: function (victorous) {
    victorous === this.player.name[0]
      ? this.player.score[0]++
      : this.player.score[1]++;
    for (let i = 0; i < 2; i++) {
      score[i].innerHTML = this.player.score[i];
    }
  },

  initialiseGame: function () {
    for (let cell of everyCells) {
      cell.innerHTML = "";
    }
    for (let row of this.cells) {
      row.forEach((symbol, index) => (row[index] = ""));
    }
    this.doesOneWin = false;
    endGameDisplay.style.display = "none";
    numberOfTurns = 0;
  },

  endGameAlert: function (cellSymbol) {
    endGameDisplay.style.display = "flex";
    if (this.doesOneWin === false && numberOfTurns === 9) {
      endGameMsg.innerHTML = "Match nul !";
    } else {
      endGameMsg.innerHTML = `${this.whichPlayerWon(
        cellSymbol
      )} à gagné la partie !`;
    }
  },
};

const showGame = () => {
  playerSettings.style.display = "none";
  gamePage.style.display = "flex";
};

const addSettings = () => {
  for (let i = 0; i < 2; i++) {
    if (playerName[i].value) {
      game.player.name[i] = playerName[i].value;
      playerNameInGame[i].innerHTML = game.player.name[i];
    }
  }
  showGame();
};

window.onkeyup = (e) => {
  if (e.keyCode === 13) {
    if (playerInputs[0].value) {
      playerInputs[1].focus();
    }
    if (playerInputs[1].value) {
      addSettings();
    }
  }
};
