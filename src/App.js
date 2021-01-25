import React, { useState } from "react";
import { connect } from 'react-redux'
import Board from './components/Board';

function App(props) {
    
    let newValues = props.squares.map(square => {
        return square;
    });
    const [turn, setToggled] = useState(false);
    let abilityToMove = true;

    const handleClick = (e, id) => {
        if (e.target.parentElement.childNodes[id + 6] !== undefined){
            if (e.target.parentElement.childNodes[id + 6].className === "squares black" || e.target.parentElement.childNodes[id + 6].className === "squares white"){
                abilityToMove = true;
                setToggled(!turn)
            }else{
                abilityToMove = false;
            }
        }else{
            setToggled(!turn)
        }
        props.changeProp(id, turn, abilityToMove)
    }

    return(
        <div className="App">
            <Board newValues={newValues} onClick={handleClick}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        squares: state.counter.value
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
       changeProp: (id, turn, abilityToMove) => { dispatch({ type: 'CHANGE_SQUARE', id: id, turn: turn, abilityToMove: abilityToMove }) } 
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);