import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import Board from './components/Board';
import Window from './components/Window';
import axios from 'axios'

function App(props) {

    const [turn, setTurnToggled] = useState(false);
    
    let [poemLines, setPoemLines] = useState([]);

    const apiUrl = `https://poetrydb.org/author/Shakespeare`;

    const imgUrl = `https://www.logolynx.com/images/logolynx/af/af99ef1a19d2f3ae098f4a25ee3a79c8.gif`;
    
    const [poem, setPoem] = useState(null);
    
    let [endGame, setEndGame] = useState(false);
    let [winner, setWinner] = useState("");

    // takes data about poems
    useEffect(() => {
        axios.get(apiUrl)
        .then(response => {
             setPoem(response.data)
        })
    }, [])
    

    useEffect(() => {
        if(props.lastStep === 42){
            setEndGame(endGame = true);
            document.getElementsByClassName('modalWindow')[0].style.display = "block"
        }
    })

    const checkbyHorizontal = (id, way, player, row) => {
        let row_current = Math.floor( (id+1)/7 - 0.01  );
        if (row !== row_current ) return 0;

        if (props.squares[id].player === player)
            return 1 + checkbyHorizontal(id+way, way, player,row);
        else return 0;
    }
    const checkbyVertical = (id, player) => {
        if ( id < 42 && props.squares[id].player === player )
            return 1 + checkbyVertical(id+7, player);
        else return 0;
    }
    const checkbyDiagonal = (id, way, player, row) => {
        let row_current = Math.floor( (id+1)/7 - 0.01  );
        let step = Math.abs(row - row_current);

        if (step !== 1 || id < 0 || id > 41 ) return 0;

        if (props.squares[id].player === player)
            return 1 + checkbyDiagonal(id+way, way, player, row_current);
        else return 0;
    }

    const checkforWin = (id,player) => {

        let row = Math.floor( (id+1)/7 - 0.01  );
        let total = 1 + checkbyHorizontal(id-1, -1, player,row) + checkbyHorizontal(id+1, 1, player, row);
        if (total > 3) return true;

        total = 1 + checkbyVertical((id+7), player);
        if (total > 3) return true;

        total = 1 + checkbyDiagonal((id-6),-6, player, row) + checkbyDiagonal((id+6),6, player, row);
        if (total > 3) return true;

        total = 1 + checkbyDiagonal((id-8),-8, player, row) + checkbyDiagonal((id+8),8, player, row);
        if (total > 3) return true;

        return false;
    }
    
    // handles clicks on squares, checks which squares can be clicked
    const handleClick = (e, id) => {
        if(!winner && !props.squares[id].player && (id > 34 || props.squares[id + 7].player === "black" || props.squares[id + 7].player === "white")){
            // determines whose move is now
            setTurnToggled(!turn)
            // checks the data that is taken by api
            if(poem){
                let rnTitleNr = Math.floor(Math.random() * 161);

                if (poem[rnTitleNr] !== undefined){
                    let wholeLine = poem[rnTitleNr].lines.map((line) => line);

                    setPoemLines( [...poemLines,{
                        title: poem[rnTitleNr].title + ':',
                        line: wholeLine
                    }])
                   // console.log("poemLines: ", poemLines)
                }
            }

            props.changeProp(id, turn)

            if (checkforWin(id, props.squares[id].player)) {
                if (props.squares[id].player === "black") setWinner("Player 1");
                else setWinner("Player 2");
            }

        }
    };
    
    // function that erases the lasts moves in the game
    const moveBack = () => {
        if(props.lastStep !== 0){
            setTurnToggled(!turn)
            poemLines.pop()
            if (winner) setWinner("");
            props.undoMove()
        }
    };
    
    const modalWindowAction = () => {
        document.getElementsByClassName('modalWindow')[0].style.display = "none";
        // start a new game 
        setEndGame(endGame = false);
        setWinner("");
        setPoemLines([]);
        props.newGame();
    };

    return(
        <div className="App row">
            <div className="firstcolumn col-1">
                <div className="moveTurn">
                    {winner ?
                        <p> {winner} Wins! </p>
                        :
                        <p>
                            {!turn ? "Player's 1 turn" : "Player's 2 turn" }
                        </p>
                    }
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
        squares: state.counter.value,
        lastStep: state.counter.lastStep
    }
}

// sending data to reducers/Game to make a new move(changeProp) and undo the previous one(undoMove)
const mapDispatchToProps = (dispatch) => {
   return {
       changeProp: (id, turn) => { dispatch({ type: 'CHANGE_SQUARE', id: id, turn: turn }) },
       undoMove: () => { dispatch({ type: 'UNDO_MOVE' }) },
       newGame: () => { dispatch({ type: 'NEW_GAME' }) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);