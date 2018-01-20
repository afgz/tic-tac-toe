const readline = require('readline');

class Game {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  start() {
    this.rl.question('Enter game state: ', state => {
      let pattern = /^[xo-]{9}$/i;
      if (!pattern.test(state)) {
        console.log('Invalid input');
        this.rl.close();
      } else if (state.indexOf('-') >= 0) {
        console.log('Game still in progress!');
        this.rl.close();
      }

      let grid = new Grid(state);
      let gridResult = grid.getResult();

      if (gridResult.length < 1) {
        console.log('Game draw!');
      } else if (gridResult.length > 1) {
        console.log('Invalid game board');
      } else {
        console.log(`${gridResult[0]} wins!`);
      }
      this.rl.close();
    });
  }
}

class Grid {
  constructor(state) {
    this.elements = {};

    this.columnsPosition = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    this.rowsPosition = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    this.diagonalsPosition = [[0, 4, 8], [2, 4, 6]];

    this.elements.columns = this.setElements(state, this.columnsPosition);
    this.elements.rows = this.setElements(state, this.rowsPosition);
    this.elements.diagonals = this.setElements(state, this.diagonalsPosition);
    this.result = this.setResult();
  }

  setElements(state, elementsPosition) {
    let elements = [];
    for (let elementPosition of elementsPosition) {
      let element = [];
      for (let position of elementPosition) {
        element.push(state[position]);
      }
      elements.push(element);
    }
    return elements;
  }

  setResult() {
    let result = [];
    for (let element of Object.values(this.elements)) {
      for (let value of element) {
        let elementResult = value.reduce((a, b) => (a === b ? a : null));
        if (elementResult !== null) {
          result.push(elementResult);
        }
      }
    }
    return result;
  }

  getColumns() {
    return this.elements.columns;
  }

  getRows() {
    return this.elements.rows;
  }

  getDiagonals() {
    return this.elements.diagonals;
  }

  getResult() {
    return this.result;
  }
}

let game = new Game();
game.start();
