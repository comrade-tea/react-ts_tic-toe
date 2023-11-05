import {gsap} from 'gsap'
import type {FC} from 'react'
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {uid} from 'react-uid'

import type {Cell, TMatrix} from '../models/Models'
import {GameProgress} from '../models/Models'
import {CellGridItem} from './CellGridItem'

gsap.registerPlugin(Physics2DPlugin)

// @ts-expect-error
gsap.config({trialWarn: false})

interface ICellGrid {
	grid: TMatrix
	gameProgress: GameProgress
	clickHandler: (cell: Cell) => void
}

export const CellGrid: FC<ICellGrid> = ({grid, clickHandler, gameProgress}) => {
	const gridWrapRef = useRef<HTMLDivElement>(null)
	const tl = useRef<GSAPTimeline>()

	const [gridWidth, setGridWidth] = useState<number>(0)
	const cellSize = `min(90px, calc(${gridWidth}px / ${grid.length}`

	useEffect(() => {
		const getDimensions = (): number => gridWrapRef.current?.offsetWidth ?? 0
		const handleResize = () => {
			// console.log("----", "resize?");
			setGridWidth(getDimensions())
		}

		if (gridWrapRef.current) {
			setGridWidth(getDimensions())
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [gridWrapRef])

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (gameProgress === GameProgress.isEnded) {
				tl.current = gsap
					.timeline()
					.to(
						`[data-grid-cell="unpinned"]`,
						{
							duration: 2.2,
							autoAlpha: 0,
							physics2D: {velocity: 'random(200, 650)', angle: 'random(250, 340)', gravity: 500},
							delay: 'random(0, 0.2)',
						},
						0
					)
					.to(
						`[data-grid-cell="unpinned"] span`,
						{
							duration: 1.4,
							physics2D: {
								velocity: 'random(100, 200)',
								angle: 'random(-200, 320)',
								gravity: 'random(200, 1200)',
								friction: 0.1,
							},
							scale: gsap.utils.random(0.6, 1.2, 0.2),
							rotation: gsap.utils.random(-300, 300),
						},
						0
					)
			}
		}, gridWrapRef)

		return () => {
			ctx.revert()
		}
	}, [gameProgress])

	return (
		<div ref={gridWrapRef} className="grid mt-4 w-100">
			{grid.map((row, index) => (
				<div className="flex" key={uid(index)}>
					{row.map(cell => (
						<CellGridItem
							key={`${cell.coords.x}${cell.coords.y}`}
							cell={cell}
							cellSize={cellSize}
							onClick={clickHandler}
						/>
					))}
				</div>
			))}
		</div>
	)
}
