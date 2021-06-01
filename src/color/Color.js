import React, { Component } from 'react';

class Color extends Component {
    render() {
        const { color, onChecked } = this.props;
        const name = "colorBox " + color;
        return (
            <div className="colorDiv">
                <label>
                    <div className={name} title={color} ></div>
                    <input type="radio" name="radioColor" value={color} onChange={onChecked}/>
                </label>
            </div>
        );
    }
}

export default Color;

