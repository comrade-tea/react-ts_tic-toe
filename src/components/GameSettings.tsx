import React, {Dispatch, FC, SetStateAction, useCallback, useState} from "react";
import {clamp} from "../utils/utils";
import {CellState, IGameOptions, playerO, playerX} from "../models/Models";
import {Button} from "react-bootstrap";
import LabelWrap from "./UI/labelWrap/LabelWrap";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IGameSettings {
	gameOptions: IGameOptions
	setGameOptions: Dispatcher<IGameOptions>
}

const GameSettings: FC<IGameSettings> = ({gameOptions, setGameOptions}) => {
	const [localOptions, setLocalOptions] = useState<IGameOptions>({...gameOptions})
	const {gridSize, maxGridSize, minGridSize, firstPlayer} = localOptions

	const onPlayerChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = +event.target.value;
		setLocalOptions(prev => ({...prev, firstPlayer: value}))
	}, []);

	
	const gridChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalOptions(prev => {
				let newValue: number;

				if (e.target.valueAsNumber >= minGridSize && e.target.valueAsNumber <= maxGridSize) {
					newValue = e.target.valueAsNumber
				} else {
					const enteredNumber = e.target.value.charAt(1);
					newValue = +enteredNumber > 0 ? +enteredNumber : minGridSize
				}

				return {...prev, gridSize: clamp(newValue, minGridSize, maxGridSize)}
			}
		)
	}, []);

	const PlayersList: string[] = [CellState[playerX], CellState[playerO]]

	const optionsAreEqual = gameOptions.gridSize === localOptions.gridSize && gameOptions.firstPlayer === localOptions.firstPlayer;
	
	return (
		<div className={"fixed left-0 top-0 bg-gray-200 px-4 py-3 rounded"}>
			<h4 className={"mb-4"}>Game settings:</h4>
			
			<ul className={"list-unstyled flex flex-column gap-3"}>
				<li>
					<LabelWrap labelText={"Grid size (from 3 to 6):"}>
						<input className={"input"}
								 type={"number"} min={minGridSize} max={maxGridSize}
								 value={gridSize}
								 onChange={gridChangeHandler}
						/>
					</LabelWrap>
				</li>

				<li>
					<LabelWrap labelText={"First player:"}>
						<select className={"input"}
								  defaultValue={firstPlayer}
								  onChange={onPlayerChange}
						>
							{
								PlayersList.map(key => {
									const value = CellState[(key as keyof typeof CellState)]

									return (
										<option key={key} value={value}>
											{key}
										</option>
									);
								})
							}
						</select>
					</LabelWrap>
				</li>
			</ul>
			
			<Button className={"mt-4 w-100"}
					  variant={optionsAreEqual ? "secondary" : "success"}
					  type={"button"}
					  onClick={() => setGameOptions({...localOptions})}
					  disabled={optionsAreEqual}
			>
				Submit changes
			</Button>
		</div>
	)
}
export default GameSettings
