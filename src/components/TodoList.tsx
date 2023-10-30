import type { FC } from 'react'
import React from 'react'
import { uid } from "react-uid";

interface ITodo {
  items: string[]
}

export const TodoList: FC<ITodo> = ({ items }) => (
  <div className="fixed bottom-0 right-0 bg-blue-300 py-1 px-2">
    <div>todo:</div>

    <ul className="list-disc">
      {items.map((item) => (
        <li key={uid(item)}>{item}</li>
      ))}
    </ul>
  </div>
)
