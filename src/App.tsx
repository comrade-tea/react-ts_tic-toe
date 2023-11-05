import 'bootstrap/dist/css/bootstrap.min.css'

import {CellGrid} from './components/CellGrid'
import {Footer} from './components/Footer'
import {GameSettings} from './components/GameSettings'
import {HistoryList} from './components/HistoryList'
import {Intro} from './components/Intro'
import {ResultModal} from './components/ResultModal'
import {useGameOptions} from "./hooks/useGameOptions";
import {useGameState} from "./hooks/useGameState";
import {CellState} from "./models/Models"

export const App = () => {
	const {gameOptions, setGridSize, setFirstPlayer} = useGameOptions()
	const {
		gameState,
		grid,
		cellClickHandler,
		historyClickHandler,
		hideModalAndReset,
		modalActive
	} = useGameState({firstPlayer: gameOptions.firstPlayer, gridSize: gameOptions.gridSize})


	return (
		<div className="min-h-screen flex flex-column">
			{/* <TodoList items={[
				"online mode websocket?"
			]}/>*/}

			<div className="md:container container-sm mx-auto py-[10vh] px-4">
				<Intro/>

				<GameSettings gameOptions={gameOptions}
								  minGridSize={3}
								  maxGridSize={6}
								  setGridSize={setGridSize}
								  setFirstPlayer={setFirstPlayer}
				/>

				<div className="content">
					<div className="main">
						<h3>
							Player{' '} <b className="font-bold text-uppercase">
								&quot;{CellState[gameState.currentPlayerTurn]}&quot;
							</b> turn
						</h3>

						<CellGrid
							grid={grid}
							gameProgress={gameState.progress}
							clickHandler={cellClickHandler}
						/>
					</div>

					<div className="rightbar">
						<h3 className="mb-4">History:</h3>

						<HistoryList
							historyList={gameState.history}
							historyIndex={gameState.historyIndex}
							clickHandler={historyClickHandler}
						/>
					</div>
				</div>
			</div>

			<ResultModal
				winnerName={gameState.winner}
				visibility={modalActive}
				onHideHandler={hideModalAndReset}
			/>

			<Footer/>
		</div>
	)
}
