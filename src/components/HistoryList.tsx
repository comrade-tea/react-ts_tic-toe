import type {FC} from 'react'
import {Button} from 'react-bootstrap'
import {uid} from 'react-uid'

import type {IHistoryRecord, TMatrix} from '../models/Models'
import {CellState, playerO, playerX} from '../models/Models'

interface HistoryListProps {
	historyList: IHistoryRecord[]
	historyIndex: number

	clickHandler: (gridMask: TMatrix, player: number, index: number) => void
}

export const HistoryList: FC<HistoryListProps> = ({historyList, historyIndex, clickHandler}) => {
	if (historyList.length === 0) {
		return <i>no records</i>
	}

	return (
		<ol className="ps-0">
			{historyList.map((turn, index) => {
				const {x, y, gridMask, playerMadeTurn} = turn
				const currentItem = historyIndex === index

				const nextPlayerTurn = playerMadeTurn === playerX ? playerO : playerX

				const historyJumpHandler = () => {
					clickHandler(gridMask, nextPlayerTurn, index)
				}

				return (
					<li key={uid(index)} className="flex align-items-center mt-3 list-decimal list-inside">
						{/* eslint-disable-next-line react/jsx-no-bind */}
						<Button variant={currentItem ? 'dark' : 'light'} onClick={historyJumpHandler}>
						  <span className="select-none text-sm sm:text-base text-nowrap">
							 Turn of player &quot;{CellState[playerMadeTurn]}&ldquo;; coords: x={x}, y={y}
						  </span>
						</Button>

						{currentItem ? <span className="text-3xl ms-2">←</span> : null}
					</li>
				)
			})}
		</ol>
	)
}
