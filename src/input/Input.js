const React = require('react');
const { useState, useRef, useEffect } = React;

const Input = ({inputId}) => {
    const [value, setValue] = useState('');
    const inputEl = useRef('');

    useEffect(() => {
        inputEl.current.focus();
    },[])

    return (
        <input
            style={{height: 20, borderRadius: 5}}
            ref={inputEl}
            value={value}
            id = {inputId}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

module.exports = Input;
