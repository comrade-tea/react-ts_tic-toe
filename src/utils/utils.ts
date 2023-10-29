import type { Cell, Players, TMatrix } from '../models/Models'
import { CellState } from '../models/Models'

export function getDiagonals(matrix: TMatrix): Cell[][] {
  const numRows: number = matrix.length
  const numCols: number = matrix[0].length

  // const diagonals: TMatrix[] = []
  const diagonals: Cell[][] = []
  
  // Function to push a diagonal into the diagonals array
  function pushDiagonal(row: number, col: number, direction: number[]) {
    const diagonal: unknown[] = []
    let _row = row
    let _col = col
    
    while (_row >= 0 && _row < numRows && _col >= 0 && _col < numCols) {
      diagonal.push(matrix[_row][_col])
      _row += direction[0]
      _col += direction[1]
    }
    diagonals.push(diagonal as Cell[])
  }

  // Iterate through the main diagonals from the top row
  for (let col = 0; col < numCols; col++) {
    pushDiagonal(0, col, [1, 1])
  }

  // Iterate through the main diagonals from the left column
  for (let row = 1; row < numRows; row++) {
    pushDiagonal(row, 0, [1, 1])
  }

  // Iterate through the secondary diagonals from the top row
  for (let col = 0; col < numCols; col++) {
    pushDiagonal(0, col, [1, -1])
  }

  // Iterate through the secondary diagonals from the right column
  for (let row = 1; row < numRows; row++) {
    pushDiagonal(row, numCols - 1, [1, -1])
  }

  return diagonals.filter(d => d.length > 2)
}

export const generateGrid = (size: number): TMatrix => {
  const result: TMatrix = []

  for (let x = 0; x < size; x++) {
    const row: Cell[] = []

    for (let y = 0; y < size; y++) {
      row.push({
        state: CellState.empty,
        coords: { x, y },
        isPinned: false,
      })
    }
    result.push(row)
  }

  return result
}

export const updatedGrid = (grid: TMatrix, cell: Cell, player: Players) => {
  const { x, y } = cell.coords
  const gridUpdated = Array.from(grid)
  gridUpdated[x][y].state = player

  return gridUpdated
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export const checkSameSequence = (flatGrid: Cell[], stateToCheck: CellState): boolean =>
  flatGrid.some((cell, index, _this) => {
    if (cell.state === stateToCheck) {
      const nextState = _this[index + 1]?.state
      const afterNextState = _this[index + 2]?.state

      return nextState === stateToCheck && afterNextState === stateToCheck
    }

    return false
  })

export function deepCloneArray<T>(array: T): T {
  return JSON.parse(JSON.stringify(array)) as T
}
