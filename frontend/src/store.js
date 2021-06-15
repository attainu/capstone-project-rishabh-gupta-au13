import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import{productsReducer, productsDetailsReducer} from './reducers/productReducers'
import {authReducer,userReducer,forgotPasswordReducer} from './reducers/userReducer'


const reducer = combineReducers({
    products: productsReducer,
    productsDetails: productsDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPasswordReducer:forgotPasswordReducer,
})



let initialState = {}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store  