import React, {FC} from 'react'

interface ITodo {
	items: string[];
}

const TodoList: FC<ITodo> = ({items}) => {
	return (
		<div className={"fixed right-0 bg-blue-300 p-2"}>
			<div>todo:</div>

			<ul className={"list-disc"}>
				{items.map((item, index) => <li key={index}>{item}</li>)}
			</ul>
		</div>
	)
}
export default TodoList
