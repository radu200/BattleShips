import * as types from '../../types';
import * as enums from '../../enum';

export function generateBoard(
  boardWidth: number,
  boardHeight: number
): types.BattleShipBoard {
  const board: types.BattleShipBoard = [];
  for (let i = 0; i < boardWidth; i++) {
    board.push([]);
    for (let j = 0; j < boardHeight; j++) {
      board[i][j] = {
        isShip: false,
        status: '',
      };
    }
  }
  return board;
}

export function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

export function getRandomCoordinates(
  boardWidth: number,
  boardHeight: number
): {
  row: number;
  col: number;
} {
  let row = getRandomNumber(boardWidth - 1);
  let col = getRandomNumber(boardHeight - 1);
  return { row, col };
}

//check if random position is free
function checkIsFreeHoPositionHorizontal(
  board: types.BattleShipBoard,
  maxLengthIndex: number,
  shipSize: number,
  boardWidth: number,
  boardHeight: number
): {
  row: number;
  col: number;
} {
  const { row, col } = getRandomCoordinates(boardWidth, boardHeight);

  if (!board[row][col].isShip && maxLengthIndex >= col + shipSize) {
    let countPosition = col;
    let isAllowed = true;
    for (let i = 0; i < shipSize; i++) {
      if (board[row][countPosition].isShip) {
        isAllowed = false;
        break;
      }
      countPosition++;
    }

    if (isAllowed) {
      return { row, col };
    }
  }
  return checkIsFreeHoPositionHorizontal(
    board,
    maxLengthIndex,
    shipSize,
    boardWidth,
    boardHeight
  );
}

function checkIsFreePositionVertical(
  board: types.BattleShipBoard,
  maxLengthIndex: number,
  shipSize: number,
  boardWidth: number,
  boardHeight: number
): {
  row: number;
  col: number;
} {
  const { row, col } = getRandomCoordinates(boardWidth, boardHeight);

  if (!board[row][col].isShip && maxLengthIndex >= row + shipSize) {
    let countPosition = row;
    let isAllowed = true;
    for (let i = 0; i < shipSize; i++) {
      if (board[countPosition][col].isShip) {
        isAllowed = false;
        break;
      }
      countPosition++;
    }

    if (isAllowed) {
      return { row, col };
    }
  }
  return checkIsFreePositionVertical(
    board,
    maxLengthIndex,
    shipSize,
    boardWidth,
    boardHeight
  );
}

export function placeShips(
  board: types.BattleShipBoard,
  ships: types.Ships,
  boardWidth: number,
  boardHeight: number
) {

  for (let ship of ships) {
    const direction = getRandomNumber(2);
    if (direction === 0) {
      const maxHorizontalIndex = boardWidth - 1;
      const { row, col } = checkIsFreeHoPositionHorizontal(
        board,
        maxHorizontalIndex,
        ship.size,
        boardWidth,
        boardHeight
      );

      let count = col;
      for (let i = 0; i < ship.size; i++) {
        board[row][count] = {
          isShip: true,
          id: ship.id,
          name: ship.name,
          status: enums.Status.alive,
        };
        count++;
      }
    } else {
      const maxVerticallIndex = boardHeight - 1;
      const { row, col } = checkIsFreePositionVertical(
        board,
        maxVerticallIndex,
        ship.size,
        boardWidth,
        boardHeight
      );

      let count = row;
      for (let i = 0; i < ship.size; i++) {
        board[count][col] = {
          isShip: true,
          id: ship.id,
          name: ship.name,
          status: enums.Status.alive,
        };
        count++;
      }
    }
  }
  return board;
}

export function fire(
  board: types.BattleShipBoard,
  rowIndex: number,
  colIndex: number
): types.BattleShipBoard {
 
    if (board[rowIndex][colIndex].isShip) {
        board[rowIndex][colIndex].status = enums.Status.hit;
    } else {
        board[rowIndex][colIndex].status = enums.Status.missed;
    }
  return board;
}

export function getTotal(
  board: types.BattleShipBoard,
  ships: types.Ships
): {
  totalMissed: number;
  totalHits: number;
  totalSunkShips: number;
} {
  
  let totalMissed: number = 0;
  let totalHits: number = 0;
  let totalSunkShips: number = 0;
  let sunkShip: Record<number, number> = {};

  board.forEach((row) =>
    row.forEach((cell) => {
      if (cell.status === enums.Status.missed) {
        totalMissed += 1;
      }

      if (cell.status === enums.Status.hit) {
        totalHits += 1;
        if (cell.id) {
          if (!sunkShip[cell.id]) {
            sunkShip[cell.id] = 1;
          } else {
            sunkShip[cell.id] += 1;
          }
        }
      }
    })
  );

  ships.forEach((ship) => {
    if (sunkShip[ship.id] && sunkShip[ship.id] === ship.size) {
      totalSunkShips += 1;
    }
  });

  return { totalMissed, totalHits, totalSunkShips };
}

export function getGameStatus(ships: types.Ships, totalSunkShips: number) {
  return ships.length <= totalSunkShips;
}
