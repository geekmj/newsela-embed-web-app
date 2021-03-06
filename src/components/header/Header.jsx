import React, { Component } from 'react'
import { connect } from 'react-redux';
import Logo from '../../assets/logo/full-logo/White-Logomark.png'
import Logo1 from '../../assets/logo/full-logo/1x/White-Full-Logo.png'
import './Header.css'
import createHistory from 'history/createBrowserHistory'

class Header extends Component {
    state = {
        width:0
    }

    componentDidMount() {
        this.updateWindowWidth();
        window.addEventListener("resize", this.updateWindowWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowWidth);
    }

    updateWindowWidth = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {
        let launch_by = this.props.queryParams && this.props.queryParams.product_family
        const history = createHistory();


        return (
            <div className="header">
               <nav className="navbar">
                <div className="navbar-brand" onClick={() => history.go(0)}>
                    {this.state.width < 800 ? <img src={Logo} alt='logo' width="35px" height="35px"/>
                    : <img src={Logo1} alt='logo' width="100%" height="100%"/>}
                </div>
                <p className="navbar-text">Search and Embed content for {launch_by}</p>
                   <div>
                   </div> 
                 </nav>
            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
        queryParams: state.rootReducer.mainReducer.queryParams
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)



