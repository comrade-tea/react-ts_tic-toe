import {Cell, CellState, TMatrix} from "../models/Models";

export function getDiagonals(matrix: TMatrix): TMatrix {
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

export const generateGrid = (size: number): TMatrix => {
    const result = []
    
    for (let x = 0; x < size; x++) {
        let row: Array<Cell> = []
        
        for (let y = 0; y < size; y++) {
            row.push({
                state: CellState.empty,
                coords: {x, y}
            })
        }
        result.push(row)
    }
    
    return result
}

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
}

export const checkSameSequance = (flatGrid: Cell[], stateToCheck: CellState): boolean => {
    return flatGrid.some((cell, index, _this) => {
        // console.log(`sequance cell: ${cell?.state} stateToCheck: ${stateToCheck}`);
        
        if (cell.state === stateToCheck) {
            const nextState = _this[index + 1]?.state
            const afterNextState = _this[index + 2]?.state

            // if (nextState === stateToCheck && afterNextState === stateToCheck) {
            //     console.info([cell.state, nextState, afterNextState])
            // }

            return nextState === stateToCheck && afterNextState === stateToCheck
        } else {
            return false
        }
    });
}
