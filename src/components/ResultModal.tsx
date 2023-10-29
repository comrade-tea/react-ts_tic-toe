import type { FC } from 'react'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import type { Players } from '../models/Models'
import { CellState } from '../models/Models'

interface IResultModal {
  winnerName: Players | null
  visibility: boolean | undefined

  onHideHandler: () => boolean | void
}

export const ResultModal: FC<IResultModal> = ({ winnerName, visibility, onHideHandler }) => (
  <Modal show={visibility} animation size="sm">
    <Modal.Header>
      <Modal.Title>{winnerName ? 'Congratulations!' : 'Draw ( ´･･)ﾉ(._.`)'}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <div>
        {winnerName ? (
          <div>
            player '<span className="font-bold text-uppercase">{CellState[winnerName]}</span>' has
            won this game
          </div>
        ) : (
          <div>No one won, everyone did great</div>
        )}
      </div>

      <div className="text-center mt-5 font-bold">Play again?</div>
    </Modal.Body>

    <Modal.Footer>
      <Button className="mx-auto px-4" variant="secondary" onClick={onHideHandler}>
        yes
      </Button>
    </Modal.Footer>
  </Modal>
)
