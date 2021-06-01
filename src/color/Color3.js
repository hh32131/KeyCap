import React, { Component } from 'react';

class Color3 extends Component {
    render() {
        const { color, onClick } = this.props;
        const name = "colorBox " + color;

        return (
            <div className={name} title={color} onClick={onClick}></div>
        );
    }
}

export default Color3;

