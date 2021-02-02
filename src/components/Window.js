import React from "react";

const Window = ({items, imgUrl, endGame, onClick }) => {

    return (
        <div className="modalWindow">
            <div className="Window">
                <img src={imgUrl} alt="Connect 4" />
                { endGame ? <p>Game Over</p> : '' }
                { !items ? <p>Loading </p>  : <button onClick={onClick}>Start new game!</button> }
            </div>
        </div>
    )    
};

export default Window;