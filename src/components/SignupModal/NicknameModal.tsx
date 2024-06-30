import React from "react";
import "./SignupModal.css";

interface NicknameModalProps {
  nicknameModal: boolean;
  setNicknameModal: React.Dispatch<React.SetStateAction<boolean>>;
  validMessageNickname: string;
}

const NicknameModal: React.FC<NicknameModalProps> = ({
  nicknameModal,
  setNicknameModal,
  validMessageNickname,
}) => {
  if (!nicknameModal) return null;

  const closeModal = () => {
    setNicknameModal(false);
  };

  return (
    <div className="signup-modal-wrapper">
      <dialog className="signup-modal-container">
        <p>{validMessageNickname}</p>
        <button onClick={closeModal}>확인</button>
      </dialog>
    </div>
  );
};

export default NicknameModal;
