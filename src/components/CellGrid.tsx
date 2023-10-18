import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react'
import {Cell, GameProgress, TMatrix} from "../models/Models";
import {gsap} from "gsap";
import CellGridItem from "./CellGridItem";

gsap.registerPlugin(Physics2DPlugin)

// @ts-ignore
gsap.config({trialWarn: false})

interface ICellGrid {
    grid: TMatrix
    gameProgress: GameProgress
    clickHandler: (cell: Cell) => void
}

const CellGrid: FC<ICellGrid> = ({grid, clickHandler, gameProgress}) => {
    const gridWrapRef = useRef<HTMLDivElement>(null);
    const tl = useRef<GSAPTimeline>()

    const [gridWidth, setGridWidth] = useState<number>(0)
    const cellSize: string = `min(90px, calc(${gridWidth}px / ${grid.length}`
    
    useEffect(() => {
        const getDimensions = (): number => gridWrapRef?.current?.offsetWidth || 0
        const handleResize = () => {
            console.log("----", "resize?");
            setGridWidth(getDimensions())
        }

        if (gridWrapRef.current) {
            setGridWidth(getDimensions())
        }
        
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [gridWrapRef]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (gameProgress === GameProgress.isEnded) {
                tl.current = gsap.timeline()
                    .to(`[data-grid-cell="unpinned"]`, {
                        duration: 2.2,
                        autoAlpha: 0,
                        physics2D: {velocity: "random(200, 650)", angle: "random(250, 340)", gravity: 500},
                        delay: "random(0, 0.2)",
                    }, 0)
                    .to(`[data-grid-cell="unpinned"] span`, {
                        duration: 1.4,
                        physics2D: {
                            velocity: "random(100, 200)",
                            angle: "random(-200, 320)",
                            gravity: "random(200, 1200)",
                            friction: 0.1
                        },
                        scale: gsap.utils.random(0.6, 1.2, 0.2),
                        rotation: gsap.utils.random(-300, 300)
                    }, 0)
            }

        }, gridWrapRef)

        return () => ctx.revert()
    }, [gameProgress]);


    return (
        <div ref={gridWrapRef} className="grid mt-4 overflow-hidden w-100">
            {grid.map((row, index) =>
                <div className="flex" key={index}>
                    {
                        row.map((cell) => (
                            <CellGridItem
                                key={`${cell.coords.x}${cell.coords.y}`}
                                cell={cell}
                                cellSize={cellSize}
                                clickHandler={clickHandler}
                            />)
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default CellGrid
