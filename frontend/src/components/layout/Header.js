import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

import '../../App.css'
const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const{user,loading}= useSelector(state=>state.auth)

    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col -md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/logo.png" id="logo"></img>
                        </Link>
                    </div>
                </div>
                
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <div className="input-group">
                        <input
                            type="text"
                            id="search_field"
                            className="form-control"
                            placeholder="enter product name .."
                        />
                        <div className="input-group-append">
                            <button id="search_btn" className="btn">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{textDecoration:'none'}}>
                        <span id="cart" className="ml-3">cart</span>
                        <span className="ml-1" id="cart_count">2</span>
                    </Link>
                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="!#" className="btn dropdwon-toggle text-white"
                                type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {user&&user.name}
                            </Link>

                            
                        </div>
                    ): !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
                </div>       
            </nav>

        </Fragment>
        )
}

export default Header