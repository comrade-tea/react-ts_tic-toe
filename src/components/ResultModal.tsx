import React, {FC} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Players} from "../models/Models";

interface IResultModal {
	winnerName: Players | null
	visibility: boolean | undefined

	onHideHandler(): boolean | void
}

export const ResultModal: FC<IResultModal> = ({winnerName, visibility, onHideHandler}) => {
	return (
		// <Modal show={visibility} onHide={onHideHandler} animation={true} size={"sm"}>
		<Modal show={visibility} animation={true} size={"sm"} >
			<Modal.Header>
				<Modal.Title>Congratulations</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<div>player "{winnerName && Players[winnerName]}" has won this game</div>
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
