import React, { Component } from 'react';

class Radio extends Component {
    render() {
        const { name, value, text, onChecked, checked } = this.props;
        return (
            <label>
                <input type="radio" name={name} checked={checked} value={value} onChange={onChecked} />
                {text}
            </label>
        );
    }
}

export default Radio;

