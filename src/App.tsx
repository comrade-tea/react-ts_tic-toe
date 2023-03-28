import React, { useEffect, useState } from 'react';
import { getDiagonals } from "./utils/utils";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import { ResultModal } from "./components/ResultModal"
import { IHistory } from "./models/Models";
import { HistoryList } from "./components/HistoryList";

enum cellState {empty = "", x = "X", o = "O"}

enum players {x = "X", y = "O"}


const gridMarkup: Array<Array<string>> = [
	[cellState.empty, cellState.empty, cellState.empty],
	[cellState.empty, cellState.empty, cellState.empty],
	[cellState.empty, cellState.empty, cellState.empty],
]

function App() {
	const [grid, setGrid] = useState(gridMarkup);
	const [nextPlayerTurn, setNextPlayerTurn] = useState(players.x as string);
	const [history, setHistory] = useState([] as IHistory[]);
	const [historyIndex, setHistoryIndex] = useState(-1);
	const [winner, setWinner] = useState<string | null>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const handleCloseModal = () => setModalVisible(false);
	const handleShowModal = () => setModalVisible(true);

	useEffect(() => {
			if (history.length > 0) { // проверить на вин кондишн
				const flat = grid.flat(1);

				checkHorizontal(flat);
				checkVertical(flat);
				checkDiagonals(grid);
			}
		}, [grid],
	);

	useEffect(() => {
		if (winner)
			handleShowModal()
	}, [winner]);

	function checkHorizontal(arr: string[]) {
		const checkFrom = [0, 3, 6];

		checkFrom.forEach(index => {
			const chunk = arr.slice(index, index + 3);

			// проверям каждого из !2х! игроков 
			Object.values(players).forEach(player => {
				if (chunk.every(char => char === player)) {
					setWinner(player)
				}
			})
		})
	}

	function checkVertical(arr: string[]) {
		const checkFrom = [0, 1, 2];

		checkFrom.forEach(checkIndex => {
			const chunk = arr.slice(checkIndex).filter((value, index) => index % 3 === 0)

			Object.values(players).forEach(player => {
				if (chunk.every(char => char === player)) {
					setWinner(player);
				}
			})
		})
	}

	function checkDiagonals(arr: Array<Array<string>>) {
		const diagonals = getDiagonals(arr);

		diagonals.forEach(diagonal => {
			Object.values(players).forEach(player => {
				if (diagonal.every(char => char === player)) {
					// console.log("----", "win diagonal")
					setWinner(player)
					return
				}
			})
		})

	}


	const updatedGrid = (rowIndex: number, columnIndex: number, newValue: string) => {
		const newArray = [...grid]; // Create a copy of the array using the spread operator
		newArray[rowIndex][columnIndex] = newValue; // Update the nested array

		return newArray;
	};

	function getNextPlayer(historyPlayer?: string): string {
		if (historyPlayer) {
			return historyPlayer === players.x ? players.y : players.x;
		}

		return nextPlayerTurn === players.x ? players.y : players.x;
	}

	const cellReady = (x: number, y: number) => grid[x][y] === "";

	const clickHandler = (x: number, y: number) => {
		if (cellReady(x, y)) {
			const newGrid = updatedGrid(x, y, nextPlayerTurn);
			const nextPlayer = getNextPlayer();
			setGrid(newGrid)
			setNextPlayerTurn(nextPlayer)

			setHistory(prev => [...prev.slice(0, historyIndex + 1), {
				x, y, gridMask: grid.map(item => [...item]), nextPlayer
			}])
			setHistoryIndex(prev => prev + 1);
		}
	}

	const historyHandler = (gridMask: Array<Array<string>>, player: string, index: number) => {
		setGrid(gridMask);
		setNextPlayerTurn(player);
		setHistoryIndex(index);
	};

	return (
		<div className="container-sm pt-[100px]">
			<div className={ "grid grid-cols-2" }>
				<div className="leftbar">
					<h3>Next player turn: <b className={ "font-bold" }>"{ nextPlayerTurn }"</b></h3>

					<div className="grid mt-4">
						{ grid.map((row, xIndex) =>
							<div className={ "flex" } key={ xIndex }>
								{
									row.map((value, yIndex) => (
										<button
											className={ "inline-block w-[90px] h-[90px] border text-2xl" }
											key={ `${ xIndex }${ yIndex }` }
											onClick={ () => clickHandler(xIndex, yIndex) }>
											{ value }
										</button>
									))
								}
							</div>
						) }
					</div>
				</div>

				<div className="rightbar">
					<h2 className={ "mb-4" }>History:</h2>

					<HistoryList historyList={ history }
					             clickHanlder={ historyHandler }
					             historyIndex={ historyIndex }
					/>
				</div>
			</div>
			
			<ResultModal winnerName={ winner } visibility={ modalVisible } onHideHandler={ handleCloseModal } />
		</div>
	);
}

export default App;
