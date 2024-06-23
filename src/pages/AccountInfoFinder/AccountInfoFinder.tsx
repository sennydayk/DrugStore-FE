import React, { useState, ChangeEvent } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import "./AccountInfoFinder.css";

interface EmailAuthResponse {
  message: string;
  emailSent: boolean;
}

interface VerifyEmailResponse {
  message: string;
  isValid: boolean;
}

interface PasswordResetResponse {
  message: string;
  success: boolean;
}

function AccountInfoFinder() {
  const [selectedTab, setSelectedTab] = useState("email_find");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showVerifyInput, setShowVerifyInput] = useState(false);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  // 이메일 형식을 검사하는 함수
  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  // 이메일 입력 필드의 onChange 이벤트 핸들러
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    setIsEmailValid(validateEmail(emailInput));
    setShowVerifyInput(false);
  };

  // 이메일 인증 버튼 클릭 핸들러
  const handleVerifyEmailClick = async () => {
    if (isEmailValid) {
      try {
        const response: AxiosResponse<EmailAuthResponse> = await axios.post(
          "https://drugstoreproject.shop/email/send",
          { email }
        );
        console.log(response.data);
        setShowVerifyInput(true);
        alert(`인증 이메일이 ${email} 로 전송되었습니다.`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFindEmailSubmit = async () => {
    const nickname = (document.getElementById("u_nickname") as HTMLInputElement)
      ?.value;
    const phoneNumber = (
      document.getElementById("u_phonenumber") as HTMLInputElement
    )?.value;

    try {
      const response: AxiosResponse<VerifyEmailResponse> = await axios.post(
        "https://drugstoreproject.shop/auth/find-email",
        { nickname, phoneNumber }
      );
      const { message, isValid } = response.data;
      if (isValid) {
        alert(`이메일 찾기 결과: ${message}`);
      } else {
        alert(`이메일 찾기 실패: ${message}`);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        alert("닉네임과 휴대폰에 해당하는 유저를 찾을 수 없습니다.");
      } else {
        alert("이메일 찾기 중 오류가 발생했습니다.");
      }
    }
  };

  const handlePasswordReset = async () => {
    const newPassword = (document.getElementById("u_pwd") as HTMLInputElement)
      ?.value;
    const verifyPassword = (
      document.getElementById("u_pwd_check") as HTMLInputElement
    )?.value;
    const verifyNumber = (
      document.getElementById("verify_number_input") as HTMLInputElement
    )?.value;

    try {
      const response: AxiosResponse<PasswordResetResponse> = await axios.put(
        "https://drugstoreproject.shop/auth/password",
        { email, newPassword, verifyNumber }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="container">
      <div id="wrap">
        <ul id="accountinfofind">
          <li>
            <a
              href="#email_find"
              className={selectedTab === "email_find" ? "selected1" : ""}
              onClick={() => handleTabClick("email_find")}
            >
              이메일 찾기
            </a>
          </li>
          <li>
            <a
              href="#pwd_find"
              className={selectedTab === "pwd_find" ? "selected2" : ""}
              onClick={() => handleTabClick("pwd_find")}
            >
              비밀번호 재설정
            </a>
          </li>
        </ul>
        <div id="accountinfofind_con">
          {selectedTab === "email_find" && (
            <div id="email_find" className="accountinfofind_box">
              <form action="#" method="post">
                <p>
                  <input
                    type="text"
                    placeholder="닉네임"
                    id="u_nickname"
                    autoComplete="off"
                  />
                </p>
                <p>
                  <input
                    type="text"
                    placeholder="전화번호(-없이)"
                    id="u_phonenumber"
                    autoComplete="off"
                  />
                </p>
                <p id="btn_wrap1">
                  <input
                    type="button"
                    value="이메일 찾기"
                    id="s_btn1"
                    onClick={handleFindEmailSubmit}
                  />
                </p>
              </form>
            </div>
          )}
          {selectedTab === "pwd_find" && (
            <div id="pwd_find" className="accountinfofind_box">
              <form action="#" method="post">
                <div
                  id="email_container"
                  className={isEmailValid ? "email-valid" : ""}
                >
                  <input
                    type="text"
                    placeholder="이메일"
                    id="u_email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {isEmailValid && (
                    <input
                      type="button"
                      value="이메일 인증"
                      id="verify_email_btn"
                      onClick={handleVerifyEmailClick}
                    />
                  )}
                </div>
                {showVerifyInput && (
                  <input
                    type="text"
                    placeholder="인증번호 입력"
                    id="verify_number_input"
                  />
                )}
                <p>
                  <input type="text" placeholder="비밀번호 변경" id="u_pwd" />
                </p>
                <p>
                  <input
                    type="text"
                    placeholder="비밀번호 확인"
                    id="u_pwd_check"
                  />
                </p>
                <p>
                  <input type="button" value="비밀번호 변경" id="s_btn3" />
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountInfoFinder;
