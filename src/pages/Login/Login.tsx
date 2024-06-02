import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Login.css";
import Kakao from "../../assets/png/kakao-talk.png";

const LoginForm: React.FC = () => {
  const navigate = useNavigate(); // useHistory Hook을 사용하여 history 객체를 생성합니다.

  // 이메일 찾기 버튼 클릭 이벤트 핸들러
  const handleFindEmailClick = () => {
    navigate("/find-email");
  };

  return (
    <div>
      <Header />
      <h1 className="login-title">로그인</h1>
      <div id="normalLogin_id">
        <div className="login_inputBox">
          <input id="login_member_id" name="member_id" placeholder="아이디" />
          <div className="login_inputBox_orderno"></div>
          <div className="login_inputBox_passwd" style={{ display: "block" }}>
            <div
              className="login_chk_passwd"
              style={{ display: "block" }}
            ></div>
            <input
              id="login_member_passwd"
              name="member_passwd"
              type="password"
              placeholder="비밀번호"
            />
            <div className="login_utilMenu">
              <div>
                <button
                  className="login_linkButton"
                  onClick={handleFindEmailClick}
                >
                  이메일 찾기
                </button>
                <span>/</span>
                <button className="login_linkButton">비밀번호 재설정</button>
              </div>
              <button className="login_linkButton right">회원가입</button>
            </div>
          </div>
        </div>
        <button className="btn loginBtn">로그인</button>
        <div className="login_orSeparator">or</div>
        <button className="btn kakaoLoginBtn">
          <img src={Kakao} />
          카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
