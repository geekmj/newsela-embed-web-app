import React from 'react';

export default function ErrorFallback(props) {
    
    const { message } = props;
    return (<>{message}</>)
}