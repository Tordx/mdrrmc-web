import { combineReducers } from "redux";
import currentUser from "./userReducer";
import counter from "./counterreducer";

const rootReducer = combineReducers({
    currentUser,
    counter
})

export default rootReducer