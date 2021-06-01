import React, { Component } from 'react';
import '../App.css';

const Basic = ({color, size}) => {
    return (
        <div className={ color + " " + size }>
        </div>
    )
}

export default Basic;
