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
               <div className="container-fluid">
                 <div className="row">
                      <div className="col-2">
                        <a className="navbar-brand" href="/">
                            <img src={img} alt='logo' width="35px" height="35px" />
                        </a>
                    
                        </div>
                        <div className="col-8">
                         <p className="navbar-text">You are selecting content for {launch_by}</p>
                        </div>
                        <div className="col-2">
                        </div>     
                 </div> 
               </div>  
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



