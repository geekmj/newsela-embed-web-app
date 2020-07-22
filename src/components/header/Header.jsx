import React from 'react'
import {Navbar,NavbarBrand} from 'reactstrap';
import img from '../../assets/logo/full-logo/1x/Artboard 1.png'

function Header() {
    return (
        <div className="header">
             <Navbar>
                 <NavbarBrand href="/">
                   <img src={img} alt='image1' width="100%" height="100%"/>
                 </NavbarBrand>
            </Navbar>
        </div>
    )
}

export default Header

