import {Cell} from "../models/Models";

export function getDiagonals(matrix: Array<Array<Cell>>) {
	const numRows = matrix.length;
	const numCols = matrix[0].length;
	const mainDiagonal = [];
	const secondaryDiagonal = [];

	// Get coordinates of main diagonal
	for (let i = 0; i < Math.min(numRows, numCols); i++) {
		mainDiagonal.push(matrix[i][i]);
	}

	// Get coordinates of secondary diagonal
	for (let i = 0; i < Math.min(numRows, numCols); i++) {
		secondaryDiagonal.push(matrix[i][numCols - i - 1]);
	}

	return [mainDiagonal, secondaryDiagonal];
}

export const generateGrid = (size: number): Array<Array<Cell>> => {
	const result = [];
	for (let _row = 0; _row < size; _row++) {
		let row: Array<Cell> = new Array(size)
		result.push(row.fill(Cell.empty))
	}
	
	return result
}

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
}
