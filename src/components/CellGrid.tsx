import React, {FC} from 'react'
import {Cell, Players} from "../models/Models";

interface ICellGrid {
	grid: Cell[][]
	clickHandler: (x: number, y: number) => void
}

const CellGrid: FC<ICellGrid> = ({grid, clickHandler}) => {
	return (
		<div className="grid mt-4">
			{grid.map((row, xIndex) =>
				<div className="flex" key={xIndex}>
					{
						row.map((value, yIndex) => {
							const cellStyles = ["w-[100px]", "h-[100px]", "border", "text-4xl", "font-bold", "transition", "flex"]
							const cellIsEmpty = value === Cell.empty;
							
							if (cellIsEmpty) {
								cellStyles.push("hover:bg-gray-100 cursor-pointer")
							} else {
								cellStyles.push("cursor-default")
							}
							
							return (
								<div
									className={cellStyles.join(" ")}
									key={`${xIndex}${yIndex}`}
									onClick={() => clickHandler(xIndex, yIndex)}>

									<span className={"m-auto"}>
										{!cellIsEmpty && Players[value].toUpperCase()}
									</span>
								</div>
							);
						})
					}
				</div>
			)}
		</div>
	)
}

export default CellGrid
