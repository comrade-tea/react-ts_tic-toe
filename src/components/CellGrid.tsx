import React, {FC, useLayoutEffect, useRef} from 'react'
import {Cell, GameState, Players, TMatrix} from "../models/Models";
import {gsap} from "gsap";
// @ts-ignore
// import {Physics2DPlugin} from "https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/Physics2DPlugin3.min.js"

gsap.registerPlugin(Physics2DPlugin)

interface ICellGrid {
	grid: TMatrix
	clickHandler: (x: number, y: number) => void
	gameState: GameState
}

const CellGrid: FC<ICellGrid> = ({grid, clickHandler, gameState}) => {
	const gridWrapRef = useRef<HTMLDivElement>(null);
	const tl = useRef<GSAPTimeline>()

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (gameState === GameState.isEnded) {
				tl.current = gsap.timeline()
					.to("[data-grid-cell]", {
						duration: 2.2,
						autoAlpha: 0,
						physics2D: {velocity: "random(200, 650)", angle: "random(250, 340)", gravity: 500},
						delay: "random(0, 0.2)",
					}, 0)
					.to("[data-grid-cell] span", {
						duration: 1.4,
						physics2D: {velocity: "random(100, 200)", angle: "random(-200, 320)", gravity: "random(200, 1200)", friction: 0.1},
						scale: gsap.utils.random(0.6, 1.2, 0.2),
						rotation: gsap.utils.random(-300, 300)
					}, 0)
			}

		}, gridWrapRef)

		return () => ctx.revert()
	}, [gameState]);


	return (
		<div ref={gridWrapRef} className="grid mt-4">
			{grid.map((row, xIndex) =>
				<div className="flex" key={xIndex}>
					{
						row.map((value, yIndex) => {
							const cellStyles = ["w-[100px]", "h-[100px]", "border", "text-4xl", "font-bold", "transition-colors", "flex"]
							const cellIsEmpty = value === Cell.empty;

							if (cellIsEmpty) {
								cellStyles.push("hover:bg-gray-100 cursor-pointer")
							} else {
								cellStyles.push("cursor-default")
							}

							return (
								<div
									className={cellStyles.join(" ")}
									key={`${xIndex}${yIndex}`}
									onClick={() => clickHandler(xIndex, yIndex)}
									data-grid-cell=""
								>

									<span className={"block m-auto"}>
										{!cellIsEmpty && Players[value].toUpperCase()}
									</span>
								</div>
							);
						})
					}
				</div>
			)}
		</div>
	)
}

export default CellGrid
