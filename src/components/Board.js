import React from "react";
import Square from "./Square";

const Board = ({ newValues, onClick }) => (

    <div className="board">
        {newValues.map((square, i) => (
            <Square value={square} key={square.id} onClick={e => onClick(e, square.id)}/>
        ))}
    </div>

);

export default Board;