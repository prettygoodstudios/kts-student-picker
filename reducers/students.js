import {GENERATE_STUDENTS} from "../actions/types";

const INIT_STATE = {
    students: []
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GENERATE_STUDENTS: 
            return {
                ...state,
                students: action.payload
            }
        default:
            return {
                ...state
            }
    }
}