import React, { useState } from 'react';
import Cell from "./components/Cell";

enum cellState {empty = "", x = "X", o = "O"}

enum player {x = "X", y = "O"}

interface IHistory {
   x: number,
   y: number,
   nextPlayer: string,
   gridMask: Array<Array<string>>
}

function App() {
   const gridMarkup: Array<Array<string>> = [
      [cellState.empty, cellState.empty, cellState.empty],
      [cellState.empty, cellState.empty, cellState.empty],
      [cellState.empty, cellState.empty, cellState.empty],
   ]

   const [grid, setGrid] = useState(gridMarkup);
   const [nextPlayerTurn, setNextPlayerTurn] = useState(player.x as string);
   const [history, setHistory] = useState([] as IHistory[]);

   const updatedGrid = (rowIndex: number, columnIndex: number, newValue: string) => {
      const newArray = [...grid]; // Create a copy of the array using the spread operator
      newArray[rowIndex][columnIndex] = newValue; // Update the nested array

      return newArray;
   };

   function getNextPlayer(historyPlayer?: string): string {
      if (historyPlayer) {
         return historyPlayer === player.x ? player.y : player.x;
      }
      
      return nextPlayerTurn === player.x ? player.y : player.x;
   }

   const cellReady = (x: number, y: number) => grid[x][y] === "";

   const clickHandler = (x: number, y: number) => {
      if (cellReady(x, y)) {
         const newGrid = updatedGrid(x, y, nextPlayerTurn);
         const nextPlayer = getNextPlayer();
         
         setGrid(newGrid)
         setNextPlayerTurn(nextPlayer)

         setHistory(prev => [...prev, { x, y, gridMask: grid.map(item => [...item]), nextPlayer }])
      }
   }

   const historyHandler = (gridMask: Array<Array<string>>, player: string) => {
      setGrid(gridMask);
      
      setNextPlayerTurn(player);
   };

   return (
      <div className="max-w-[600px] mx-auto mt-[100px]">
         <div className={ "grid grid-cols-2" }>
            <div className="leftbar">
               <div>Next player turn: <b className={ "font-bold" }>"{ nextPlayerTurn }"</b></div>

               <div className="grid mt-4">
                  { grid.map((row, xIndex) =>
                     <div className={ "flex" } key={ xIndex }>
                        {
                           row.map((value, yIndex) => (
                              <button
                                 className={ "inline-block w-[50px] h-[50px] border" }
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
               <h5 className="font-bold">History:</h5>
               <ol className="history mt-4">
                  { !history.length &&
					  <li>no records</li>
                  }
                  { history.map(({ x, y, gridMask, nextPlayer }, index) =>
                     <li key={ index } className={ "mt-2 list-decimal" }>
                        <button
                           className={ "px-3 py-1 bg-blue-400 text-white rounded select-none" }
                           onClick={ () => historyHandler(gridMask, nextPlayer) }>
                           Turn of player "{ nextPlayer }"; coords: x={ x }, y={ y }
                        </button>
                     </li>
                  ) }
               </ol>
            </div>
         </div>
      </div>
   );
}

export default App;
