import React from "react";

const Square = ({ value, onClick }) => {

    const style = value.state ? `squares ${value.state}` : `squares ${value.state}`;

    return (
        <button key={value.id} className={style} onClick={onClick} />
    );
};

export default Square;