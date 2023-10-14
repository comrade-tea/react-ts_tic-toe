import {Cell, TMatrix} from "../models/Models";

export function getDiagonals(matrix: TMatrix) {
	const numRows = matrix.length;
	const numCols = matrix[0].length;
	// @ts-ignore
	const diagonals = [];

	// Function to push a diagonal into the diagonals array
	// @ts-ignore
	function pushDiagonal(row, col, direction) {
		const diagonal = [];
		while (row >= 0 && row < numRows && col >= 0 && col < numCols) {
			diagonal.push(matrix[row][col]);
			row += direction[0];
			col += direction[1];
		}
		diagonals.push(diagonal);
	}

	// Iterate through the main diagonals from the top row
	for (let col = 0; col < numCols; col++) {
		pushDiagonal(0, col, [1, 1]);
	}

	// Iterate through the main diagonals from the left column
	for (let row = 1; row < numRows; row++) {
		pushDiagonal(row, 0, [1, 1]);
	}

	// Iterate through the secondary diagonals from the top row
	for (let col = 0; col < numCols; col++) {
		pushDiagonal(0, col, [1, -1]);
	}

	// Iterate through the secondary diagonals from the right column
	for (let row = 1; row < numRows; row++) {
		pushDiagonal(row, numCols - 1, [1, -1]);
	}

	// @ts-ignore
	return diagonals.filter(d => d.length > 2);
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

export const checkSameSequance = (array: number[], value: number, length = 3): boolean => {
	return array.some((el, index, _this) => {
		if (el === value) {
			const next = _this[index + 1];
			const afterNext = _this[index + 2];

			if (next === value && afterNext === value) {
				console.info([el, next, afterNext])
			}

			return next === value && afterNext === value
		} else {
			return false
		}
	});
}
