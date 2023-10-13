import React, {useEffect, useState} from 'react';
import {generateGrid, getDiagonals} from "./utils/utils";
import "bootstrap/dist/css/bootstrap.min.css";
import {ResultModal} from "./components/ResultModal"
import {Cell, IGameOptions, IHistoryRecord, Players} from "./models/Models";
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

	const [winner, setWinner] = useState<Players | null>(null);
	const [modelActive, setModelActive] = useState<boolean>(false);

	const [grid, setGrid] = useState<Array<Array<Cell>>>(generateGrid(gameOptions.gridSize));
	const [currentPlayerTurn, setCurrentPlayerTurn] = useState<Players>(gameOptions.firstPlayer);

	const [history, setHistory] = useState<Array<IHistoryRecord>>([]);
	const [historyIndex, setHistoryIndex] = useState<number>(-1);

	useEffect(() => {
			if (history.length > 0) {
				const flat = grid.flat(1);

				checkHorizontal(flat);
				checkVertical(flat);
				checkDiagonals(grid);
			}

			if (history.length === grid.flat(1).length) {
				alert("draw")
				resetGame()
			}
		}, [grid, history.length],
	);


	function resetGame() {
		setGrid(generateGrid(gameOptions.gridSize))
		setCurrentPlayerTurn(gameOptions.firstPlayer)
		setHistory([])
		setHistoryIndex(-1)
	}

	const hideWinnerHandler = () => {
		setModelActive(false);
		resetGame();
	}
	const showWinnerHandler = () => setModelActive(true);


	function checkWinCondition(chunk: Cell[]): void {
		const PlayersArray = Object.values(Players);

		PlayersArray.forEach(player => {
			if (chunk.every(cell => cell === Number(player))) {
				setWinner(Number(player))
				showWinnerHandler()
			}
		})
	}

	function checkHorizontal(arr: Cell[]): void {
		const checkFrom = [0, 3, 6];

		checkFrom.forEach(index => {
			const line = arr.slice(index, index + 3);

			checkWinCondition(line);
		})
	}

	function checkVertical(arr: Cell[]): void {
		const checkFrom = [0, 1, 2];

		checkFrom.forEach(checkIndex => {
			const line = arr
				.slice(checkIndex)
				.filter((value, index) => index % 3 === 0)

			checkWinCondition(line)
		})
	}

	function checkDiagonals(arr: Array<Array<Cell>>): void {
		const diagonals = getDiagonals(arr);

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

	const cellReady = (x: number, y: number) => grid[x][y] === Cell.empty;

	const cellClickHandler = (x: number, y: number): void => {
		if (cellReady(x, y)) {
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
				"win animation ~_~",
				"edit options",
			]}/>

			<GameSettings gameOptions={gameOptions} setGameOptions={setGameOptions} resetGame={resetGame}/>

			<div className={"container-sm pt-[100px]"}>
				<div className={"grid grid-cols-2"}>
					<div className={"leftbar"}>
						<h3>
							Player <b className={"font-bold text-uppercase"}>"{Players[currentPlayerTurn]}"</b> turn
						</h3>

						<CellGrid grid={grid} clickHandler={cellClickHandler}/>
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
