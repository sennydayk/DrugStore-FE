import React from "react";
import "./SignupModal.css";

interface EmailModalProps {
  emailModal: boolean;
  setEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
  emailAuth: boolean;
  setEmailAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailModal: React.FC<EmailModalProps> = ({
  emailModal,
  setEmailModal,
  emailAuth,
  setEmailAuth,
}) => {
  if (!emailModal) return null;

  const closeModal = () => {
    setEmailModal(false);
    setEmailAuth(true);
  };

  return (
    <div className="signup-modal-wrapper">
      <dialog className="signup-modal-container">
        <p>사용 가능한 이메일입니다.</p>
        <button onClick={closeModal}>확인</button>
      </dialog>
    </div>
  );
};

export default EmailModal;
