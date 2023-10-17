import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from 'react';
import {checkSameSequance, generateGrid, getDiagonals, updatedGrid} from "./utils/utils";
import {
    Cell,
    CellState,
    GameProgress,
    GameState,
    IGameOptions,
    playerO,
    Players,
    playerX,
    TMatrix
} from "./models/Models";

import CellGrid from "./components/CellGrid";
import HistoryList from "./components/HistoryList";
import ResultModal from "./components/ResultModal"
import GameSettings from "./components/GameSettings";
import TodoList from "./components/TodoList";


function App() {
    const [gameOptions, setGameOptions] = useState<IGameOptions>({
        gridSize: 3,
        minGridSize: 3,
        maxGridSize: 6,
        firstPlayer: playerX
    })

    const [gameState, setGameState] = useState<GameState>({
        currentPlayerTurn: gameOptions.firstPlayer,
        progress: GameProgress.inProgress,
        winner: null,
        winnerLine: null,
        history: [],
        historyIndex: -1,
    })

    const [grid, setGrid] = useState<TMatrix>(generateGrid(gameOptions.gridSize));

    const [modalActive, setModalActive] = useState<boolean>(false);

    useEffect(() => {
            const gridFlat = grid.flat(1);

            checkHorizontalLines(gridFlat);
            checkVerticalLines(gridFlat);
            checkDiagonals(grid);

            const cellsAreFilled = gameState.history.length === gridFlat.length;

            if (gameState.winner === null && cellsAreFilled) {
                setGameState(prev => ({...prev, progress: GameProgress.isEnded}))
            }
        }, [grid],
    );

    useEffect(() => {
        if (gameState.progress === GameProgress.isEnded) {
            setModalActive(true)
        }
        if (gameState.progress === GameProgress.inProgress) {
            setModalActive(false)
            resetGame()
        }
    }, [gameState.progress, gameOptions]);

    function resetGame() {
        setGrid(generateGrid(gameOptions.gridSize))

        setGameState(prev => ({
            ...prev,
            progress: GameProgress.inProgress,
            winner: null,
            currentPlayerTurn: gameOptions.firstPlayer,
            history: [],
            historyIndex: -1,
            winnerLine: null
        }))
    }

    function checkLineWinCondition(chunk: Cell[]): void {
        const PlayersArray: Players[] = [playerX, playerO];
        
        PlayersArray.forEach(playerId => {
            if (checkSameSequance(chunk, playerId)) {
                const gridAnimationPrepared = [...grid]
                chunk.forEach(cell => {
                    const {x, y} = cell.coords
                    gridAnimationPrepared[x][y].isPinned = true 
                })
                
                setGameState(prev => ({
                    ...prev,
                    progress: GameProgress.isEnded,
                    winner: playerId,
                    winnerLine: chunk
                }))
            }
        })
    }

    function checkHorizontalLines(gridFlat: Cell[]): void {
        const checkFromIndex: number[] = []

        for (let i = 0; i < gameOptions.gridSize; i++) {
            checkFromIndex.push(gameOptions.gridSize * i)
        }
        //  console.log("--horizontal indexes ✔--", checkFromIndex)

        checkFromIndex.forEach(index => {
            const line = gridFlat.slice(index, index + gameOptions.gridSize);

            checkLineWinCondition(line);
        })
    }

    function checkVerticalLines(arr: Cell[]): void {
        const checkFromIndex: number[] = []

        for (let i = 0; i < gameOptions.gridSize; i++) {
            checkFromIndex.push(i)
        }
        // console.log("--vertical--", checkFromIndex)

        checkFromIndex.forEach(checkIndex => {
            const line = arr
                .slice(checkIndex)
                .filter((value, index) => index % gameOptions.gridSize === 0)

            checkLineWinCondition(line)
        })
    }

    function checkDiagonals(arr: TMatrix): void {
        const diagonals = getDiagonals(arr);
        // console.log("--diagonaaals--", diagonals)

        diagonals.forEach(line => checkLineWinCondition(line))
    }


    const cellClickHandler = (cell: Cell): void => {
        const {x, y} = cell.coords

        if (grid[x][y]?.state === CellState.empty) {
            const gridAfterTurn = updatedGrid(grid, cell, gameState.currentPlayerTurn);
            const nextPlayer = gameState.currentPlayerTurn === playerX ? playerO : playerX;

            setGrid(gridAfterTurn)
            setGameState(prev => ({
                ...prev,
                currentPlayerTurn: nextPlayer,
                historyIndex: prev.historyIndex + 1,
                history: [...prev.history.slice(0, prev.historyIndex + 1), {
                    x, y, gridMask: grid.map(item => [...item]), nextPlayer
                }]
            }))
        }
    }

    const historyHandler = (gridMask: TMatrix, currentPlayerTurn: Players, historyIndex: number) => {
        setGrid(gridMask);

        setGameState(prev => ({
            ...prev,
            currentPlayerTurn,
            historyIndex
        }))
    };

    return (
        <>
            <TodoList items={[
                "win 'stay line' animation",
                "online mode? huh? websocket?"
            ]}/>

            <GameSettings gameOptions={gameOptions} setGameOptions={setGameOptions}/>

            <div className={"container-sm pt-[100px]"}>
                <div className={"grid grid-cols-2"}>
                    <div className={"leftbar"}>
                        <h3>
                            Player <b
                            className={"font-bold text-uppercase"}>"{CellState[gameState.currentPlayerTurn]}"</b> turn
                        </h3>

                        <CellGrid grid={grid}
                                  gameProgress={gameState.progress}
                                  clickHandler={cellClickHandler}
                        />
                    </div>

                    <div className={"rightbar"}>
                        <h3 className={"mb-4"}>History:</h3>

                        <HistoryList historyList={gameState.history}
                                     historyIndex={gameState.historyIndex}
                                     clickHanlder={historyHandler}
                        />
                    </div>
                </div>
            </div>

            <ResultModal
                winnerName={gameState.winner}
                visibility={modalActive}
                onHideHandler={resetGame}
            />
        </>
    )
}

export default App;
