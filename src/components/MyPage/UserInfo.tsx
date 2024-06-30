import React, { useEffect, useState } from "react";
import styled from "styled-components";
import testimg from "../../assets/jpeg/test.jpeg";
import axios from "axios";

interface UserInfoHeader {
  profile: string;
  nickName: string;
  money: number;
  couponResponseList: any[];
}

const UserInfo: React.FC = () => {
  // styled-components
  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    height: 100px;
    margin: auto;
    margin-top: 50px;
    background-color: #97e7e1;
    border-radius: 8px;
  `;

  const Left = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const Profile = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
  `;

  const LeftText = styled.span`
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
  `;

  const RightText = styled.span`
    font-size: 14px;
    font-weight: bold;
    margin-left: 60px;
  `;

  const [userInfoHeader, setUserInfoHeader] = useState<UserInfoHeader | null>(
    null
  );
  const [profile, setProfile] = useState<any>(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const [nickName, setNickName] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  // userinfo API 가져오기
  const getData = async () => {
    const token = sessionStorage.getItem("token");
    console.log("token", token);

    if (!token) {
      console.error("No token found in sessionStorage.");
      return;
    }

    const config1 = {
      method: "get",
      url: "https://drugstoreproject.shop/mypage/coupon",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    };

    const config2 = {
      method: "get", // HTTP 메서드
      url: "https://drugstoreproject.shop/mypage/userInfo",
      data: {},
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    };

    try {
      const response1 = await axios(config1);
      const response2 = await axios(config2);
      setUserInfoHeader(response1.data.data);
      setProfile(response2.data.data.profilePic);
      setNickName(response2.data.data.nickName);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching data: ", error.message);
        console.error("Response: ", error.response);
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  };

  return (
    <Wrapper>
      {userInfoHeader ? (
        <Container>
          <Left>
            <Profile src={profile} />
            <LeftText>{nickName}님 반갑습니다</LeftText>
          </Left>
          <div>
            <RightText>내 포인트 : {userInfoHeader.money}점</RightText>
            <RightText>
              내 쿠폰 : {userInfoHeader.couponResponseList.length}장
            </RightText>
          </div>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </Wrapper>
  );
};

export default UserInfo;
