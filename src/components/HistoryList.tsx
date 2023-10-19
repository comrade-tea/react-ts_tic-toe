import {CellState, IHistoryRecord, TMatrix} from "../models/Models";
import {Button} from "react-bootstrap";
import {FC} from "react";

interface HistoryListProps {
	historyList: IHistoryRecord[],
	historyIndex: number,

	clickHandler(gridMask: TMatrix, player: number, index: number): void
}

const HistoryList: FC<HistoryListProps> = ({historyList, historyIndex, clickHandler}) => {

	if (!historyList.length)
		return <i>no records</i>

	return (
		<ol className={"ps-0"}>
			{historyList.map((item, index) => {
					const {x, y, gridMask, nextPlayer} = item
					const currentItem = historyIndex === index

					console.log("----", gridMask)

					return (
						<li key={index} className={"flex align-items-center mt-3 list-decimal list-inside"}>
							<Button
								variant={currentItem ? "dark" : "light"}
								onClick={() => clickHandler(gridMask, nextPlayer, index)}>

								<span className={"select-none text-sm sm:text-base text-nowrap"}>
									Turn of player "{CellState[nextPlayer]}"; coords: x={x}, y={y}
								</span>
							</Button>

							{currentItem && <span className={"text-3xl ms-2"}>←</span>}
						</li>
					)
				}
			)}
		</ol>
	)
}

export default HistoryList
