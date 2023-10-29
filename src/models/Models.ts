export type TMatrix = Cell[][]
export interface GameState {
  progress: GameProgress
  winner: Players | null
  winnerLine?: Cell[] | null
  currentPlayerTurn: Players
  history: IHistoryRecord[]
  historyIndex: number
}

export enum GameProgress {
  inProgress,
  isEnded,
}

export enum CellState {
  empty,
  x,
  o,
}

export interface Cell {
  state: CellState
  coords: { x: number; y: number }
  isPinned: boolean
}

export type Players = typeof playerX | typeof playerO

export const playerX: CellState = CellState.x
export const playerO: CellState = CellState.o

export interface IHistoryRecord {
  x: number
  y: number
  playerMadeTurn: Players
  gridMask: TMatrix
}

export interface IGameOptions {
  gridSize: number
  minGridSize: number
  maxGridSize: number
  firstPlayer: Players
}
