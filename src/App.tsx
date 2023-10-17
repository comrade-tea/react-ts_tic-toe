import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect, useState} from 'react';
import {checkSameSequance, generateGrid, getDiagonals} from "./utils/utils";
import {ResultModal} from "./components/ResultModal"
import {
    Cell,
    CellState,
    GameState,
    IGameOptions,
    IHistoryRecord,
    playerO,
    Players,
    playerX,
    TMatrix
} from "./models/Models";
import {HistoryList} from "./components/HistoryList";

import CellGrid from "./components/CellGrid";
import TodoList from "./components/TodoList";
import GameSettings from "./components/GameSettings";


function App() {
    const [gameOptions, setGameOptions] = useState<IGameOptions>({
        gridSize: 3,
        minGridSize: 3,
        maxGridSize: 6,
        firstPlayer: playerX
    })
    
    const [gameState, setGameState] = useState<GameState>(GameState.inProgress)

    const [winner, setWinner] = useState<Players | null>(null);
    const [modalActive, setModalActive] = useState<boolean>(false);
    
    const [grid, setGrid] = useState<TMatrix>(generateGrid(gameOptions.gridSize));
    const [currentPlayerTurn, setCurrentPlayerTurn] = useState<Players>(gameOptions.firstPlayer);

    const [history, setHistory] = useState<Array<IHistoryRecord>>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);

    useEffect(() => {
            const gridFlat = grid.flat(1);

            checkHorizontalLines(gridFlat);
            checkVerticalLines(gridFlat);
            checkDiagonals(grid);

            const cellsAreFilled = history.length === gridFlat.length;
        
            if (winner === null && cellsAreFilled) {
                setGameState(GameState.isEnded)
            }
        }, [grid],
    );

    useEffect(() => {
        if (gameState === GameState.isEnded) {
            setModalActive(true)
        }
        if (gameState === GameState.inProgress) {
            setModalActive(false)
            resetGame()
        }
    }, [gameState, gameOptions]);

    function resetGame() {
        setGameState(GameState.inProgress)
        setWinner(null)
        setGrid(generateGrid(gameOptions.gridSize))
        setCurrentPlayerTurn(gameOptions.firstPlayer)
        setHistory([])
        setHistoryIndex(-1)
    }

    function checkLineWinCondition(chunk: Cell[]): void {
        const PlayersArray: Players[] = [playerX, playerO];
        
        PlayersArray.forEach(playerId => {
            if (checkSameSequance(chunk, playerId)) {
                setGameState(GameState.isEnded)
                setWinner(playerId)
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


    const updatedGrid = (rowIndex: number, columnIndex: number, newValue: Players) => {
        const newArray = [...grid]; // Create a copy of the array using the spread operator
        newArray[rowIndex][columnIndex].state = newValue; // Update the nested array

        return newArray;
    };

    const cellClickHandler = (x: number, y: number): void => {
        if (grid[x][y]?.state === CellState.empty) {

            const gridAfterTurn = updatedGrid(x, y, currentPlayerTurn);
            const nextPlayer = currentPlayerTurn === playerX ? playerO : playerX;

            setGrid(gridAfterTurn)
            setCurrentPlayerTurn(nextPlayer)

            setHistoryIndex(prev => prev + 1);
            setHistory(prev => [...prev.slice(0, historyIndex + 1), {
                x, y, gridMask: grid.map(item => [...item]), nextPlayer
            }])
        }
    }

    const historyHandler = (gridMask: TMatrix, player: Players, index: number) => {
        setGrid(gridMask);
        setCurrentPlayerTurn(player);
        setHistoryIndex(index);
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
                            Player <b className={"font-bold text-uppercase"}>"{CellState[currentPlayerTurn]}"</b> turn
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
                visibility={modalActive}
                onHideHandler={() => setGameState(GameState.inProgress)}
            />
        </>
    )
}

export default App;
