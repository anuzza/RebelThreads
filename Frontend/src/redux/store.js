import { thunk } from "redux-thunk";
import authReducer from "./reducers/auth";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
});

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
