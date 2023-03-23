import React from 'react';

interface CellProps {
    x?: number,
    y?: number,
    sign?: any,
    handleClick: () => void
}

const Cell = ({ x, y, sign, handleClick }: CellProps) => {
    return (
        <button onClick={handleClick}  className={ "inline-block w-[50px] h-[50px] border" }>
            { sign }
        </button>
    );
};

export default Cell;
