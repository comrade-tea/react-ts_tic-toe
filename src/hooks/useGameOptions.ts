import {useState} from "react";

import type {IGameOptions, Players} from "../models/Models";
import {playerX} from "../models/Models";


export const useGameOptions = (): {
	gameOptions: IGameOptions,
	setGridSize: (value: number) => void,
	setFirstPlayer: (player: Players) => void,
} => {

	const [gameOptions, setGameOptions] = useState<IGameOptions>({
		gridSize: 3,
		firstPlayer: playerX,
	})

	function setGridSize(value: number): void {
		setGameOptions(prev => ({...prev, gridSize: value}))
	}

	function setFirstPlayer(player: Players): void {
		setGameOptions(prev => ({...prev, firstPlayer: player}))
	}

	return {gameOptions, setGridSize, setFirstPlayer}
}
