export enum Cell {empty=0, x=1, o=2}

export enum Players {
	x = Cell.x,
	o = Cell.o
}

export interface IHistoryRecord {
	x: number,
	y: number,
	nextPlayer: Players
	gridMask: Array<Array<Cell>>
}

export interface IGameOptions {
	gridSize: number
	minGridSize: number
	maxGridSize: number
	firstPlayer: Players
}
