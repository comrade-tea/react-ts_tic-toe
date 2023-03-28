export function getDiagonals(matrix: Array<Array<string>>) {
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
