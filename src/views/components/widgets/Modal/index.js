import React from 'react';
import './Modal.scss';
import {Button} from 'views/components/widgets';

const Modal = props => {
    const {title, close, children, ...rest} = props;
    
    return (
        <div className="modal">
            <div className="modal__overlay" onClick={close} />
            <div className="modal__wrapper">
                <div className="modal__header">
                    <h2>{title}</h2>
                    <Button title="X" onClick={close} />
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;