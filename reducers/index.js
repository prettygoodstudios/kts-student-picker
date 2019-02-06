import {combineReducers} from "redux";

import students from "./students";

const rootReducer = combineReducers({
    state: (state = {}) => state,
    students
});

export default rootReducer;

