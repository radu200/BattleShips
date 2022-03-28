import { useEffect, useState } from 'react';
import Cell from '../components/Cell'
import { generateBoard, placeShips, fire, getTotal, getGameStatus } from './helpers'
import "./index.css"
import * as types from '../types';
import * as enums from '../enum';

const ships = [
  {
    id: 1,
    name: 'Battleship',
    size: 5,
  },
  {
    id: 2,
    name: 'Destroyer',
    size: 4,
  },
  {
    id: 3,
    name: 'Destroyer',
    size: 4,
  },
];


interface IState {
  board: types.BattleShipBoard,
  gameStart: boolean,
  gameWon: boolean,
  totalMissed: number,
  totalHits: number,
  totalSunkShips: number
}

function Main() {
  const [state, setstate] = useState<IState>({
    board: [],
    gameStart: false,
    gameWon: false,
    totalMissed: 0,
    totalHits: 0,
    totalSunkShips: 0,
  })

  useEffect(() => {
    setstate(state => ({ ...state, board: generateBoard(enums.Board.width, enums.Board.height) }))
  }, [])


  useEffect(() => {

    if (state.gameWon) {
      setstate(state => ({ ...state, gameStart: false }))
    }
  }, [state.gameWon])

  function startGame() {
    const newBoard = generateBoard(enums.Board.width, enums.Board.height)
    const board = placeShips(newBoard, ships, enums.Board.width, enums.Board.height)

    setstate(state => ({
      ...state, board,
      totalMissed: 0,
      totalHits: 0,
      totalSunkShips: 0,
      gameWon: false,
      gameStart: true
    }))
  }


  function handleFire(rowIndex: number, colIndex: number) {
    if (state.gameStart) {
      const board = fire(state.board, rowIndex, colIndex)
      const { totalMissed, totalHits, totalSunkShips } = getTotal(board, ships);
      const gameStatus = getGameStatus(ships, totalSunkShips)
      setstate(state => ({ ...state, gameWon: gameStatus, board: board, totalMissed, totalHits, totalSunkShips }))
    }
  }

  return <div className="container">
    {state.gameWon ? <div>You won!</div> : null}
    <div>Missed: {state.totalMissed} Hitted: {state.totalHits} SunkShips: {state.totalSunkShips} </div>
    {state.board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-rows">
        {row.map((col, colIndex) => (
          <Cell gameStart={state.gameStart} key={colIndex} ship={col} onClick={() => handleFire(rowIndex, colIndex)} />
        ))}
      </div>
    ))}
    <button className={state.gameStart ? "button-start-game-disabled" : "button-start-game"} disabled={state.gameStart} onClick={startGame}>StartGame</button>
  </div>
}

export default Main;
