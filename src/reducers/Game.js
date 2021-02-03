const initValues = {
   value: [
      { id: 0, player: 0, step: 0 },
      { id: 1, player: 0, step: 0 },
      { id: 2, player: 0, step: 0 },
      { id: 3, player: 0, step: 0 },
      { id: 4, player: 0, step: 0 },
      { id: 5, player: 0, step: 0 },
      { id: 6, player: 0, step: 0 },
      { id: 7, player: 0, step: 0 },
      { id: 8, player: 0, step: 0 },
      { id: 9, player: 0, step: 0 },
      { id: 10, player: 0, step: 0 },
      { id: 11, player: 0, step: 0 },
      { id: 12, player: 0, step: 0 },
      { id: 13, player: 0, step: 0 },
      { id: 14, player: 0, step: 0 },
      { id: 15, player: 0, step: 0 },
      { id: 16, player: 0, step: 0 },
      { id: 17, player: 0, step: 0 },
      { id: 18, player: 0, step: 0 },
      { id: 19, player: 0, step: 0 },
      { id: 20, player: 0, step: 0 },
      { id: 21, player: 0, step: 0 },
      { id: 22, player: 0, step: 0 },
      { id: 23, player: 0, step: 0 },
      { id: 24, player: 0, step: 0 },
      { id: 25, player: 0, step: 0 },
      { id: 26, player: 0, step: 0 },
      { id: 27, player: 0, step: 0 },
      { id: 28, player: 0, step: 0 },
      { id: 29, player: 0, step: 0 },
      { id: 30, player: 0, step: 0 },
      { id: 31, player: 0, step: 0 },
      { id: 32, player: 0, step: 0 },
      { id: 33, player: 0, step: 0 },
      { id: 34, player: 0, step: 0 },
      { id: 35, player: 0, step: 0 },
      { id: 36, player: 0, step: 0 },
      { id: 37, player: 0, step: 0 },
      { id: 38, player: 0, step: 0 },
      { id: 39, player: 0, step: 0 },
      { id: 40, player: 0, step: 0 },
      { id: 41, player: 0, step: 0 }
   ],
   lastStep: 0
}


const Game = (state = initValues, action) => {

   if (action.type === 'CHANGE_SQUARE') {

      let newValue = state.value.map((value,i) => {
         if (action.id === i && value.player === 0){
               value.step = state.lastStep + 1;
               if(action.turn === false) value.player = 'black';
               else value.player = 'white';
         }
         return value;
      });

      return {
         ...state,
         value: newValue,
         lastStep: state.lastStep + 1
      }
   }

   else if (action.type === 'UNDO_MOVE'){
      let lastStep = state.lastStep;

      let newValue = state.value.map((value) => {
         if(state.lastStep !== 0 && lastStep === value.step){
            value.step = 0;
            value.player = 0;
            state.lastStep = lastStep - 1;
         }
         return value;
      });
      return {
         ...state,
         value: newValue
      }
   }
   if (action.type === 'NEW_GAME'){
      let newValue = state.value.map((value,i) => {
         value.step = 0;
         value.player = 0;
         return value;
      });
      return {
         ...state,
         value: newValue,
         lastStep: 0
      }
   }
   return state;
}

export default Game;
