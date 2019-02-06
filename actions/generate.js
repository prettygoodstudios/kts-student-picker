import {GENERATE_STUDENTS} from "./types";

export const generateStudents = (students) => {
    let x = [];
    for(let i = 0; i < students; i++){
        x.push(i+1);
    }
    return {
        type: GENERATE_STUDENTS,
        payload: x
    }
};