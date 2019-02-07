import {PICK_STUDENT} from "./types";

export const pickStudent = (students) => {
    const index = Math.floor(students.length*Math.random());
    const student = students.splice(index, 1);
    console.log("student", student[0]);
    console.log("students", students);
    return {
        type: PICK_STUDENT,
        payload: {
            student: student,
            students
        }
    }
}

export const clearStudent = () => {
    return {
        type: PICK_STUDENT,
        payload: {
            student: undefined,
            students: []
        }
    }
}