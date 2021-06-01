import React, { Component } from 'react';
import './App.css';
import Key from './key/Key';
import ReactDOM from "react-dom";
const data = [
    {key:1, color:"red" , type: "basic"}
    , {key:2, type: "basic"}
    , {key:3, color:"gray" , type: "basic"}
    , {key:4, color:"gray" , type: "basic"}
    , {key:5, color:"gray" , type: "basic"}
    , {key:6, color:"gray" , type: "basic"}
    , {key:7, type: "empty"}
    , {key:8, color:"blue" , type: "basic"}
    , {key:9, color:"blue" , type: "basic"}
    , {key:10, color:"blue" , type: "basic"}
    , {key:11, color:"blue" , type: "basic"}
    , {key:12}
    , {key:13, color:"gray" , type: "basic"}
    , {key:14, color:"gray" , type: "basic"}
    , {key:15, color:"gray" , type: "basic"}
    , {key:16, color:"gray" , type: "basic"}
];
const emptyData = [];
const data1 = [
    {key:1, color:"gray" , type: "basic"}
    , {key:2, color:"gray" , type: "basic"}
    , {key:3, color:"gray" , type: "basic"}
    , {key:4, color:"gray" , type: "basic"}
    , {key:5, color:"gray" , type: "basic"}
    , {key:6, color:"gray" , type: "basic"}
    , {key:7, color:"gray" , type: "basic"}
    , {key:8, color:"gray" , type: "basic"}
    , {key:9, color:"gray" , type: "basic"}
    , {key:10, color:"gray" , type: "basic"}
    , {key:11, color:"gray" , type: "basic"}
    , {key:12, color:"gray" , type: "basic"}
    , {key:13, color:"gray" , type: "basic"}
    , {key:14, color:"blue" , type: "backSpace"}
];
const data2 = [
    {key:1, color:"blue" , type: "tab"}
    , {key:2, color:"gray" , type: "basic"}
    , {key:3, color:"gray" , type: "basic"}
    , {key:4, color:"gray" , type: "basic"}
    , {key:5, color:"gray" , type: "basic"}
    , {key:6, color:"gray" , type: "basic"}
    , {key:7, color:"gray" , type: "basic"}
    , {key:8, color:"gray" , type: "basic"}
    , {key:9, color:"gray" , type: "basic"}
    , {key:10, color:"gray" , type: "basic"}
    , {key:11, color:"gray" , type: "basic"}
    , {key:12, color:"gray" , type: "basic"}
    , {key:13, color:"gray" , type: "basic"}
    , {key:14, color:"blue" , type: "tab"}
];
const data3 = [
    {key:1, color:"blue" , type: "capsLock"}
    , {key:2, color:"gray" , type: "basic"}
    , {key:3, color:"gray" , type: "basic"}
    , {key:4, color:"gray" , type: "basic"}
    , {key:5, color:"gray" , type: "basic"}
    , {key:6, color:"gray" , type: "basic"}
    , {key:7, color:"gray" , type: "basic"}
    , {key:8, color:"gray" , type: "basic"}
    , {key:9, color:"gray" , type: "basic"}
    , {key:10, color:"gray" , type: "basic"}
    , {key:11, color:"gray" , type: "basic"}
    , {key:12, color:"gray" , type: "basic"}
    , {key:14, color:"blue" , type: "enter"}
];
const data4 = [
    {key:1, color:"blue" , type: "enter"}
    , {key:2, color:"gray" , type: "basic"}
    , {key:3, color:"gray" , type: "basic"}
    , {key:4, color:"gray" , type: "basic"}
    , {key:5, color:"gray" , type: "basic"}
    , {key:6, color:"gray" , type: "basic"}
    , {key:7, color:"gray" , type: "basic"}
    , {key:8, color:"gray" , type: "basic"}
    , {key:9, color:"gray" , type: "basic"}
    , {key:10, color:"gray" , type: "basic"}
    , {key:11, color:"gray" , type: "basic"}
    , {key:14, color:"blue" , type: "shift"}
];
const data5 = [
    {key:1, color:"blue" , type: "middle"}
    , {key:2, color:"blue" , type: "middle"}
    , {key:3, color:"blue" , type: "middle"}
    , {key:4, color:"gray" , type: "space"}
    , {key:5, color:"blue" , type: "middle"}
    , {key:6, color:"blue" , type: "middle"}
    , {key:7, color:"blue" , type: "middle"}
    , {key:8, color:"blue" , type: "middle"}
];

const realData = [
    data,
    emptyData,
    data1,
    data2,
    data3,
    data4,
    data5,
];

const Line = (data) => {
    let result;
    if(data.length == 0){
        result = <td className="emptyLine"></td>;
    }
    else{
        result = data.map(({key, color, type}) => (
            <Key key={key} color={color} type={type} word={key} />
        ));
    }
    return result;
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <table className="keyBoard">
                    <tbody>
                        <tr>{Line(data)}</tr>
                        <tr>{Line(emptyData)}</tr>
                        <tr>{Line(data1)}</tr>
                        <tr>{Line(data2)}</tr>
                        <tr>{Line(data3)}</tr>
                        <tr>{Line(data4)}</tr>
                        <tr>{Line(data5)}</tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
