import React from "react";

const Square = ({ value, onClick }) => {

    const style = value.player ? `squares ${value.player}` : `squares ${value.player}`;

    return (
        <button key={value.id} className={style} onClick={onClick} />
    );
};

export default Square;