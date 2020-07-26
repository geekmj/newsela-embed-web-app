import React, { Component } from 'react';
import './Loader.css'
import loader from '../../assets/images/Loading-Spinner.svg';

class Loader extends Component {

    render(){
        return (
            <div className='upload-loading-img'>
             <div className='upload-loading'><img src={loader} alt="Loading..."/></div>
            </div>
        )
    }
}

export default Loader;