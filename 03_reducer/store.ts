import {applyMiddleware, combineReducers, createStore} from "redux";
// @ts-ignore
import thunkMiddleware from 'redux-thunk';
import MainReducer from "./MainReducer";



const rootReducer = combineReducers({
    mainPage: MainReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store
