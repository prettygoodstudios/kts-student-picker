import {PICK_STUDENT, CLEAR_PICK} from "./types";

export const pickStudent = (students, success) => {
    const index = Math.floor(students.length*Math.random());
    const student = students.splice(index, 1);
    console.log("student", student[0]);
    console.log("students", students);
    success(student[0], students);
    return {
        type: PICK_STUDENT,
        payload: {
            student: student,
            students,
            picked: true
        }
    }
}

export const clearStudent = () => {
    return {
        type: PICK_STUDENT,
        payload: {
            student: undefined,
            students: [],
            picked: false
        }
    }
}

export const clearPick = () => {
    return {
        type: CLEAR_PICK,
        payload: false
    }
}