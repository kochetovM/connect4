import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import Board from './components/Board';
import axios from 'axios'

function App(props) {
    
    let newValues = props.squares.map(square => {
        return square;
    });
    const [turn, setToggled] = useState(false);
    
    const [poemLines, setPoemLines] = useState([])

    let abilityToMove = true;

    let rnTitleNr = Math.floor(Math.random() * 161); 

    let rnLineNr = Math.floor(Math.random() * 1000);

    const url = `https://poetrydb.org/author/Shakespeare`;

    const [items, setItems] = useState(null)

    useEffect(() => {
        axios.get(url)
        .then(response => {
             setItems(response.data)
        })
    }, [url])
    
    useEffect(() => {
        var poetryBox = document.querySelector('.poetryBox');
          poetryBox.scrollTop = poetryBox.scrollHeight - poetryBox.clientHeight;
    })
    
    const handleClick = (e, id) => {
        if(e.target.className === 'squares 0' && (id > 23 || e.target.parentElement.childNodes[id + 6].className === "squares black" || e.target.parentElement.childNodes[id + 6].className === "squares white")){
            setToggled(!turn)
            if(items){
                for(items[rnTitleNr].lines[rnLineNr] !== undefined; rnLineNr = Math.floor(Math.random() * 161);){
                    if (items[rnTitleNr].lines[rnLineNr] !== undefined){
                        setPoemLines([ ...poemLines, {
                            title: items[rnTitleNr].title + ':',
                            line: items[rnTitleNr].lines[rnLineNr]
                        }])   
                    }
                }
            }else{
                setPoemLines([ ...poemLines, {
                    title: 'Loading API...',
                    line: null
                }])   
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
    }
    
    const moveBack = () => {
        let largest = 0;
        let idNr = 0;
        poemLines.pop()
        for (let i = 0; i < props.squares.length; i++){
           if (props.squares[i].step > largest) {
              largest = props.squares[i].step;
              idNr = i
           }
        }
        document.getElementsByClassName('board')[0].childNodes[idNr].className = "squares 0"
        props.undoMove()
    }

    return(
        <div className="App">
            <div>
                <Board newValues={newValues} onClick={handleClick}/>
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
                <button onClick={moveBack}>Undo last move</button>
            </div>
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
       changeProp: (id, turn, abilityToMove) => { dispatch({ type: 'CHANGE_SQUARE', id: id, turn: turn, abilityToMove: abilityToMove }) },
       undoMove: () => { dispatch({ type: 'UNDO_MOVE' }) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);