import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CLEAR_ERRORS
    

} from '../constants/productConstants'


export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products:[]
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount:action.payload.productsCount
            }
        
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}

export const productsDetailsReducer = (state = { products :{} }, action) => {
    switch(action.type) 
    {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                products:action.payload
            }
        
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
     }
    
}