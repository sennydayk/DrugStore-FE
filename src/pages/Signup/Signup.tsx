import React, { useEffect, useRef, useState } from "react";
import "./Signup.css";
import Avatar from "antd/es/avatar/avatar";
import NicknameModal from "../../components/SignupModal/NicknameModal";
import EmailModal from "../../components/SignupModal/EmailModal";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [signupForm, setSignupForm] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    passwordCheck: "",
    birthday: "",
    phonenum: "",
    address: "",
  });

  let navigate = useNavigate();

  // 페이지가 로드되면 최상단 input에 자동으로 포커스가 생성되도록 구현
  const nameFocus = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (nameFocus.current) {
      nameFocus.current.focus();
    }
  }, []);

  // input focus 상태 선언
  // const [inputFocus, setInputFocus] = useState<boolean>(false);
  // const handleInputFocus = () => {
  //   setInputFocus(true);
  // };
  // const handleInputBlur = () => {
  //   setInputFocus(false);
  // };

  // 초기 프로필이미지 선언
  const [image, setImage] = useState<string>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const imgInput = useRef<HTMLInputElement>(null);

  // 프로필이미지 저장 로직
  const saveImg = () => {
    if (imgInput.current && imgInput.current.files) {
      const file = imgInput.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  // 닉네임 중복확인 모달창 상태 선언
  const [nicknameModal, setNicknameModal] = useState<boolean>(false);
  const handleNicknameModal = () => {
    setNicknameModal(!nicknameModal);
  };

  // 이메일 중복확인 모달창 상태 선언
  const [emailModal, setEmailModal] = useState<boolean>(false);
  const handleEmailModal = () => {
    setEmailModal(!emailModal);
  };

  // 이메일 인증하기 상태 선언
  const [emailAuth, setEmailAuth] = useState<boolean>(false);
  const handleEmailAuth = () => {};

  // 비밀번호 입력값 보이기 구현
  // const [showPwd, setShowPwd] = useState<boolean>(false);
  // const handleShowPwd = (event) => {
  //   event.preventDefault();
  //   setShowPwd(!showPwd);
  // };

  // 회원가입 버튼 클릭 시 회원가입 로직 처리
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 회원가입 처리 로직 추가
  };

  return (
    <div className="signup-wrapper">
      <h1 className="signup-title">회원가입</h1>
      <form onSubmit={handleSubmit}>
        <table className="signup-table">
          <Avatar src={image} size={120} className="signup-profile" />
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            ref={imgInput}
            onChange={saveImg}
          />
          <button
            className="signup-profile-btn"
            onClick={() => imgInput.current && imgInput.current.click()}
          >
            이미지 선택
          </button>
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="이름을 입력해주세요"
                  value={signupForm.name}
                  onChange={handleChange}
                  ref={nameFocus}
                />
              </td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>
                <input
                  type="text"
                  name="nickname"
                  placeholder="닉네임을 입력해주세요"
                  value={signupForm.nickname}
                  onChange={handleChange}
                />
                <button
                  className={
                    nicknameModal ? "signup-btn-disabled" : "signup-btn"
                  }
                  type="button"
                  onClick={handleNicknameModal}
                >
                  닉네임 중복확인
                </button>
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력해주세요"
                  value={signupForm.email}
                  onChange={handleChange}
                  required
                />
                <button
                  className={emailAuth ? "signup-btn-disabled" : "signup-btn"}
                  type="button"
                  onClick={handleEmailModal}
                >
                  이메일 중복확인
                </button>
                {emailAuth && (
                  <button
                    className="signup-btn"
                    type="button"
                    onClick={handleEmailAuth}
                  >
                    이메일 인증하기
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={signupForm.password}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>비밀번호 확인</th>
              <td>
                <input
                  type="password"
                  name="passwordCheck"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  value={signupForm.passwordCheck}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>휴대폰번호</th>
              <td>
                <input
                  type="tel"
                  name="phonenum"
                  placeholder="- 제외 숫자만 입력해주세요"
                  value={signupForm.phonenum}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>
                <input
                  type="date"
                  name="birthday"
                  value={signupForm.birthday}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>주소</th>
              <td>
                <input
                  type="text"
                  name="address"
                  placeholder="주소를 입력해주세요"
                  value={signupForm.address}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="signup-btn-main" type="submit">
          회원가입
        </button>
      </form>
      {nicknameModal && (
        <NicknameModal
          nicknameModal={nicknameModal}
          setNicknameModal={setNicknameModal}
        />
      )}
      {emailModal && (
        <EmailModal
          emailModal={emailModal}
          setEmailModal={setEmailModal}
          emailAuth={emailAuth}
          setEmailAuth={setEmailAuth}
        />
      )}
      <div className="signup-footer">
        <p>이미 회원이신가요?</p>
        <button onClick={() => navigate("/login")}>로그인하기</button>
      </div>
    </div>
  );
}

export default Signup;
