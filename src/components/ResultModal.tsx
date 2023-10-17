import React, {FC} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {CellState, Players} from "../models/Models";

interface IResultModal {
	winnerName: Players | null
	visibility: boolean | undefined

	onHideHandler(): boolean | void
}

const ResultModal: FC<IResultModal> = ({winnerName, visibility, onHideHandler}) => {
	return (
		<Modal show={visibility} animation={true} size={"sm"} >
			<Modal.Header>
				<Modal.Title>
					{winnerName ? 
						"Congratulations!" 
						: 
						"Draw ( ´･･)ﾉ(._.`)"
					}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div>
					{winnerName ? 
						<div>player "<span className={"font-bold text-uppercase"}>{CellState[winnerName]}</span>" 
							has won this game
						</div>
						:
						<div>No one won, everyone did great</div>
					}
				</div>
				
				<div className={"text-center mt-5 font-bold"}>Play again?</div>
			</Modal.Body>

			<Modal.Footer>
				<Button className={"mx-auto px-4"} variant="secondary" onClick={onHideHandler}>
					yes
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ResultModal
