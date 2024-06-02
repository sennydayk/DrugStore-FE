import React, { useState } from "react";

// 상태 타입 정의
interface AccountInfoFinderState {
  name: string;
  phoneNumber: string;
  email: string;
  authNumber: string;
}

function AccountInfoFinder() {
  // 상태 관리를 위한 Hooks에 타입 적용
  const [name, setName] = useState<AccountInfoFinderState["name"]>("");
  const [phoneNumber, setPhoneNumber] =
    useState<AccountInfoFinderState["phoneNumber"]>("");
  const [email, setEmail] = useState<AccountInfoFinderState["email"]>("");
  const [authNumber, setAuthNumber] =
    useState<AccountInfoFinderState["authNumber"]>("");

  return (
    <div id="container">
      <div id="content">
        <div className="find_idpw_area">
          <h3 className="find_title">아이디/비밀번호 찾기</h3>
          <div className="find_tab">
            <a
              href="/user/findid"
              className="find_tab_left active"
              role="button"
            >
              <span>아이디 찾기</span>
            </a>
            <a href="/user/findpasswd" className="find_tab_right" role="button">
              <span>비밀번호 찾기</span>
            </a>
          </div>
          <div className="ct_id" id="js_input">
            <form className="find_form" action="POST">
              <fieldset className="find_fds">
                <legend className="find_leg">아이디 찾기</legend>
                {/* 휴대전화 인증 */}
                <div id="id_find_type" className="find_type checked">
                  <label className="find_type_label">
                    <input
                      id="id_find_info"
                      type="radio"
                      name="find_info"
                      className="find_type_radio"
                      value="byhp"
                      attr-opt="info"
                      checked
                    />
                    <i></i>
                    <em className="find_type_title">휴대전화로 찾기</em>
                    <span className="find_type_desc">
                      가입 당시 입력한 휴대전화 번호를 통해 아이디를 찾을 수
                      있습니다.
                    </span>
                  </label>
                </div>
                {/* 입력 필드들 */}
                {/* 이름 입력 */}
                <div className="find_inputs">
                  <label className="find_input_label">
                    <span className="find_input_text">이름</span>
                    <input
                      type="text"
                      className="find_input_default"
                      id="txt_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <span
                    className="find_input_warn"
                    id="guide_txt_name"
                    style={{ display: "none" }}
                  >
                    이름을 입력해주세요.
                  </span>
                </div>
                {/* 휴대전화 입력 */}
                <div className="find_inputs iefix">
                  <label className="find_input_label">
                    <span className="find_input_text">휴대전화</span>
                    <input
                      type="text"
                      id="hp2"
                      title="휴대폰번호 "
                      className="find_input_small onlynumber"
                      maxLength={4}
                      style={{ width: "90px" }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </label>
                  <span
                    className="find_input_warn"
                    id="guide_userHp"
                    style={{ display: "none" }}
                  >
                    휴대전화 번호를 입력해주세요.
                  </span>
                </div>
                {/* 인증번호 입력 */}
                <div className="find_inputs">
                  <label className="find_input_label">
                    <span className="find_input_text">인증번호</span>
                    <span className="find_input_wrap">
                      <input
                        type="text"
                        id="txt_cfmnum"
                        className="find_input_gray"
                        placeholder="인증번호 6자리 숫자 입력"
                        readOnly
                        value={authNumber}
                        onChange={(e) => setAuthNumber(e.target.value)}
                      />
                    </span>
                  </label>
                  <span
                    className="find_input_warn"
                    id="guide_cfmnum"
                    style={{ display: "none" }}
                  >
                    인증번호를 입력해주세요.
                  </span>
                </div>
                {/* 이메일 인증 */}
                <div className="find_type">
                  <label className="find_type_label">
                    <input
                      type="radio"
                      name="find_info"
                      className="find_type_radio"
                      value="byemail"
                      attr-opt="info"
                    />
                    <i></i>
                    <em className="find_type_title">이메일로 찾기</em>
                    <span className="find_type_desc">
                      가입 당시 입력한 이메일 주소를 통해 아이디를 찾을 수
                      있습니다.
                    </span>
                  </label>
                </div>
                {/* 이메일 입력 */}
                <div className="find_inputs">
                  <label className="find_input_label">
                    <span className="find_input_text">이메일</span>
                    <input
                      type="text"
                      className="find_input_medium"
                      id="txt_mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <a
                      className="find_input_btn"
                      role="button"
                      style={{ cursor: "pointer" }}
                      data-method="EMAIL"
                    >
                      <span>인증번호</span>
                    </a>
                  </label>
                  <span
                    className="find_input_warn"
                    id="guide_userMail"
                    style={{ display: "none" }}
                  >
                    이메일 주소를 입력해주세요.
                  </span>
                </div>
              </fieldset>
              <div className="find_footer">
                <p className="find_footer_desc">
                  <i></i>본인 인증시 제공되는 정보는 인증 이외의 용도로 이용
                  또는 저장하지 않습니다.
                </p>
                <p className="find_footer_desc">
                  <i></i>인증문자/이메일이 발송되지 않을 경우 ‘티몬’연락처가
                  스팸으로 분류되어 있는지 확인 바랍니다.
                </p>
                <a
                  className="find_footer_btn"
                  role="button"
                  id="btnFind"
                  style={{ cursor: "pointer" }}
                >
                  <span>다음</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfoFinder;
