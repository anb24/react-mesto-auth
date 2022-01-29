import React from "react";
import logo from '../images/header/logo.svg';
import NavBar from "./NavBar";
import {Link} from 'react-router-dom';

function Header({loggedIn, authState}) {
    return (<header className="header">
        <img src={logo} className="header__logo" alt='логотип Mesto Russia'/>
        {!loggedIn && <Link to={authState ? "/sign-in" : "/sign-up"} className="header__link">
            {authState ? "Войти" : "Регистрация"}
        </Link>}
    </header>);
}

export default Header;