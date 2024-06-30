import React from 'react';
import './Modal.css'

type ModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
};

const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal_wrapper">
            <div className="modal_container">
                <div className="modal_content">
                    {children}
                </div>
                <button className="modal_button" onClick={closeModal}>close</button>
            </div>
        </div>
    );
};

export default Modal;