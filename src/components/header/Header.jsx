import React from 'react'
import {Navbar,NavbarBrand} from 'reactstrap';
import img from '../../assets/images/Blue-logo.png'

function Header() {
    return (
        <div className="header">
             <Navbar color="light" light expand="md">
                 <NavbarBrand href="/">
                   <img src={img} alt='image1' width="120px" height="25px"/>
                 </NavbarBrand>
            </Navbar>
        </div>
    )
}

export default Header

