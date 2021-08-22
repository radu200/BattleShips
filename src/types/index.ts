export interface BattleShip {
  isShip: boolean;
  id?: number;
  name?: string;
  status: string;
}

export type BattleShipBoard = Array<Array<BattleShip>>;
export type Ships = Array<{ name: string; size: number; id: number }>;
