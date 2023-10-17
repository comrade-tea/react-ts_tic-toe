import {Cell, CellState} from "../models/Models";
import React, {FC} from "react";

interface ICellGridItem {
    cell: Cell
    clickHandler: (cell: Cell) => void
}

const CellGridItem: FC<ICellGridItem> = ({cell, clickHandler}) => {
    const cellStyles = ["flex", "w-[100px]", "h-[100px]", "border", "text-4xl", "font-bold", "transition-colors"]
    const cellIsEmpty = cell?.state === CellState.empty

    if (cellIsEmpty) {
        cellStyles.push("hover:bg-gray-100 cursor-pointer")
    } else {
        cellStyles.push("cursor-default")
    }

    return (
        <div className={`cell ${cellStyles.join(" ")}`}
             onClick={() => clickHandler(cell)}
             data-grid-cell={cell.isPinned && !cellIsEmpty ? "pinned" : "unpinned"}>
            
            <span className={"block m-auto text-uppercase"}>
                {!cellIsEmpty && CellState[cell.state]}
            </span>
        </div>)
}

export default CellGridItem
