import type {Dispatch, FC, SetStateAction} from 'react'
import React, {useCallback, useState} from 'react'
import {Button} from 'react-bootstrap'

import type {IGameOptions, Players} from '../models/Models'
import {CellState, playerO, playerX} from '../models/Models'
import {clamp} from '../utils/utils'
import {LabelWrap} from './UI/labelWrap/LabelWrap'

interface IGameSettings {
	gameOptions: IGameOptions
	minGridSize: number,
	maxGridSize: number,
	setGridSize: (value: number) => void,
	setFirstPlayer: (player: Players) => void,
}

export const GameSettings: FC<IGameSettings> =
	({
		 gameOptions,
		 minGridSize = 3,
		 maxGridSize = 6,
		 setGridSize,
		 setFirstPlayer
	 }) => {

		const [localOptions, setLocalOptions] = useState<IGameOptions>({...gameOptions})
		const {gridSize, firstPlayer} = localOptions

		const onPlayerChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
			const value = Number(event.target.value)
			setLocalOptions(prev => ({...prev, firstPlayer: value}))
		}, [])

		const gridChangeHandler = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setLocalOptions(prev => {
					let newValue: number

					if (e.target.valueAsNumber >= minGridSize && e.target.valueAsNumber <= maxGridSize) {
						newValue = e.target.valueAsNumber
					} else {
						const enteredNumber = e.target.value.charAt(1)
						newValue = Number(enteredNumber) > 0 ? Number(enteredNumber) : minGridSize
					}

					return {...prev, gridSize: clamp(newValue, minGridSize, maxGridSize)}
				})
			},
			[maxGridSize, minGridSize]
		)

		const PlayersList: string[] = [CellState[playerX], CellState[playerO]]

		const optionsAreEqual = gameOptions.gridSize === gridSize && gameOptions.firstPlayer === firstPlayer

		const submitChanges = useCallback(() => {
			setGridSize(gridSize)
			setFirstPlayer(firstPlayer)
		}, [firstPlayer, gridSize, setFirstPlayer, setGridSize])

		return (
			<div className="md:absolute right-0 top-0 bg-gray-200 px-4 py-4 rounded mb-20">
				<h4 className="mb-4">Game settings:</h4>

				<ul className="list-unstyled flex flex-column gap-3">
					<li>
						<LabelWrap labelText="Grid size (from 3 to 6):">
							<input className="input"
									 min={minGridSize}
									 max={maxGridSize}
									 value={gridSize}
									 onChange={gridChangeHandler}
									 type="number"
							/>
						</LabelWrap>
					</li>

					<li>
						<LabelWrap labelText="First player turn:">
							{/* eslint-disable-next-line jsx-a11y/no-onchange */}
							<select className="input" defaultValue={firstPlayer} onChange={onPlayerChange}>
								{PlayersList.map(key => {
									const value = CellState[key as keyof typeof CellState]
									return <option key={key} value={value}>{key}</option>
								})}
							</select>
						</LabelWrap>
					</li>
				</ul>

				<div className="mt-4 w-100">
					<Button
						variant={optionsAreEqual ? 'secondary' : 'success'}
						onClick={submitChanges}
						disabled={optionsAreEqual}
						type="button"
					>
						Submit changes
					</Button>
				</div>
			</div>
		)
	}
