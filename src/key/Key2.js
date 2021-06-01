import React, { Component } from 'react';
import '../App.css';

const onClick = () => {
    alert("s");
}

const Key = ({color, type}) => {
    let name = "";

    if(type == null){
        name = "key empty";
    }
    else{
        name = color + " key " + type;
    }

    return (
        <td className={ name } onClick={onClick}>
        </td>
    )
}

export default Key;
