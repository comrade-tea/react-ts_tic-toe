import React, {Dispatch, FC, SetStateAction, useCallback} from "react";
import {clamp} from "../utils/utils";
import {IGameOptions, Players} from "../models/Models";
import {Button} from "react-bootstrap";
import LabelWrap from "./UI/labelWrap/LabelWrap";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IGameSettings {
	gameOptions: IGameOptions
	setGameOptions: Dispatcher<IGameOptions>
	resetGame: () => void
}

const GameSettings: FC<IGameSettings> = ({gameOptions, setGameOptions, resetGame}) => {
	const {gridSize, maxGridSize, minGridSize, firstPlayer} = gameOptions

	const onPlayerChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = +event.target.value;
		setGameOptions(prev => ({...prev, firstPlayer: value}))
	}, []);


	const gridChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setGameOptions(prev => {
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

	const PlayersList: string[] = Object
		.keys(Players)
		.filter(v => isNaN(+v))

	return (
		<div className={"fixed left-0 top-0 bg-gray-200 px-4 py-3 rounded"}>
			<h4 className={"mb-4"}>Game settings:</h4>
			
			<ul className={"list-unstyled flex flex-column gap-2"}>
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
					<LabelWrap labelText={"First player"}>
						<select className={"input"}
								  defaultValue={firstPlayer}
								  onChange={onPlayerChange}
						>
							{
								PlayersList.map(key => {
									const value = Players[(key as keyof typeof Players)]

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

			<Button className={"mt-4 w-100"} variant={"secondary"} type={"button"} onClick={resetGame}>
				Apply changes
			</Button>
		</div>
	)
}
export default GameSettings
