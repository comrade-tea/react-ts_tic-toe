import { IHistory } from "../models/Models";
import { Button } from "react-bootstrap";

interface HistoryListProps {
	historyList: IHistory[],
	historyIndex: number,

	clickHanlder(gridMask: Array<Array<string>>, player: string, index: number): void
}

export function HistoryList({ historyList, historyIndex, clickHanlder }: HistoryListProps) {
	return (
		<ol className="history">
			{ !historyList.length && <li>no records</li> }
			{ historyList.map(({ x, y, gridMask, nextPlayer }, index) => {
					const currentItem = historyIndex === index;
					return <li key={ index } className={ "mt-2 list-decimal" }>
						<Button
							className={ `btn  select-none ${ currentItem ? "btn-dark" : "btn-light" }` }
							onClick={ () => clickHanlder(gridMask, nextPlayer, index) }>

							Turn of player "{ nextPlayer }"; coords: x={ x }, y={ y }

						</Button>
						{ currentItem && <span className={ "text-xl ml-1" }>←</span> }
					</li>;
				}
			) }
		</ol>
	)
}
