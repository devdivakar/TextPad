import './Header.css';
import React, { useState, useEffect } from "react";
import user from '../../assets/user.svg'
import logo from '../../assets/document.svg';
import {Link } from 'react-router-dom';

const Header = ()=>{


    return   <div className="header">
                <div className="name-icon">
                <span className="title">TextPad<img className="logo" src={logo}/></span>
                </div>
                <div className="user-auth">
                    <Link to='/auth'>
                    <img className="user-icon" src={user}/>
                    </Link>
                </div>
            </div>
}
export default Header;
