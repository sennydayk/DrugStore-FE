import React from "react";
import styled from "styled-components";
import testimg from "../../assets/jpeg/test.jpeg";

function UserInfo() {
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
    width: 40px;
    height: 40px;
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
    margin-left: 20px;
  `;

  return (
    <Wrapper>
      <Container>
        <Left>
          <Profile src={testimg} />
          <LeftText>userid님 반갑습니다</LeftText>
        </Left>
        <div>
          <RightText>내 포인트 : userpoint</RightText>
          <RightText>내 쿠폰 : usercoupon</RightText>
        </div>
      </Container>
    </Wrapper>
  );
}

export default UserInfo;
