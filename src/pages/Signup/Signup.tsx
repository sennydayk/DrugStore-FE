import React, { useEffect, useRef, useState } from "react";
import "./Signup.css";
import Avatar from "antd/es/avatar/avatar";
import NicknameModal from "../../components/SignupModal/NicknameModal";
import EmailModal from "../../components/SignupModal/EmailModal";
import { useNavigate } from "react-router-dom";
import View from "../../assets/png/view.png";
import Hide from "../../assets/png/hide.png";
import { type } from "os";
import { isDisabled } from "@testing-library/user-event/dist/utils";

// 회원가입 페이지

function Signup() {
  const [signupForm, setSignupForm] = useState({
    userName: "",
    userNickname: "",
    userEmail: "",
    userPassword: "",
    userPasswordCheck: "",
    userBirthday: "",
    userPhonenum: "",
    userAddress: "",
  });

  let navigate = useNavigate();

  // 페이지가 로드되면 최상단 input에 자동으로 포커스가 생성되도록 구현
  const nameFocus = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (nameFocus.current) {
      nameFocus.current.focus();
    }
  }, []);

  // 초기 프로필이미지 선언
  const [image, setImage] = useState<any>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const imgInput = useRef<HTMLInputElement>(null);

  // 프로필이미지 저장 로직
  const saveImg = () => {
    if (imgInput.current && imgInput.current.files) {
      const file = imgInput.current.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // 선택된 이미지를 상태에 저장
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 변환
    }
  };

  // 닉네임 중복확인 모달창 상태 선언
  const [nicknameModal, setNicknameModal] = useState<boolean>(false);
  const [validMessageNickname, setValidMessageNickname] = useState<string>("");

  // 이메일 중복확인 모달창 상태 선언
  const [emailModal, setEmailModal] = useState<boolean>(false);
  const [validMessageEmail, setValidMessageEmail] = useState<string>("");

  // 닉네임 중복 여부 상태 선언
  const [validNickname, setValidNickname] = useState<boolean>(false);

  // 이메일 인증하기 상태 선언
  const [emailAuth, setEmailAuth] = useState<boolean>(false);

  // 비밀번호 입력값 보이기 구현
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const handleShowPwd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPwd(!showPwd);
  };

  // 회원가입 로직 처리
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) {
      alert("프로필 이미지를 설정해주세요"); // 이미지를 선택하지 않았을 경우 경고창
      return;
    }

    const payload = {
      name: signupForm.userName,
      nickname: signupForm.userNickname,
      email: signupForm.userEmail,
      password: signupForm.userPassword,
      password_check: signupForm.userPasswordCheck,
      birthday: signupForm.userBirthday,
      phone_number: signupForm.userPhonenum,
      address: signupForm.userAddress,
    };

    const formData = new FormData();
    if (imgInput.current?.files) {
      formData.append("uploadFiles", imgInput.current.files[0]); // 폼 데이터에 이미지 파일 추가
      formData.append(
        "sign",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );
    }

    try {
      console.log("Submitting form data...");
      const response = await fetch("http://52.78.248.75:8080/auth/sign-up", {
        method: "POST",
        // 헤더에 Content-Type': 'multipart/form-data'를 설정할 필요 없음(브라우저가 자동으로 설정)
        body: formData,
      });
      if (
        signupForm.userName != "" &&
        signupForm.userNickname != "" &&
        signupForm.userEmail != "" &&
        signupForm.userPassword != "" &&
        signupForm.userPasswordCheck != "" &&
        signupForm.userBirthday != "" &&
        signupForm.userPhonenum != "" &&
        signupForm.userAddress != "" &&
        signupForm.userPassword === signupForm.userPasswordCheck
      ) {
        if (response.ok) {
          const data = await response.json();
          console.log("Response data:", data);
          if (response.status === 200) {
            alert(
              signupForm.userName +
                "님, 회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."
            );
            navigate("/login");
          } else if (response.status === 400) {
            alert("회원가입에 실패했습니다.");
          }
        } else {
          throw new Error("서버 요청 실패: " + response.status);
        }
      } else if (
        Object.values(payload).some((value) => value === "") &&
        signupForm.userPassword != signupForm.userPasswordCheck
      ) {
        alert("모든 입력값을 작성해주세요.");
        if (nameFocus.current) {
          nameFocus.current.focus();
        }
      } else if (signupForm.userPassword != signupForm.userPasswordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("오류가 발생했습니다. 오류명: ", error);
    }
  };

  // 닉네임 중복확인 로직 처리
  const checkNickname = async (nickname: string) => {
    try {
      const response = await fetch(
        "http://52.78.248.75:8080/auth/nickname-check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nickname),
        }
      );
      if (signupForm.userNickname === "") {
        alert("사용하실 닉네임을 입력해주세요.");
      } else if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const validMessageNickname = data.message;
          console.log(validMessageNickname);
          if (data.data.check === false) {
            setValidMessageNickname(data.data.message);
            setNicknameModal(!nicknameModal);
            setValidNickname(true);
          } else {
            setValidMessageNickname("이미 사용중인 닉네임입니다.");
            setNicknameModal(!nicknameModal);
          }
        } else {
          throw new Error("서버에서 JSON 형식의 응답을 반환하지 않았습니다.");
        }
      } else {
        throw new Error("서버 요청 실패: " + response.status);
      }
    } catch (error) {
      console.error("오류가 발생했습니다. 오류명: ", error);
    }
  };

  // 이메일 중복확인 로직 처리
  const checkEmail = async (email: string) => {
    try {
      const response = await fetch(
        "http://52.78.248.75:8080/auth/email-check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        }
      );
      if (signupForm.userEmail === "") {
        alert("사용하실 이메일을 입력해주세요.");
      } else if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          if (data.data.check === false) {
            setValidMessageEmail(data.data.message);
            setEmailModal(!emailModal);
          } else {
            setValidMessageEmail("이미 사용중인 이메일입니다.");
            setEmailModal(!emailModal);
          }
        } else {
          throw new Error("서버에서 JSON 형식의 응답을 반환하지 않았습니다.");
        }
      } else {
        throw new Error("서버 요청 실패: " + response.status);
      }
    } catch (error) {
      console.error("오류가 발생했습니다. 오류명: ", error);
    }
  };

  // 이메일 인증하기 로직 처리
  const handleEmailAuth = async () => {};

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
                  value={signupForm.userName}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      userName: e.target.value,
                    });
                  }}
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
                  value={signupForm.userNickname}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      userNickname: e.target.value,
                    });
                  }}
                />
              </td>
              <td>
                {validNickname ? (
                  <button
                    className="signup-btn-disabled"
                    type="button"
                    disabled
                  >
                    닉네임 중복확인
                  </button>
                ) : (
                  <button
                    className="signup-btn"
                    type="button"
                    onClick={() => checkNickname(signupForm.userNickname)}
                  >
                    닉네임 중복확인
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력해주세요"
                  value={signupForm.userEmail}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      userEmail: e.target.value,
                    });
                  }}
                  required
                />
              </td>
              <td>
                {emailAuth ? (
                  <button
                    className="signup-btn-disabled"
                    type="button"
                    disabled
                  >
                    이메일 중복확인
                  </button>
                ) : (
                  <button
                    className="signup-btn"
                    type="button"
                    onClick={() => checkEmail(signupForm.userEmail)}
                  >
                    이메일 중복확인
                  </button>
                )}
              </td>
              <td>
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
                  // type={showPwd ? "text" : "password"}
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={signupForm.userPassword}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      userPassword: e.target.value,
                    });
                  }}
                />
              </td>
              {/* <td>
                <button
                  className="signup-pwd-btn"
                  onClick={(e) => handleShowPwd}
                >
                  {showPwd ? (
                    <img src={Hide} className="signup-pwd-icon" />
                  ) : (
                    <img src={View} className="signup-pwd-icon" />
                  )}
                </button>
              </td> */}
            </tr>
            <tr>
              <th>비밀번호 확인</th>
              <td>
                <input
                  type="password"
                  name="passwordCheck"
                  placeholder="비밀번호를 한번 더 입력해주세요"
                  value={signupForm.userPasswordCheck}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      userPasswordCheck: e.target.value,
                    });
                  }}
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
                  value={signupForm.userPhonenum}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      userPhonenum: e.target.value,
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>
                <input
                  type="date"
                  name="birthday"
                  value={signupForm.userBirthday}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      userBirthday: e.target.value,
                    });
                  }}
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
                  value={signupForm.userAddress}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      userAddress: e.target.value,
                    });
                  }}
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
          validMessageNickname={validMessageNickname}
        />
      )}
      {emailModal && (
        <EmailModal
          emailModal={emailModal}
          setEmailModal={setEmailModal}
          emailAuth={emailAuth}
          setEmailAuth={setEmailAuth}
          validMessageEmail={validMessageEmail}
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
