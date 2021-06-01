import React, { Component } from 'react';
import '../App.css';

class Key extends Component {
    render() {
        const { color, type, word, changeColor, lineNum, mouseRightClick, isShowText } = this.props;
        let name = (type == null) ? "key empty" : color + " key " + type;
        const a = (isShowText) ? word : "";
        return (
            <td word={word} linenum={lineNum} className={ name } onClick={ (e) => {changeColor(word, lineNum)}} onContextMenu={mouseRightClick}>
                <div style={{textAlign:"center", marginTop: 11, fontWeight:600}}>
                    {a}
                </div>
            </td>
        );
    }
}

export default Key;
