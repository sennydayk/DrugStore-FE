import React from "react";
import "./SignupModal.css";

interface NicknameModalProps {
  nicknameModal: boolean;
  setNicknameModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NicknameModal: React.FC<NicknameModalProps> = ({
  nicknameModal,
  setNicknameModal,
}) => {
  if (!nicknameModal) return null;

  const closeModal = () => {
    setNicknameModal(false);
  };

  return (
    <div className="signup-modal-wrapper">
      <dialog className="signup-modal-container">
        <p>사용 가능한 닉네임입니다.</p>
        <button onClick={closeModal}>확인</button>
      </dialog>
    </div>
  );
};

export default NicknameModal;
