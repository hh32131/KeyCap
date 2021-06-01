import React, { Component } from 'react';

class Color2 extends Component {
    render() {
        const { color } = this.props;
        return (
            <option value={color} className={color} >
            </option>
        );
    }
}

export default Color2;

