import type { FC } from 'react'
import React from 'react'

interface ITodo {
  items: string[]
}

const TodoList: FC<ITodo> = ({ items }) => (
  <div className="fixed bottom-0 right-0 bg-blue-300 py-1 px-2">
    <div>todo:</div>

    <ul className="list-disc">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)
export default TodoList
