import React, { useState } from 'react';

type UseModalResult = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const useModal = (initialState = false): UseModalResult => {
    const [isOpen, setIsOpen] = useState(initialState);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return {
        isOpen, openModal, closeModal, //content
    };
};

export default useModal;