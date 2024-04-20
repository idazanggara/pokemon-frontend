import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';  // Correct the import to specifically import `thunk`
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default store
