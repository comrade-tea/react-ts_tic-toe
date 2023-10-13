import {Cell, IHistoryRecord, Players} from "../models/Models";
import {Button} from "react-bootstrap";
import {FC} from "react";

interface HistoryListProps {
	historyList: IHistoryRecord[],
	historyIndex: number,

	clickHanlder(gridMask: Array<Array<Cell>>, player: number, index: number): void
}

export const HistoryList: FC<HistoryListProps> = ({historyList, historyIndex, clickHanlder}) => {

	if (!historyList.length)
		return <span>no records</span>


	return (
		<ol className={"ps-0"}>
			{historyList.map(({x, y, gridMask, nextPlayer}, index) => {
					const currentItem = historyIndex === index;

					const btnClasses = `btn select-none ${currentItem ? "btn-dark" : "btn-light"}`;
					
					return (
						<li key={index} className={"flex align-items-center mt-3 list-decimal list-inside"}>
							<Button
								className={btnClasses}
								onClick={() => clickHanlder(gridMask, nextPlayer, index)}>

								Turn of player "{Players[nextPlayer]}"; coords: x={x}, y={y}
							</Button>

							{currentItem && <span className={"text-3xl ms-2"}>←</span>}
						</li>
					)
				}
			)}
		</ol>
	)
}
