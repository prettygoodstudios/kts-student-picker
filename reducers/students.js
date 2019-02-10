import {GENERATE_STUDENTS, PICK_STUDENT, CLEAR_PICK} from "../actions/types";

const INIT_STATE = {
    students: [],
    student: undefined,
    picked: false,
    speed: "standard"
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GENERATE_STUDENTS: 
            return {
                ...state,
                students: action.payload.students,
                speed: action.payload.speed
            }
        case PICK_STUDENT:
            return{
                ...state,
                students: action.payload.students,
                student: action.payload.student,
                picked: action.payload.picked
            }
        case CLEAR_PICK:
            return{
                ...state,
                picked: false
            }
        default:
            return {
                ...state
            }
    }
}