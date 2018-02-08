import createReducer from '../util/createReducer'
import { ACTION_HANDLERS } from '../actions/currentState'
// import initState from 'STORE/initState'

let initState = {} ;
export default createReducer(initState, ACTION_HANDLERS)
