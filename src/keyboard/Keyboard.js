import React, { Component } from 'react';
import '../App.css';
import Key from "../key/Key";

const TrLine = (data, fn, mouseRightClick, isShowText) => {
    let result = [];
    if(data.length !== 0 )
    {
        data.map((d,index) => {
            const td = Line(d, fn, index, mouseRightClick, isShowText);
            return result.push(td);
        })
    }

    return result;
}
const Line = (data, fn , index, mouseRightClick, isShowText) => {
    let result;
    if(data.length === 0){
        result = <td className="emptyLine"></td>;
    }
    else{
        result = data.map(({word, color, type, key}) => (
            <Key key={key} mouseRightClick={mouseRightClick}  isShowText={isShowText} color={color} type={type} word={word} changeColor={fn} lineNum={index}/>
    ));
    }
    return result;
};


class Keyboard extends Component {
    render() {
        const { data, changeColor, mouseRightClick, isShowText } = this.props;
        const listm = TrLine(data, changeColor, mouseRightClick, isShowText);
        const list = (listm.length === 0 ) ? [] : listm.map((data,index) => (<tr key={index}>{data}</tr>));

        return (
            <tbody>
                {list}
            </tbody>
        );
    }
}

export default Keyboard;
