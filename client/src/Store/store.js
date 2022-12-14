import rootReducer from "../Reducer/reducer";
import { createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;