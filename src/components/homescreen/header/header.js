import React from 'react';
import { Route,NavLink } from 'react-router-dom';
import './header.css';

const Header=()=>{
    return(
        <div className="home_header-container">
            <div className="home_reqm-container">ReqM !</div>
            <div className="home_link-container">
               <NavLink to="/product" className="home_link-inside-container">Product</NavLink>
               <NavLink to="/resource" className="home_link-inside-container">Resources</NavLink>
               <NavLink to="/pricing" className="home_link-inside-container">Pricing</NavLink>
               <NavLink to="/signin" className="home_link-container-button home_link-inside-container">Sign In</NavLink>
            </div>
        </div>
    );
}

export default Header;