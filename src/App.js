import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import Board from './components/Board';
import Window from './components/Window';
import axios from 'axios'

function App(props) {
    
    let newValues = props.squares.map(square => {
        return square;
    });
    const [turn, setToggled] = useState(false);
    
    let [poemLines, setPoemLines] = useState([]);

    let abilityToMove = true;

    let rnTitleNr = Math.floor(Math.random() * 161); 

    let rnLineNr = Math.floor(Math.random() * 1000);

    const apiUrl = `https://poetrydb.org/author/Shakespeare`;

    const imgUrl = `https://www.logolynx.com/images/logolynx/af/af99ef1a19d2f3ae098f4a25ee3a79c8.gif`;
    
    const [items, setItems] = useState(null);
    
    let [endGame, setEndGame] = useState(false);

    let largest = 0;
    
    let idNr = 0;

    // takes data about poems
    useEffect(() => {
        axios.get(apiUrl)
        .then(response => {
             setItems(response.data)
        })
    }, [apiUrl])
    

    useEffect(() => {
        for (let i = 0; i < props.squares.length; i++){
            if (props.squares[i].step > largest) {
               largest = props.squares[i].step;
               idNr = i;
               if(largest === 30){
                    setEndGame(endGame = true);
                    document.getElementsByClassName('modalWindow')[0].style.display = "block"
               }
            }
        }
        var poetryBox = document.querySelector('.poetryBox');
        poetryBox.scrollTop = poetryBox.scrollHeight - poetryBox.clientHeight;
    })
    
    // handles clicks on squares, checks which squares can be clicked
    const handleClick = (e, id) => {
        if(e.target.className === 'squares 0' && (id > 23 || e.target.parentElement.childNodes[id + 6].className === "squares black" || e.target.parentElement.childNodes[id + 6].className === "squares white")){
            // determines whose move is now
            setToggled(!turn)
            // checks the data that is taken by api
            if(items){
                for(items[rnTitleNr].lines[rnLineNr] !== undefined; rnLineNr = Math.floor(Math.random() * 161);){
                    if (items[rnTitleNr].lines[rnLineNr] !== undefined){
                        setPoemLines([ ...poemLines, {
                            title: items[rnTitleNr].title + ':',
                            line: items[rnTitleNr].lines[rnLineNr]
                        }])   
                    }
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
        document.getElementsByClassName('board')[0].childNodes[idNr].className = "squares 0";
        props.undoMove()
    };
    
    const modalWindowAction = () => {
        document.getElementsByClassName('modalWindow')[0].style.display = "none";
        // start a new game 
        setEndGame(endGame = false);
        setPoemLines(poemLines = []);
        for (let i = 0; i < props.squares.length; i++){
            props.squares[i].state = 0;
            props.squares[i].step = 0;

        }
    };

    return(
        <div className="App">
            <div>
                <Board newValues={newValues} onClick={handleClick}/>
                <div className="moveTurn">
                    <p>
                        {!turn ? 'Player 1 turn' : 'Player 2 turn'}
                    </p>
                </div>
            </div>
            <div>
                <div className="poetryBox">    
                    {poemLines.map((poemLine, id) => (
                        <div key={id}>
                            <p>{ poemLine.title }</p>
                            <p>{ poemLine.line }</p>
                        </div> 
                    ))}
                </div>
                <div >
                    <button className="undoButton"  onClick={moveBack}>Undo last move</button>
                </div>
            </div>
            <Window items={items} imgUrl={imgUrl} endGame={endGame} onClick={modalWindowAction} />
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