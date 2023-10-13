import React, {Dispatch, FC, SetStateAction} from "react";
import {clamp} from "../utils/utils";
import {IGameOptions, Players} from "../models/Models";
import {Button} from "react-bootstrap";

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

interface IGameSettings {
	gameOptions: IGameOptions
	setGameOptions: Dispatcher<IGameOptions>
	resetGame: () => void
}

const GameSettings: FC<IGameSettings> = ({gameOptions, setGameOptions, resetGame}) => {
	const {gridSize, maxGridSize, minGridSize, firstPlayer} = gameOptions

	return (
		<div className={"fixed left-0 top-0 bg-yellow-200 py-2 px-4"}>
			<div className={""}>
				<h4>Game settings:</h4>

				<ul className={"list-unstyled flex flex-column gap-2"}>
					<li>
						<input
							minLength={1}
							step={1} type={"number"} min={minGridSize} max={maxGridSize}
							value={gridSize}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGameOptions(prev => {
								let newValue;
								
								if (e.target.valueAsNumber >= minGridSize && e.target.valueAsNumber <= maxGridSize) {
									newValue = e.target.valueAsNumber
								}
								else {
									const enteredNumber = e.target.value.charAt(1);
									newValue = +enteredNumber > 0 ? +enteredNumber : minGridSize
								}
								 
								return {
										...prev,
										gridSize: clamp(
											newValue,
											minGridSize,
											maxGridSize
										)
									}
								}
							)}
						/>
					</li>
					<li>
						<select defaultValue={firstPlayer}>
							{
								Object.keys(Players).filter(v => isNaN(Number(v)))
									.map((key, index) => {
										const value = Players[(key as keyof typeof Players)]
										return (
											<option key={key} value={value}>
												{key}
											</option>
										);
									})
							}
						</select>
					</li>
				</ul>

				<Button className={"mt-4"}
						  variant={"outline-info"}
						  type={"button"}
						  onClick={resetGame}>
					Apply changes
				</Button>
			</div>
		</div>
	)
}
export default GameSettings
