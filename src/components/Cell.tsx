import './Cell.css';
import * as types from '../types'
import * as enums from '../enum';


interface ICell {
  ship: types.BattleShip
  gameStart: boolean,
  onClick: React.MouseEventHandler<HTMLDivElement>
}

function getClassName(ship: types.BattleShip, gamesStart: boolean) {

  if (!gamesStart) {
    return "game-end"
  }

  if (ship.isShip && ship.status === enums.Status.hit) {
    return 'hitted-ship'
  }

  if (!ship.isShip && ship.status === enums.Status.missed) {
    return "missed"
  }

  return ""
}

export default function Cell({ ship, onClick, gameStart }: ICell) {
  return <div onClick={onClick} className="cell">
    <div className={getClassName(ship, gameStart)} ></div>
  </div>
}