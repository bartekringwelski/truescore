import { FETCH_USERS } from '../actions/actions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch( action.type ) {

    case FETCH_USERS:
      return action.payload.data;

    default:
      return state;
  }
}