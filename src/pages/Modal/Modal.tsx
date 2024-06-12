import React from 'react';

type modalProps = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    children: React.ReactNode; /* Property 'children' does not exist on type '{}'. */
    // content
};


const Modal = ({ isOpen, openModal, closeModal }: modalProps) => {
    return (
        <div>
            <div>
                //content
            </div>
            <button className="button-default" onClick={closeModal}>close</button>
        </div>
    );
};

export default Modal;