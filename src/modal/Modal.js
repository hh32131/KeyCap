import React from 'react';
import './Modal.css';
import Input from '../input/Input';

const Modal = ({isOpen, fileDownload, nowFileUpload, cancelBtn, inputId, isModalLocal}) => {
    const download = () => {
        const fileName = document.getElementById(inputId).value;
        if(isModalLocal){
            fileDownload(fileName);
        }
        else{
            nowFileUpload(fileName);
        }
    }

    return (
        <div>
        {
            isOpen ?
            <div className="Modal-overlay" >
                <div className="Modal">
                    <p className="title">File Upload Title</p>
                    <div className="content">
                        파일명 : <Input inputId={inputId}/>
                    </div>
                    <div className="button-wrap">
                        <button onClick={download}> 저장 </button>
                        <button onClick={cancelBtn}> 취소 </button>
                    </div>
                </div>
            </div>
        :
        null}
        </div>
    )
}
export default Modal;