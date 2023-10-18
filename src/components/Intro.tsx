import React from 'react'

const Intro = () => {
	return (
		<div className={"intro mb-14 max-w-[500px]"}>
			<h1 className={"mb-8"}>Advanced tic-toe</h1>

			<h4>Features:</h4>
			<ul className={"list-disc"}>
				<li>made with react.js + typescript + tailwind</li>
				<li>editable game options</li>
				<li>win/draw animations</li>
				<li>recording a sequence of actions with the ability to backtrack and&nbsp;rewrite the history</li>
				<li>responsive project</li>
			</ul>
		</div>
	)
}
export default Intro
