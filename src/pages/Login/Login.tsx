import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Kakao from "../../assets/png/kakao-talk.png";
import "./Login.css";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(true);

  const handleFindEmailClick = () => {
    navigate("/find-email");
  };

  const handleFindpasswordClick = () => {
    navigate("/find-email");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));

    try {
      const response = await axios.post(
        "https://drugstoreproject.shop/auth/login",
        {
          email: userEmail,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.headers["token"];
        console.log("token", token);
        setLoginCheck(false);
        login(token, userEmail);
        console.log("로그인성공, 아이디: " + userEmail);
        alert("로그인이 완료되었습니다. 홈으로 이동합니다.");
        navigate("/");
      } else {
        alert(
          "이메일 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
        );
        setLoginCheck(true);
      }
    } catch (error) {
      alert(
        "이메일 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
      );
      setLoginCheck(true);
    }
  };

  return (
    <div>
      <h1 className="login-title">로그인</h1>
      <div id="normalLogin_email">
        <div className="login_inputBox">
          <input
            id="login_member_email"
            name="member_email"
            placeholder="이메일"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <div className="login_inputBox_orderno"></div>
          <div className="login_inputBox_passwd">
            <div className="login_chk_passwd"></div>
            <input
              id="login_member_passwd"
              name="member_passwd"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login_utilMenu">
              <div>
                <button
                  type="button"
                  className="login_linkButton"
                  onClick={handleFindEmailClick}
                >
                  이메일 찾기 / 비밀번호 재설정
                </button>
              </div>
              <button
                type="button"
                className="login_linkButton right"
                onClick={handleSignUpClick}
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="btn loginBtn" onClick={handleLogin}>
          로그인
        </button>
        <div className="login_orSeparator">or</div>
        <button className="btn kakaoLoginBtn">
          <img src={Kakao} alt="카카오 로그인" />
          카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
