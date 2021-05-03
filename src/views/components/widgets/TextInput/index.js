import React from 'react';
import './TextInput.scss';

const TextInput = props => {
    const {inputType, value, placeholder, ...rest} = props;

    return (
        <input
            className="text-input"
            type={inputType}
            value={value}
            placeholder={placeholder}
            {...rest}
        />
    )
}

TextInput.defaultProps = {
    inputType: 'text'
}

export default TextInput;