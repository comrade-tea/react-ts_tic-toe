export type TMatrix = Array<Array<Cell>>
export interface GameState {
    progress: GameProgress
    winner: Players | null
    winnerLine?: Cell[] | null
    currentPlayerTurn: Players
    history: Array<IHistoryRecord>
    historyIndex: number
}

export enum GameProgress {
    inProgress, isEnded
}

export enum CellState {empty, x, o}

export type Cell = {
    state: CellState,
    coords: { x: number, y: number }
    isPinned: boolean;
}


export type Players = typeof playerX | typeof playerO;

export const playerX: CellState = CellState.x
export const playerO: CellState = CellState.o


export interface IHistoryRecord {
    x: number,
    y: number,
    nextPlayer: CellState
    gridMask: TMatrix
}

export interface IGameOptions {
    gridSize: number
    minGridSize: number
    maxGridSize: number
    firstPlayer: CellState
}
