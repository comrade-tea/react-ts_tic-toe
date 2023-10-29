import type { FC } from 'react'
import React, { useCallback } from 'react'

import type { Cell } from '../models/Models'
import { CellState } from '../models/Models'

interface ICellGridItem {
  cell: Cell
  onClick: (cell: Cell) => void
  cellSize: string
}

export const CellGridItem: FC<ICellGridItem> = ({ cell, onClick, cellSize }) => {
  const cellStyles = ['flex', 'border', 'text-4xl', 'font-bold', 'transition-colors']
  const cellIsEmpty = cell.state === CellState.empty

  if (cellIsEmpty) {
    cellStyles.push('hover:bg-gray-100 cursor-pointer')
  } else {
    cellStyles.push('cursor-default')
  }

  const makeTurnHandler = useCallback(() => {
    onClick(cell)
  }, [cell, onClick])

  return (
    <button
      className={`cell ${cellStyles.join(' ')}`}
      style={{ flexBasis: cellSize }}
      onClick={makeTurnHandler}
      data-grid-cell={cell.isPinned && !cellIsEmpty ? 'pinned' : 'unpinned'}
      type="button"
    >
      <span className="block m-auto text-uppercase">{!cellIsEmpty && CellState[cell.state]}</span>
    </button>
  )
}
