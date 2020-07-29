import React, { Component } from 'react'
import { connect } from 'react-redux';
import img from '../../assets/logo/full-logo/Blue-Logomark.png'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    state = {
    }

    render() {
        let launch_by = this.state.queryParams && this.state.queryParams.launch_by
        return (
            <div className="header">
                <nav className="navbar">
                    <a className="navbar-brand">
                        <img src={img} alt='logo' width="35px" height="35px" />
                    </a>
                    <p className="navbar-text">You are selecting content for {launch_by}</p>
                    <div>
                        <span className="hide">Exit</span> <FontAwesomeIcon icon={faSignOutAlt} className="signout" />
                    </div>
                </nav>
            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
        queryparams: state.rootReducer.mainReducer.queryParams
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)



