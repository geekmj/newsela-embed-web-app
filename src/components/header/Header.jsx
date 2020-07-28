import React from 'react'
import img from '../../assets/logo/full-logo/Blue-Logomark.png'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <div className="header">
            <nav className="navbar">
                <a className="navbar-brand" href="https://newsela.com/">
                    <img src={img} alt='logo' width="35px" height="35px"/>
                </a>
                 <p className="navbar-text">You are selecting content for Canvas</p>
                 <div>
                 <span className="hide">Exit</span> <FontAwesomeIcon icon={faSignOutAlt} className="signout"  />
                 </div>
            </nav>
        </div>
    )
}

export default Header

