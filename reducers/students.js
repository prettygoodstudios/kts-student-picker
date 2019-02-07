import {GENERATE_STUDENTS, PICK_STUDENT} from "../actions/types";

const INIT_STATE = {
    students: [],
    student: undefined
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GENERATE_STUDENTS: 
            return {
                ...state,
                students: action.payload
            }
        case PICK_STUDENT:
            return{
                ...state,
                students: action.payload.students,
                student: action.payload.student
            }
        default:
            return {
                ...state
            }
    }
}