import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ResultModalProps {
	winnerName: string | null;
	visibility: boolean | undefined
	onHideHandler(): boolean | void
}

export function ResultModal({ winnerName, visibility, onHideHandler }: ResultModalProps) {
	return (
		<Modal show={ visibility } onHide={ onHideHandler } animation={ true } size={ "sm" }>`
			<Modal.Header closeButton>
				<Modal.Title>Congratulations</Modal.Title>
			</Modal.Header>
			<Modal.Body>player "{ winnerName }" won this computer game!</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={ onHideHandler }>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
