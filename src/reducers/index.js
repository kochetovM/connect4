import Game from './Game';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  counter: Game,
});

export default allReducers;
