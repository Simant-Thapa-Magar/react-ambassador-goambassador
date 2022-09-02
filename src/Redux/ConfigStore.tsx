import { createStore } from "redux";
import { userReducer } from "./Reducers/UserReducers";

export const configStore = () => createStore(userReducer)