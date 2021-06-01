import React, { Component } from 'react';
import './App.css';
import Color from './color/Color';
import Color2 from './color/Color2';
import Color3 from './color/Color3';
import Keyboard from './keyboard/Keyboard';
import Radio from './input/Radio';
import Modal from './modal/Modal';
import axios from 'axios';
const { useState, useRef } = React;


class App extends Component {
    state = {
        realData : [],
        colorList : ["red","gray","blue","white","green","orange","yellow","aquaBlue", "black", "purple", "brown","lightGreen"],
        checkedColor : "",
        selectedFile : null,
        keyboardList : [],
        defaultKeyboard : "realForce_tkl.json",
        isModalOpen : false,
        headerColor : 'gray',
        isModalLocal : true,
        isShowText : false,
        isKeyboardEvent : false,
        context : {
            isContext : false,
            word: '',
            lineNum: '',
            contextStyle :{

            },
        },
    }

    componentDidMount(){
        this._getKeyboardList();
        this._getKeyboard();

        setInterval(() => {
            const { colorList } = this.state;
            const color = colorList[Math.floor(Math.random() * colorList.length)];

            this.setState({
                headerColor:color,
            })

        }, 2000);
    }
    _getKeyboardList() {
        axios.post("http://localhost:8000/keyboardList", null, {

        }).then(res => {
            console.log(res.data);
            this.setState({
                keyboardList : res.data,
            })
        })
    }

    _getKeyboard(d) {
        const keyboard = (typeof d === "undefined" || d === null) ? this.state.defaultKeyboard : d;
        console.log(d)
        const apiUrl = 'json/' + keyboard;
        //const apiUrl = 'json/my.json';
        axios.get(apiUrl)
            .then(data => {
                //console.log(data);
                let real = []
                for(const key in data.data){
                    real.push(data.data[key]);
                }
                this.setState({realData: real, defaultKeyboard: keyboard});
            })
            .catch(error => {
                console.log(error);
            });
    }

    changeColor = (text, lineNum, colorName) => {
        colorName = (typeof colorName === 'undefined' || colorName === null) ? this.state.checkedColor : colorName;
        lineNum = parseInt(lineNum);
        //const colorName = this.state.checkedColor;
        if(typeof text === 'undefined' || text === null || text === "" || typeof colorName === 'undefined' || colorName === "")
        {
            return;
        }
        const {realData} = this.state;
        const data = [...realData];
        data.map((d,index) => {
            if(index === lineNum){
                d.map(({word, color}, index) => {
                    if(word === text){
                        d[index].color = colorName;
                    }
                })
            }
        })
        console.log(data);

        this.setState({
            realData: data
        });
    }

    changeColor2 = (code, colorName) => {
        colorName = (typeof colorName === 'undefined' || colorName === null) ? this.state.checkedColor : colorName;

        if(typeof colorName === 'undefined' || colorName === "") return;

        const {realData} = this.state;
        const data = [...realData];

        let isFinish = false;
        let index = 0;
        for(let d of data) {
            let i = 0;
            console.log(index)
            for(let d2 of d){
                if(d2.keyCode === code){
                    d2.color = colorName;
                    isFinish = true;
                    break;
                }
                i++;
            }
            if(isFinish) break;
            index++;
        }

        /*data.map((d,index) => {
            d.map(({keyCode, color}, index) => {
                console.log(index);
                if(keyCode === code){
                    d[index].color = colorName;
                    isFinish = true;
                    return false;
                }
            })

            if(isFinish) return false;
        })*/

        this.setState({
            realData: data
        });
    }

    checkedColorE = (e) => {

        this.setState({
            checkedColor: e.target.value
        });
    }

    onSelected = (e) => {
        this.setState({
            checkedColor: e.target.value
        });
    }

    onSaveBtnClick = (fileName) => {
        /*const {realData} = this.state;
        let a = JSON.stringify(realData,null,"\t")

        let FileSaver = require('file-saver');
        let file = new File([a], "mine.json", {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file);*/

        //////////////
        if(typeof fileName === 'undefined' || fileName === null || fileName === "")
        {
            alert("파일명을 작성해주세요");
            return;
        }

        const {realData} = this.state;
        const data = [...realData];
        let obj = {};
        data.map((d,index) => {
            obj[index] = d;
        })

        let a = JSON.stringify(obj,null,"\t")

        let FileSaver = require('file-saver');
        let file = new File([a], fileName+".json", {type: "text/plain;charset=utf-8"});

        FileSaver.saveAs(file);

        this.setState({
            isModalOpen: false,
        })

    }

    onNowUploadClick = (fileName) => {
        if(typeof fileName === 'undefined' || fileName === null || fileName === "")
        {
            alert("파일명을 작성해주세요");
            return;
        }

        const {realData} = this.state;
        const data = [...realData];
        let obj = {};
        data.map((d,index) => {
            obj[index] = d;
        })

        let a = JSON.stringify(obj,null,"\t")

        let file = new File([a], fileName+".json", {type: "text/plain;charset=utf-8"});
        const fodata = new FormData();
        fodata.append('file', file);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post("http://localhost:8000/upload", fodata, config).then(res => {
            console.log(res.statusText);
            this.fileEl.value = null;
            this._getKeyboardList();
            this.setState({
                selectedFile : null,
                isModalOpen: false,
            })
            alert("파일이 업로드 되었습니다");
        })
    }

    onReset = () => {
        this._getKeyboard();
    }

    onChangeHandler = (e) =>{
        this.setState({
            selectedFile : e.target.files[0],
            loaded:0,
        })

        console.log(e.target.files[0]);
    }

    onClickFileUpload = () => {
        const file = this.state.selectedFile;
        if(file === null){
            alert("파일을 선택해주세요");
            return;
        }

        if(file.name.split(".")[1].toUpperCase() !== "JSON"){
            this.fileEl.value = null;
            alert("JSON 파일 형식만 업로드 가능합니다.");

            this.setState({
                selectedFile : null,
            })

            return;
        }
        const data = new FormData();
        data.append('file', file);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        axios.post("http://localhost:8000/upload", data, config).then(res => {
            console.log(res.statusText);
            this.fileEl.value = null;
            this._getKeyboardList();
            this.setState({
                selectedFile : null,
            })
            alert("파일이 업로드 되었습니다");
        })
    }

    modalOpen = (e) => {
        const {isModalOpen, isModalLocal} = this.state;
        const isOpen = (isModalOpen) ? false : true;
        const isLocal = (e.target.name === 'local') ? true : false;

        console.log(e.target.name)
        this.setState({
            isModalOpen : isOpen,
            isModalLocal : isLocal,
        })
    }

    fileEl;
    onRefFile = (c) => { this.fileEl = c; };

    selectKeyboard;
    refKeyboard = (c) => { this.selectKeyboard = c; }

    onSelectedKeyboard = (e) => {
        console.log(e.target.value)
        this._getKeyboard(e.target.value)
    }

    mouseRightClick = (e) => {
        e.preventDefault();
        const word = e.target.getAttribute('word');
        const lineNum = e.target.getAttribute('linenum');
        const x = e.clientX;
        const y = e.clientY;

        const contextStyle ={
            maxWidth:360
            , height:30
            , position: 'absolute'
            , left:x
            , top:y
        }

        this.setState({
            context:{
                isContext : true,
                word : word,
                lineNum : lineNum,
                contextStyle : contextStyle
            }
        })
        console.log(e)
    }

    changeColorContext = (e) => {
        const color = e.target.title;
        const lineNum = e.target.parentElement.getAttribute('linenum');
        const word = e.target.parentElement.getAttribute('word');

        console.log(e);

        this.changeColor(word, lineNum, color);

        this.setState({
            context:{
                isContext:false,
            }
        })

    }

    closeContextEvent = (e) => {
        const {context} = this.state;
        if(context.isContext && e.target.className.indexOf("colorBox") < 0)
        {
            this.setState({
                context:{
                    isContext:false,
                }
            })
        }
    }

    checkedWord = (e) => {
        const isShowText = (e.target.value === "on") ? true : false;

        this.setState({
            isShowText:isShowText,
        })
    }

    onKeyPressed = (e) => {
        e.stopPropagation(); //F1, F5 등 이벤트를 막기위해

        const {checkedColor} = this.state;
        const {changeColor2} = this;
        console.log("KeyCode: " +e.keyCode + " }");
        //console.log("Code: " + e.code);
        changeColor2(e.keyCode, checkedColor)
    }

    onKeyDown = (e) => {
        e.preventDefault();
    }

    checkedKeyEvent = (e) =>{
        alert("*주의*  RealForce TKL(Ten Key Less) 모델만 지원합니다");
        const isKeyboardEvent = (e.target.value === "on") ? true : false;

        if(isKeyboardEvent)
        {
            window.addEventListener("keydown", this.onKeyDown, false);
            window.addEventListener("keyup", this.onKeyPressed, false);
        }
        else{
            window.removeEventListener("keydown", this.onKeyDown);
            window.removeEventListener("keyup", this.onKeyPressed);
        }

        this.setState({
            isKeyboardEvent:isKeyboardEvent,
        })
    }

    render() {
        const { realData, colorList, context, isKeyboardEvent, isShowText, checkedColor, keyboardList, defaultKeyboard, isModalOpen, headerColor, isModalLocal} = this.state;
        const { changeColor, checkedColorE, onSelected
            ,onSaveBtnClick, onReset, onChangeHandler
            , onClickFileUpload, onSelectedKeyboard, modalOpen
            , onNowUploadClick, mouseRightClick, changeColorContext
            , closeContextEvent
        } = this;

        const keyboard = keyboardList.map((data,index) => (<option key={index} value={data} > {data} </option>));
        const colorBox = colorList.map((data,index) => (<Color key={index} color={data} onChecked={checkedColorE} />));
        const colorContext = colorList.map((data,index) => (<Color3 key={index} color={data} onClick={changeColorContext}/>));
        const colorSelect = colorList.map((data,index) => (<Color2 key={index} color={data} />));

        const selecedColor = (checkedColor === "") ? '' : checkedColor;
        const header = "headerClass headerTran "+ headerColor;
        const keyboardName = defaultKeyboard.toUpperCase().split('.')[0];
        return (
            <div className="App" onClick={closeContextEvent} >
                <h1 className={header} >KeyCap Playing</h1>
                <div style={{height:30, marginBottom:5}}>
                    <b>Keyboard : </b>
                    <select ref={this.refKeyboard} style={{width: 200, height:30, margin: '0px 30px 0px 10px'}} value={defaultKeyboard} onChange={onSelectedKeyboard} >
                        {keyboard}
                    </select>
                    <b>Color : </b>
                    <select style={{width: 200, height: 30, margin: '0px 10px 0px 10px'}} className={selecedColor} onChange={onSelected} >
                        <option style={{backgroundColor: "white" }} value=""> 색상 선택 </option>
                        {colorSelect}
                    </select>
                    <span style={{marginLeft:20}}>
                        <b>Show Text : </b>
                        <Radio name="showText" text="On" checked={isShowText} value="on" onChecked={this.checkedWord} />
                        <Radio name="showText" text="Off" checked={!isShowText} value="off" onChecked={this.checkedWord} />
                    </span>

                    <span style={{marginLeft:20}}>
                        <b>Keyboard Event : </b>
                        <Radio name="keyboardEvent" text="On" checked={isKeyboardEvent} value="on" onChecked={this.checkedKeyEvent} />
                        <Radio name="keyboardEvent" text="Off" checked={!isKeyboardEvent} value="off" onChecked={this.checkedKeyEvent} />
                    </span>
                </div>
                <h2>{keyboardName}</h2>
                <div className="minWidth">
                    <table className="keyBoard">
                        <Keyboard data={realData} changeColor={changeColor} mouseRightClick={mouseRightClick} isShowText={isShowText} />
                    </table>
                </div>
                <div style={{margin:'10px 20px 0px 0px', height:33, border:'2px solid #c3b4b4', borderRadius:2, padding:5}}>
                    <div style={{float:'left', backgroundColor: '#e0eaf3', padding:4, borderRadius:4}}>
                        <input ref={this.onRefFile} type="file" name="file" onChange={onChangeHandler} />
                        <button type="button" onClick={onClickFileUpload}> 파일 업로드 </button>
                    </div>
                    <div style={{float:'right', marginRight:'10px'}}>
                        <button style={{width: 100, height: 30, margin:'0px 10px 0px 100px'}} onClick={onReset}>초기화</button>
                        <button style={{width: 150, height: 30, margin:'0px 10px 0px 0px'}} name="server" onClick={modalOpen}>현재 키보드 업로드</button>
                        <button style={{width: 100, height: 30}} name="local" onClick={modalOpen}>로컬 저장</button>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} isModalLocal={isModalLocal} fileDownload={onSaveBtnClick} nowFileUpload={onNowUploadClick} cancelBtn={modalOpen} inputId="fileNameTxt"/>
                {
                    context.isContext ?
                    <div style={context.contextStyle} word={context.word} lineNum={context.lineNum}>
                        {colorContext}
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default App;
