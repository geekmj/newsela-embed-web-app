import React, { Component } from 'react';
import './Loader.css'
import loader from '../../assets/images/Loading-Spinner.svg';

class Loader extends Component {

    render() {
        return (  <div className= {this.props.type == 'showMore' ? "upload-loading-img-showmore " : 'upload-loading-img' }>
            <div className={this.props.type == 'showMore' ? "upload-loading-showmore ": 'upload-loading'}><img src={loader} alt="Loading..." /></div>
        </div>
        )
    }
}

export default Loader;