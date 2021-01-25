const initValues = {
   value: [
      { id: 0, state: 0 },
      { id: 1, state: 0 },
      { id: 2, state: 0 },
      { id: 3, state: 0 },
      { id: 4, state: 0 },
      { id: 5, state: 0 },
      { id: 6, state: 0 },
      { id: 7, state: 0 },
      { id: 8, state: 0 },
      { id: 9, state: 0 },
      { id: 10, state: 0 },
      { id: 11, state: 0 },
      { id: 12, state: 0 },
      { id: 13, state: 0 },
      { id: 14, state: 0 },
      { id: 15, state: 0 },
      { id: 16, state: 0 },
      { id: 17, state: 0 },
      { id: 18, state: 0 },
      { id: 19, state: 0 },
      { id: 20, state: 0 },
      { id: 21, state: 0 },
      { id: 22, state: 0 },
      { id: 23, state: 0 },
      { id: 24, state: 0 },
      { id: 25, state: 0 },
      { id: 26, state: 0 },
      { id: 27, state: 0 },
      { id: 28, state: 0 },
      { id: 29, state: 0 }
   ]
}

const Game = (state = initValues, action) => {
   if (action.type === 'CHANGE_SQUARE') {
      let newValue = state.value.map(value => {
         if (action.id === value.id && value.state === 0){
            if(value.id > 23 || action.abilityToMove === true){
               if(action.turn === false){
                  value.state = 'black';
               }else{
                  value.state = 'white';
               }
            }
         }
         return value;
      });
      return {
         ...state,
         value: newValue
      }
   }
   return state;      
}

export default Game;
