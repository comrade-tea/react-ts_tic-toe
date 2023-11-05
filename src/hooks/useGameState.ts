import {useCallback, useEffect, useMemo, useState} from "react";

import type {Cell, GameState, Players, TMatrix} from "../models/Models";
import {CellState, GameProgress, playerO, playerX} from "../models/Models";
import {checkSameSequence, deepCloneArray, generateGrid, getDiagonals, updatedGrid} from "../utils/utils";

export const useGameState = ({firstPlayer, gridSize}: {
	firstPlayer: Players,
	gridSize: number
}) => {
	const initialState: GameState = useMemo(() => ({
		progress: GameProgress.inProgress,
		winner: null,
		winnerLine: null,
		currentPlayerTurn: firstPlayer,
		history: [],
		historyIndex: -1,
	}), [firstPlayer])

	const [gameState, setGameState] = useState<GameState>(initialState)

	const [grid, setGrid] = useState<TMatrix>(generateGrid(gridSize))

	const [modalActive, setModalActive] = useState<boolean>(false)

	const resetGame = useCallback((): void => {
		setGameState(initialState)
		setGrid(generateGrid(gridSize))
	}, [gridSize, initialState])

	const checkLineWinCondition = useCallback((chunk: Cell[]): void => {
			const PlayersArray: Players[] = [playerX, playerO]

			PlayersArray.forEach(playerId => {
				if (checkSameSequence(chunk, playerId)) {
					const gridAnimationPrepared = Array.from(grid)
					chunk
						.filter(cell => cell.state === playerId)
						.forEach(cell => {
							const {x, y} = cell.coords
							gridAnimationPrepared[x][y].isPinned = true
						})

					setGameState(prev => ({
						...prev,
						progress: GameProgress.isEnded,
						winner: playerId,
						winnerLine: chunk,
					}))

					setModalActive(true)
				}
			})
		},
		[grid]
	)

	const checkHorizontalLines = useCallback(
		(gridFlat: Cell[]): void => {
			const checkFromIndex: number[] = []

			for (let i = 0; i < gridSize; i++) {
				checkFromIndex.push(gridSize * i)
			}

			checkFromIndex.forEach(index => {
				const line = gridFlat.slice(index, index + gridSize)

				checkLineWinCondition(line)
			})
		},
		[checkLineWinCondition, gridSize]
	)

	const checkVerticalLines = useCallback(
		(arr: Cell[]): void => {
			const checkFromIndex: number[] = []

			for (let i = 0; i < gridSize; i++) {
				checkFromIndex.push(i)
			}

			checkFromIndex.forEach(checkIndex => {
				const line = arr
					.slice(checkIndex)
					.filter((value, index) => index % gridSize === 0)

				checkLineWinCondition(line)
			})
		},
		[checkLineWinCondition, gridSize]
	)

	const checkDiagonals = useCallback(
		(arr: TMatrix): void => {
			const diagonals: TMatrix = getDiagonals(arr)

			diagonals.forEach(line => {
				checkLineWinCondition(line)
			})
		},
		[checkLineWinCondition]
	)

	const cellClickHandler = useCallback(
		(cell: Cell): void => {
			const {x, y} = cell.coords

			if (grid[x][y]?.state === CellState.empty) {
				const gridAfterTurn = updatedGrid(grid, cell, gameState.currentPlayerTurn)
				const nextPlayer = gameState.currentPlayerTurn === playerX ? playerO : playerX

				setGameState(prev => ({
					...prev,
					currentPlayerTurn: nextPlayer,
					historyIndex: prev.historyIndex + 1,
					history: [
						...prev.history.slice(0, prev.historyIndex + 1),
						{x, y, gridMask: deepCloneArray(grid), playerMadeTurn: gameState.currentPlayerTurn},
					],
				}))

				setGrid(gridAfterTurn)
			}
		}, [gameState.currentPlayerTurn, grid])

	const historyClickHandler = useCallback(
		(gridHistoryMask: TMatrix, currentPlayerTurn: Players, historyIndex: number) => {
			setGrid(deepCloneArray<TMatrix>(gridHistoryMask))

			setGameState(prev => ({
				...prev,
				currentPlayerTurn,
				historyIndex,
			}))
		}, [])

	const hideModalAndReset = () => {
		setModalActive(false)
		resetGame()
	}

	/* effects ↓ */
	useEffect(() => {
		const gridFlat = grid.flat(1)

		checkHorizontalLines(gridFlat)
		checkVerticalLines(gridFlat)
		checkDiagonals(grid)

		const cellsAreFilled = gameState.history.length === gridFlat.length

		if (gameState.winner === null && cellsAreFilled) {
			setGameState(prev => ({...prev, progress: GameProgress.isEnded}))
			setModalActive(true);
		}

	}, [
		checkDiagonals,
		checkHorizontalLines,
		checkVerticalLines,
		gameState.history.length,
		gameState.winner,
		grid,
	])

	useEffect(() => {
			resetGame()
		}, [
			gridSize,
			initialState,
			resetGame]
	);
	/* effects ↑ */


	return {
		gameState,
		grid,
		historyClickHandler, cellClickHandler,
		modalActive,
		hideModalAndReset
	}
}
