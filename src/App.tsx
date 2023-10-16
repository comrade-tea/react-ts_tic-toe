import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from 'react';
import {checkSameSequance, generateGrid, getDiagonals} from "./utils/utils";
import {ResultModal} from "./components/ResultModal"
import {Cell, GameState, IGameOptions, IHistoryRecord, Players, TMatrix} from "./models/Models";
import {HistoryList} from "./components/HistoryList";
import CellGrid from "./components/CellGrid";
import Todo from "./components/Todo";
import GameSettings from "./components/GameSettings";


function App() {
	const [gameOptions, setGameOptions] = useState<IGameOptions>({
		gridSize: 3,
		minGridSize: 3,
		maxGridSize: 6,
		firstPlayer: Players.x
	})

	const [gameState, setGameState] = useState<GameState>(GameState.inProgress)

	const [winner, setWinner] = useState<Players | null>(null);
	const [modelActive, setModalActive] = useState<boolean>(false);

	const [grid, setGrid] = useState<TMatrix>(generateGrid(gameOptions.gridSize));
	const [currentPlayerTurn, setCurrentPlayerTurn] = useState<Players>(gameOptions.firstPlayer);

	const [history, setHistory] = useState<Array<IHistoryRecord>>([]);
	const [historyIndex, setHistoryIndex] = useState<number>(-1);

	useEffect(() => {
			const flat = grid.flat(1);

			checkHorizontal(flat);
			checkVertical(flat);
			checkDiagonals(grid);

			const cellsAreFilled = history.length === grid.flat(1).length;

			if (winner === null && cellsAreFilled) {
				setModalActive(true);
				setGameState(GameState.isEnded)
			}
		}, [grid],
	);

	useEffect(() => {
		resetGame()
	}, [gameOptions]);


	function resetGame() {
		setGrid(generateGrid(gameOptions.gridSize))
		setCurrentPlayerTurn(gameOptions.firstPlayer)
		setGameState(GameState.inProgress)
		setWinner(null)
		setHistory([])
		setHistoryIndex(-1)
	}

	const hideWinnerHandler = () => {
		setModalActive(false);
		resetGame();
	}

	const showWinnerHandler = () => setModalActive(true);

	function checkWinCondition(chunk: Cell[]): void {
		const PlayersArray = Object.values(Players);

		PlayersArray.forEach(playerId => {
			if (checkSameSequance(chunk, +playerId)) {
				setWinner(+playerId)
				showWinnerHandler()
				setGameState(GameState.isEnded)
			}
		})
	}

	function checkHorizontal(arr: Cell[]): void {
		const checkFromIndex: number[] = []

		for (let i = 0; i < gameOptions.gridSize; i++) {
			checkFromIndex.push(gameOptions.gridSize * i)
		}
		//  console.log("--horizontal indexes ✔--", checkFromIndex)

		checkFromIndex.forEach(index => {
			const line = arr.slice(index, index + gameOptions.gridSize);

			checkWinCondition(line);
		})
	}

	function checkVertical(arr: Cell[]): void {
		const checkFromIndex: number[] = []

		for (let i = 0; i < gameOptions.gridSize; i++) {
			checkFromIndex.push(i)
		}
		// console.log("--vertical--", checkFromIndex)

		checkFromIndex.forEach(checkIndex => {
			const line = arr
				.slice(checkIndex)
				.filter((value, index) => index % gameOptions.gridSize === 0)

			checkWinCondition(line)
		})
	}

	function checkDiagonals(arr: TMatrix): void {
		const diagonals = getDiagonals(arr);
		// console.log("--diagonaaals--", diagonals)

		diagonals.forEach(line => checkWinCondition(line))
	}


	const updatedGrid = (rowIndex: number, columnIndex: number, newValue: any) => {
		const newArray = [...grid]; // Create a copy of the array using the spread operator
		newArray[rowIndex][columnIndex] = newValue; // Update the nested array

		return newArray;
	};

	function getNextPlayer(historyPlayer?: Players): Players {
		if (historyPlayer) {
			return historyPlayer === Players.x ? Players.o : Players.x;
		}

		return currentPlayerTurn === Players.x ? Players.o : Players.x;
	}
	
	const cellClickHandler = (x: number, y: number): void => {
		if (grid[x][y] === Cell.empty) {
			const newGrid = updatedGrid(x, y, currentPlayerTurn);
			const nextPlayer = getNextPlayer();
			setGrid(newGrid)
			setCurrentPlayerTurn(nextPlayer)

			setHistoryIndex(prev => prev + 1);
			setHistory(prev => [...prev.slice(0, historyIndex + 1), {
				x, y, gridMask: grid.map(item => [...item]), nextPlayer
			}])
		}
	}

	const historyHandler = (gridMask: Array<Array<Cell>>, player: Players, index: number) => {
		setGrid(gridMask);
		setCurrentPlayerTurn(player);
		setHistoryIndex(index);
	};

	return (
		<>
			<Todo items={[
				"win 'stay line' animation",
				"online mode? huh? websocket?"
			]}/>

			<GameSettings gameOptions={gameOptions} setGameOptions={setGameOptions} resetGame={resetGame}/>

			<div className={"container-sm pt-[100px]"}>
				<div className={"grid grid-cols-2"}>
					<div className={"leftbar"}>
						<h3>
							Player <b className={"font-bold text-uppercase"}>"{Players[currentPlayerTurn]}"</b> turn
						</h3>

						<CellGrid grid={grid} clickHandler={cellClickHandler} gameState={gameState}/>
					</div>

					<div className={"rightbar"}>
						<h3 className={"mb-4"}>History:</h3>

						<HistoryList historyList={history}
										 clickHanlder={historyHandler}
										 historyIndex={historyIndex}
						/>
					</div>
				</div>
			</div>

			<ResultModal
				winnerName={winner}
				visibility={modelActive}
				onHideHandler={hideWinnerHandler}
			/>
		</>
	)
}

export default App;
