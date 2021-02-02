import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import Board from './components/Board';
import Window from './components/Window';
import axios from 'axios'

function App(props) {

    const [turn, setToggled] = useState(false);
    
    let [poemLines, setPoemLines] = useState([]);

    let abilityToMove = true;

    const apiUrl = `https://poetrydb.org/author/Shakespeare`;

    const imgUrl = `https://www.logolynx.com/images/logolynx/af/af99ef1a19d2f3ae098f4a25ee3a79c8.gif`;
    
    const [poem, setPoem] = useState(null);
    
    let [endGame, setEndGame] = useState(false);

    let largest = 0;
    
    let idNr = 0;

    // takes data about poems
    useEffect(() => {
        axios.get(apiUrl)
        .then(response => {
             setPoem(response.data)
        })
    }, [])
    

    useEffect(() => {
        for (let i = 0; i < props.squares.length; i++){
            if (props.squares[i].step > largest) {
               largest = props.squares[i].step;
               idNr = i;
               if(largest === 30){
                    setPoemLines([]);
                    setEndGame(endGame = true);
                    document.getElementsByClassName('modalWindow')[0].style.display = "block"
               }
            }
        }
    })
    
    // handles clicks on squares, checks which squares can be clicked
    const handleClick = (e, id) => {
        if(e.target.className === 'squares 0' && (id > 23 || e.target.parentElement.childNodes[id + 6].className === "squares black" || e.target.parentElement.childNodes[id + 6].className === "squares white")){
            // determines whose move is now
            setToggled(!turn)
            // checks the data that is taken by api
            if(poem){
                let rnTitleNr = Math.floor(Math.random() * 161);

                if (poem[rnTitleNr] !== undefined){
                    let wholeLine = poem[rnTitleNr].lines.map((line) => line);
                    console.log("wholeLine: ", wholeLine)

                    setPoemLines( [...poemLines,{
                        title: poem[rnTitleNr].title + ':',
                        line: wholeLine
                    }])
                    console.log("poemLines: ", poemLines)
                }
            }

        }
        if (e.target.parentElement.childNodes[id + 6] !== undefined){
            if (e.target.parentElement.childNodes[id + 6].className === "squares black" || e.target.parentElement.childNodes[id + 6].className === "squares white"){
                abilityToMove = true;
            }else{
                abilityToMove = false;
            }
        }
        props.changeProp(id, turn, abilityToMove)
    };
    
    // function that erases the lasts moves in the game
    const moveBack = () => {
        if(poemLines.length !== 0){
            setToggled(!turn)
        }
        poemLines.pop()
        props.undoMove()
    };
    
    const modalWindowAction = () => {
        document.getElementsByClassName('modalWindow')[0].style.display = "none";
        // start a new game 
        setEndGame(endGame = false);
        setPoemLines([]);
        for (let i = 0; i < props.squares.length; i++){
            props.squares[i].state = 0;
            props.squares[i].step = 0;

        }
    };

    return(
        <div className="App row">
            <div className="firstcolumn col-1">
                <div className="moveTurn">
                    <p>
                        {!turn ? 'Player 1 turn' : 'Player 2 turn'}
                    </p>
                </div>

                <div className="undoButton">
                    <button className="undoButtonText" onClick={moveBack}>Undo</button>
                </div>

            </div>
            <div className="boardcol col-6">
                <Board newValues={props.squares} onClick={handleClick}/>
            </div>

            <div className="poetry col-3">
            {poemLines.length ?
                <div>
                    <h5> -> William Shakespeare </h5>

                    <div className="title">
                        <p>{ poemLines[poemLines.length-1].title }</p>
                    </div>

                    <div className="poetryBox">
                            {poemLines[poemLines.length - 1].line.map((each, id) => (
                                <div key={id}>
                                    <p>{ each }</p>
                                </div>
                            ))
                            }
                    </div>
                </div>
                 :
                 <div>
                     <h5>-> William Shakespeare</h5>
                 </div>
            }
            </div>
            <Window items={poem} imgUrl={imgUrl} endGame={endGame} onClick={modalWindowAction} />
        </div>
    )
};


const mapStateToProps = (state) => {
    return {
        squares: state.counter.value
    }
}

// sending data to reducers/Game to make a new move(changeProp) and undo the previous one(undoMove)
const mapDispatchToProps = (dispatch) => {
   return {
       changeProp: (id, turn, abilityToMove) => { dispatch({ type: 'CHANGE_SQUARE', id: id, turn: turn, abilityToMove: abilityToMove }) },
       undoMove: () => { dispatch({ type: 'UNDO_MOVE' }) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);