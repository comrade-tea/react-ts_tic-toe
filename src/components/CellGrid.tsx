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
						row.map((value, yIndex) => (
							<button
								className={"inline-block w-[100px] h-[100px] border text-4xl font-bold"}
								key={`${xIndex}${yIndex}`}
								onClick={() => clickHandler(xIndex, yIndex)}>
								
								{value !== Cell.empty && Players[value].toUpperCase()}
							</button>
						))
					}
				</div>
			)}
		</div>
	)
}

export default CellGrid
