import React, { Fragment } from "react";
import {Link} from "react-router-dom"
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { saveShippingInfo} from "../../actions/cartActions";


const ConfirmOrder = ({history}) => {
    const {cartItems,shipppingInfo}=useSelector(state=>state.cart)
    const {user}=useSelector(state=>state.auth)

    return (
        <Fragment>
        <MetaData title={'Confirm Order'}/>
        <CheckoutSteps shipping confirmOrder />
        
            
        </Fragment>
    )
}

export default ConfirmOrder
