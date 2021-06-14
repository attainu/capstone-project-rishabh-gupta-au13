import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import Search from "./Search";
import "../../App.css";
const Header = () => {
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col -md-3">
          <div className="navbar-brand">
            {/* <img src="./images/logo.png" id="logo"></img> */}
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({history})=><Search history={history}/>}/>
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/login" className="btn ml-4" id="login_btn">
            Login
          </Link>

          <span id="cart" className="ml-3">
            cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
