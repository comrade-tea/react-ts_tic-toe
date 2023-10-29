import 'bootstrap/dist/css/bootstrap.min.css'

import React, { useCallback, useEffect, useState } from 'react'

import { CellGrid } from './components/CellGrid'
import { Footer } from './components/Footer'
import { GameSettings } from './components/GameSettings'
import { HistoryList } from './components/HistoryList'
import { Intro } from './components/Intro'
import { ResultModal } from './components/ResultModal'
import type { Cell, GameState, IGameOptions, Players, TMatrix } from './models/Models'
import { CellState, GameProgress, playerO, playerX } from './models/Models'
import {
  checkSameSequence,
  deepCloneArray,
  generateGrid,
  getDiagonals,
  updatedGrid,
} from './utils/utils'

export const App = () => {
  const [gameOptions, setGameOptions] = useState<IGameOptions>({
    gridSize: 3,
    minGridSize: 3,
    maxGridSize: 6,
    firstPlayer: playerX,
  })

  const [gameState, setGameState] = useState<GameState>({
    progress: GameProgress.inProgress,
    winner: null,
    winnerLine: null,
    currentPlayerTurn: gameOptions.firstPlayer,
    history: [],
    historyIndex: -1,
  })

  const [grid, setGrid] = useState<TMatrix>(generateGrid(gameOptions.gridSize))

  const [modalActive, setModalActive] = useState<boolean>(false)

  const resetGame = useCallback(() => {
    setGrid(generateGrid(gameOptions.gridSize))

    setGameState(prev => ({
      ...prev,
      progress: GameProgress.inProgress,
      winner: null,
      currentPlayerTurn: gameOptions.firstPlayer,
      history: [],
      historyIndex: -1,
      winnerLine: null,
    }))
  }, [gameOptions.firstPlayer, gameOptions.gridSize])

  const checkLineWinCondition = useCallback(
    (chunk: Cell[]): void => {
      const PlayersArray: Players[] = [playerX, playerO]

      PlayersArray.forEach(playerId => {
        if (checkSameSequence(chunk, playerId)) {
          const gridAnimationPrepared = Array.from(grid)
          chunk
            .filter(cell => cell.state === playerId)
            .forEach(cell => {
              const { x, y } = cell.coords
              gridAnimationPrepared[x][y].isPinned = true
            })

          setGameState(prev => ({
            ...prev,
            progress: GameProgress.isEnded,
            winner: playerId,
            winnerLine: chunk,
          }))
        }
      })
    },
    [grid]
  )

  const checkHorizontalLines = useCallback(
    (gridFlat: Cell[]): void => {
      const checkFromIndex: number[] = []

      for (let i = 0; i < gameOptions.gridSize; i++) {
        checkFromIndex.push(gameOptions.gridSize * i)
      }

      checkFromIndex.forEach(index => {
        const line = gridFlat.slice(index, index + gameOptions.gridSize)

        checkLineWinCondition(line)
      })
    },
    [checkLineWinCondition, gameOptions.gridSize]
  )

  const checkVerticalLines = useCallback(
    (arr: Cell[]): void => {
      const checkFromIndex: number[] = []

      for (let i = 0; i < gameOptions.gridSize; i++) {
        checkFromIndex.push(i)
      }

      checkFromIndex.forEach(checkIndex => {
        const line = arr
          .slice(checkIndex)
          .filter((value, index) => index % gameOptions.gridSize === 0)

        checkLineWinCondition(line)
      })
    },
    [checkLineWinCondition, gameOptions.gridSize]
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
      const { x, y } = cell.coords

      if (grid[x][y]?.state === CellState.empty) {
        const gridAfterTurn = updatedGrid(grid, cell, gameState.currentPlayerTurn)
        const nextPlayer = gameState.currentPlayerTurn === playerX ? playerO : playerX

        setGameState(prev => ({
          ...prev,
          currentPlayerTurn: nextPlayer,
          historyIndex: prev.historyIndex + 1,
          history: [
            ...prev.history.slice(0, prev.historyIndex + 1),
            { x, y, gridMask: deepCloneArray(grid), playerMadeTurn: gameState.currentPlayerTurn },
          ],
        }))

        setGrid(gridAfterTurn)
      }
    },
    [gameState.currentPlayerTurn, grid]
  )

  const historyHandler = useCallback(
    (gridHistoryMask: TMatrix, currentPlayerTurn: Players, historyIndex: number) => {
      setGrid(deepCloneArray<TMatrix>(gridHistoryMask))

      setGameState(prev => ({
        ...prev,
        currentPlayerTurn,
        historyIndex,
      }))
    },
    []
  )

  useEffect(() => {
    const gridFlat = grid.flat(1)

    checkHorizontalLines(gridFlat)
    checkVerticalLines(gridFlat)
    checkDiagonals(grid)

    const cellsAreFilled = gameState.history.length === gridFlat.length

    if (gameState.winner === null && cellsAreFilled) {
      setGameState(prev => ({ ...prev, progress: GameProgress.isEnded }))
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
    switch (gameState.progress) {
      case GameProgress.isEnded: {
        setModalActive(true)
        break
      }

      case GameProgress.inProgress: {
        setModalActive(false)
        resetGame()
        break
      }
    }
  }, [gameState.progress, gameOptions, resetGame])

  return (
    <div className="min-h-screen flex flex-column">
      {/* <TodoList items={["online mode websocket?"]}/>*/}

      <div className="md:container container-sm mx-auto py-[10vh] px-4">
        <Intro />

        <GameSettings gameOptions={gameOptions} setGameOptions={setGameOptions} />

        <div className="content">
          <div className="main">
            <h3>
              Player{' '}
              <b className="font-bold text-uppercase">
                &quot;{CellState[gameState.currentPlayerTurn]}&ldquo;
              </b>
              turn
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
              clickHandler={historyHandler}
            />
          </div>
        </div>
      </div>

      <ResultModal
        winnerName={gameState.winner}
        visibility={modalActive}
        onHideHandler={resetGame}
      />

      <Footer />
    </div>
  )
}
