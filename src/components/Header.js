import React from "react";
import logo from '../images/header/logo.svg';

function Header() {
    return (<header className="header">
        <img src={logo} className="header__logo" alt='логотип Mesto Russia'/>
    </header>);
}

export default Header;