import {CellState, IHistoryRecord, TMatrix} from "../models/Models";
import {Button} from "react-bootstrap";
import {FC} from "react";

interface HistoryListProps {
	historyList: IHistoryRecord[],
	historyIndex: number,

	clickHanlder(gridMask: TMatrix, player: number, index: number): void
}

const HistoryList: FC<HistoryListProps> = ({historyList, historyIndex, clickHanlder}) => {

	if (!historyList.length)
		return <i>no records</i>


	return (
		<ol className={"ps-0"}>
			{historyList.map((item, index) => {
					const {x, y, gridMask, nextPlayer} = item
					const currentItem = historyIndex === index;

					return (
						<li key={index} className={"flex align-items-center mt-3 list-decimal list-inside"}>
							<Button
								className={"select-none"}
								variant={currentItem ? "dark" : "light"}
								onClick={() => clickHanlder(gridMask, nextPlayer, index)}>

								Turn of player "{CellState[nextPlayer]}"; coords: x={x}, y={y}
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
