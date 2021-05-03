import React from 'react';
import './Button.scss';

const Button = props => {
    const {title, ...rest} = props;
    
    return (
        <button className="button" {...rest}>
            {title}
        </button>
    )
}

export default Button;