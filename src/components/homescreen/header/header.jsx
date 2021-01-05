import React from 'react';
import { Route,NavLink } from 'react-router-dom';
import './header.css';

const Header=()=>{
    return(
        <div className="header-container">
            <div className="reqm-container">ReqM !</div>
            <div className="link-container">
               <NavLink to="/product" className="link-inside-container">Product</NavLink>
               <NavLink to="/resource" className="link-inside-container">Resources</NavLink>
               <NavLink to="/pricing" className="link-inside-container">Pricing</NavLink>
               <NavLink to="/signin" className="link-container-button link-inside-container">Sign In</NavLink>
            </div>
        </div>
    );
}

export default Header;