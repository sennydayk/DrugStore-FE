# Drug Store Web Page
> **Super Coding 2401 3차 프로젝트** <br/> **개발기간 : 2024.05.13. ~ 2024.06.23.**

<br>

## 배포 주소

> **프론트 배포 주소** : [https://drugstoreproject-seyeons-projects-fed8a2e8.vercel.app/]

<br>

## 웹개발 팀원소개
|      김세연       |          성세리         |       조현아         |                                                                                                               
| :------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | 
|   <img width="160px" src="https://avatars.githubusercontent.com/u/141703065?v=4" />    |                      <img width="160px" src="https://avatars.githubusercontent.com/u/65022003?v=4" />    |                   <img width="160px" src="https://avatars.githubusercontent.com/u/66656181?v=4/">   |
|   [@sennydayk](https://github.com/sennydayk)   |    [@Seongseri](https://github.com/Seongseri)  | [@hyeon-aa](https://github.com/hyeon-aa)  |
| SuperCoding 2401 기수 | SuperCoding 2401 기수 | SuperCoding 2401 기수 |

<br>

## 1. 프로젝트 소개

- Drug Store 웹 페이지는 유저들이 화장품과 생필품을 구매할 수 있는 쇼핑 사이트입니다.
- 유저는 회원가입과 로그인을 통해 개인정보를 등록하고 관리할 수 있습니다.
- 전체 상품 랭킹과 카테고리별 랭킹을 조회할 수 있으며, 원하는 정렬 기준에 따라 상품을 정렬하여 조회할 수 있습니다.
- 검색을 통해 원하는 상품을 빠르게 찾을 수 있으며, 관심 상품을 찜 목록에 추가하거나 삭제할 수 있습니다.
- 장바구니에 구매하고자 하는 상품을 보관하고, 장바구니에서 옵션 수정 및 상품 삭제를 할 수 있습니다.
- 제품을 구매한 뒤 구매한 상품에 대한 리뷰 작성, 수정, 삭제가 가능합니다.
- 상품에 대한 문의를 등록하고 답변을 확인할 수 있습니다.

<br>

## 2. 시작 가이드
### Requirements
For building and running the application you need:

- [Node.js v20.15.1](https://nodejs.org/en/download/package-manager)
- [Npm 9.2.0](https://www.npmjs.com/package/download)

### Installation
``` bash
$ git clone https://github.com/DrugStoreWeb/DrugStore-FE.git
$ cd DrugStore-FE
$ npm install
$ npm run master
```

---

<br>

## 3. 기술 스택
### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white) 
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white) 
![Vercel](https://img.shields.io/badge/Vercel-00000?style=for-the-badge&logo=Vercel&logoColor=white) 

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)        

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=purple)
![Css](https://img.shields.io/badge/Css-1572B6?style=for-the-badge&logo=Css&logoColor=white)

### Communication
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white)

---

<br>

## 4. 채택한 기술과 전략

### React, TypeScript, css

- **React**
  - 코드 컴포넌트화를 통해 재사용성과 추후 유지보수를 고려하였습니다.
  - Header, Footer, userInfo 등 중복되어 표시되는 부분이 많아 리소스 절약이 가능하였습니다.    
- **TypeScript**
  - 명시적인 Type 지정을 통해 런타임 에러를 줄이고 코드의 안정성을 높였습니다.
  - 컴파일 시점에서 Type Error 파악이 가능하여 디버깅 과정이 보다 편리하였습니다.
- **Css**
  - 코드의 가독성을 높이기 위해 스타일은 css 파일로 분리했습니다.
  - 스타일 충돌을 방지하기 위해 classname은 `페이지명-스타일명`으로 통일하였습니다.

### 브랜치 전략

- git-flow 전략을 기반으로 master, develop 브랜치와 보조 브랜치를 운용하였습니다.
  - **master** : 배포 단계에서만 사용하는 배포용 브랜치입니다.
  - **develop** : 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
  - **feature** : 기능 단위로 독립적인 개발 환경을 생성하여 개발한 뒤 merge 후 삭제하는 브랜치입니다. (ex. feature/mypage-reviewadd)

  <br>
  
## 5. 프로젝트 구조

폴더명.tsx 파일과 폴더명.css파일이 포함된 폴더는 하위 구조를 . 로 대체하였습니다.

```
📦DrugStore
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂jpeg
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂png
 ┃ ┃ ┗    .
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Best
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜Logo.tsx
 ┃ ┃ ┃ ┣ 📜Navigation.tsx
 ┃ ┃ ┃ ┗ 📜UserActions.tsx
 ┃ ┃ ┣ 📂ImageSlider
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂Like
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂MyPage
 ┃ ┃ ┃ ┗ 📜UserInfo.tsx
 ┃ ┃ ┣ 📂MyPageModal
 ┃ ┃ ┃ ┣ 📜MyPageModal.css
 ┃ ┃ ┃ ┣ 📜MyQuestion.tsx
 ┃ ┃ ┃ ┣ 📜ReviewAdd.tsx
 ┃ ┃ ┃ ┗ 📜ShowReview.tsx
 ┃ ┃ ┣ 📂MySideBar
 ┃ ┃ ┃ ┣ 📜MySideBar.css
 ┃ ┃ ┃ ┣ 📜MySideBar.tsx
 ┃ ┃ ┃ ┗ 📜MySideBarItem.tsx
 ┃ ┃ ┗ 📂SignupModal
 ┃ ┃ ┃ ┣ 📜EmailModal.tsx
 ┃ ┃ ┃ ┣ 📜NicknameModal.tsx
 ┃ ┃ ┃ ┗ 📜SignupModal.css
 ┃ ┣ 📂contexts
 ┃ ┃ ┗    .
 ┃ ┣ 📂hook
 ┃ ┃ ┣ 📜useLikehandler.tsx
 ┃ ┃ ┗ 📜useModal.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂AccountInfoFinder
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂Barchart
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂Categorypage
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂DetailReview
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂Detailpage
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂Dropdown
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂Mainpage
 ┃ ┃ ┃ ┣ 📜Mainpage.tsx
 ┃ ┃ ┃ ┗ 📜Product.tsx
 ┃ ┃ ┣ 📂Mypage
 ┃ ┃ ┃ ┣ 📜MyLikes.tsx
 ┃ ┃ ┃ ┣ 📜MyReviews.tsx
 ┃ ┃ ┃ ┣ 📜Mypage.css
 ┃ ┃ ┃ ┣ 📜Mypage.tsx
 ┃ ┃ ┃ ┣ 📜PurchaseHistory.tsx
 ┃ ┃ ┃ ┗ 📜Questions.tsx
 ┃ ┃ ┣ 📂OrderPay
 ┃ ┃ ┃ ┣ 📜Coupon.tsx
 ┃ ┃ ┃ ┣ 📜DeliveryInfo.tsx
 ┃ ┃ ┃ ┣ 📜DeliveryProduct.tsx
 ┃ ┃ ┃ ┣ 📜FinalPaymentInfo.tsx
 ┃ ┃ ┃ ┣ 📜OrderPay.css
 ┃ ┃ ┃ ┣ 📜OrderPay.tsx
 ┃ ┃ ┃ ┗ 📜TermsAgreement.tsx
 ┃ ┃ ┣ 📂Productdescription
 ┃ ┃ ┗    .
 ┃ ┃ ┣ 📂QnA
 ┃ ┃ ┃ ┣ 📜QnA.css
 ┃ ┃ ┃ ┣ 📜QnA.tsx
 ┃ ┃ ┃ ┣ 📜QnAItem.css
 ┃ ┃ ┃ ┣ 📜QnAItem.tsx
 ┃ ┃ ┃ ┣ 📜Question.css
 ┃ ┃ ┃ ┣ 📜Question.tsx
 ┃ ┃ ┃ ┣ 📜QuestionModal.css
 ┃ ┃ ┃ ┣ 📜QuestionModal.tsx
 ┃ ┃ ┃ ┗ 📜QuestioneditModal.tsx
 ┃ ┃ ┣ 📂ShopCart
 ┃ ┃ ┃ ┣ 📜CartOpionModal.css
 ┃ ┃ ┃ ┣ 📜CartOpionModal.tsx
 ┃ ┃ ┃ ┣ 📜ShopCart.css
 ┃ ┃ ┃ ┗ 📜ShopCart.tsx
 ┃ ┃ ┣ 📂Signup
 ┃ ┃ ┗    .
 ┃ ┃ ┗ 📂TabMenu
 ┃ ┃ ┗    .
 ┃ ┣ 📂store
 ┃ ┃ ┗    .
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.test.tsx
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜logo.svg
 ┃ ┣ 📜react-app-env.d.ts
 ┃ ┣ 📜react-star-ratings.d.ts
 ┃ ┣ 📜reportWebVitals.ts
 ┃ ┗ 📜setupTests.ts
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜tsconfig.json

```

---

<br>

## 6. 역할 소개

### 김세연 🐰

- README.md 작성
- **UI & 기능** : 회원가입, 이메일 인증, 마이페이지(회원정보 조회, 구매내역 조회, 좋아요 목록 조회, 리뷰 작성, 리뷰 수정, 리뷰 삭제, 리뷰내역 조회, 문의내역 조회)

### 성세리 🐻

- git respository 세팅
-  **UI & 기능** : 로그인, 아이디/비밀번호 찾기, 이메일 인증, 장바구니(추가, 수정, 삭제), 주문서 작성, 결제

### 조현아 🐱

-  **UI & 기능** : 홈, 상세페이지, 카테고리 페이지, 상품 정렬, 검색, 좋아요(등록, 취소), 문의(등록, 수정, 삭제)

---

<br>

## 7. 페이지별 기능

### [메인페이지]

- 서비스 초기화면으로 스토어의 상품 랭킹을 조회할 수 있습니다.
- image slider를 통해 시즌별 메인 상품을 확인할 수 있습니다.
- 판매량, 좋아요, 낮은가격, 리뷰평점, 신상품순으로 상품을 정렬하여 조회할 수 있습니다.
- 상품 하단의 아이콘을 클릭하여 좋아요 등록 및 취소를 할 수 있습니다.
- 화면 상단의 검색창에 원하는 검색어를 입력하여 상품을 빠르게 조회할 수 있습니다.

![메인페이지](https://github.com/user-attachments/assets/d855ea78-5705-41d4-a4fd-9d7e879168de)

![메인페이지 정렬](https://github.com/user-attachments/assets/494faa13-705d-4e4e-9d90-cd099dfb5c03)

![좋아요](https://github.com/user-attachments/assets/61ba97ba-0359-4beb-9571-441ae5264cb8)

![검색](https://github.com/user-attachments/assets/71b68690-baf8-443f-be0c-e9e490822bf6)

<br>

### [카테고리 페이지]

- 12가지의 상품 카테고리를 조회할 수 있습니다.
- 메인페이지와 동일한 정렬 기준을 카테고리 페이지에서 정렬하여 조회할 수 있습니다.

![카테고리 정렬](https://github.com/user-attachments/assets/fd883b7d-5129-42f9-9a44-cad774bcdd1c)

<br>

### [회원가입 페이지]

- 프로필 사진을 등록할 수 있습니다.
- 닉네임과 이메일은 중복확인을 통해 고유한 값으로 사용할 수 있습니다.
- 이메일 인증과 인증번호 확인 절차를 거칠 수 있습니다.
- 비밀번호는 8~!2자로 설정 가능하며, 비밀번호 확인을 통해 보안성을 높입니다.
- 모든 입력값을 작성해야 회원가입이 가능합니다.
- 이미 회원인 경우, 로그인 페이지로 이동할 수 있습니다.

<img width="1464" alt="회원가입 UI" src="https://github.com/user-attachments/assets/077e320f-29af-46bd-9ac3-8c9b8a5b771b">

![회원가입 프로필](https://github.com/user-attachments/assets/d0795456-d897-441b-b92f-9cd634400262)

![회원가입 중복확인](https://github.com/user-attachments/assets/5c4b213a-9297-4f79-ae80-28c8889bbbc8)

![회원가입 email](https://github.com/user-attachments/assets/04cc6ca4-6dea-4ee0-8f4f-e9301834ac97)

![회원가입 email 인증](https://github.com/user-attachments/assets/083eafe0-61e7-4635-a14d-9835286bae18)

<br>

### [로그인]

- 가입한 이메일과 비밀번호로 로그인이 가능합니다.
- 가입한 닉네임을 통해 이메일 찾기가 가능합니다.
- 가입한 이메일로 인증함으로써 비밀번호 재설정을 할 수 있습니다.
- 회원이 아닌 경우, 회원가입 페이지로 이동할 수 있습니다.

<img width="1468" alt="로그인 UI" src="https://github.com/user-attachments/assets/3e454465-ac76-45f3-abaf-5c9b326780c2">

<img width="1464" alt="이메일 찾기" src="https://github.com/user-attachments/assets/43d3d156-21fe-4c51-b9f9-56ded316cde5">

<img width="1464" alt="비밀번호 재설정" src="https://github.com/user-attachments/assets/f5ad65a8-c4f1-4999-94bd-8c779f0f751c">

<br>

### [상세페이지]

- 상품 상세설명과 해당 상품에 등록된 모든 리뷰, 문의내역을 조회할 수 있습니다.
- 배송정보와 결제 혜택에 관한 상세 내용은 모달창으로 확인할 수 있습니다.
- 상품의 옵션을 선택하고 예상 가격을 확인한 후 장바구니에 추가할 수 있습니다.

<img width="1463" alt="상세페이지 UI" src="https://github.com/user-attachments/assets/d1a784b6-2861-4869-b858-11b4f90db15c">

<img width="1468" alt="상세페이지 리뷰 UI" src="https://github.com/user-attachments/assets/17eedc69-63d8-44b3-b043-fde44b3ac6eb">

<img width="1465" alt="상세페이지 QnA UI" src="https://github.com/user-attachments/assets/91791d99-841e-4833-8011-87dbd2e066b9">

![장바구니 추가](https://github.com/user-attachments/assets/63f20fc5-aaca-4c7e-9db0-74c664e2b78a)

<br>

### [장바구니 페이지]

- 장바구니에 추가한 모든 상품을 조회할 수 있습니다.
- 상품의 옵션과 수량을 변경할 수 있습니다.
- 상품 선택삭제와 전체삭제, 선택주문과 전체주문이 가능합니다.

![장바구니 옵션변경](https://github.com/user-attachments/assets/ad63a27c-e106-4ca0-96b8-90c3befced01)

<br>

### [결제 페이지]

- 유저의 정보(연락처, 주소)를 확인하고 배송 메시지를 입력할 수 있습니다.
- 유저가 보유한 쿠폰의 종류와 개수를 확인하고 쿠폰을 적용할 수 있습니다.
- 유저가 결제수단을 선택하고 약관 동의를 한 뒤 결제가 가능합니다.

<img width="1461" alt="결제페이지 UI" src="https://github.com/user-attachments/assets/ac48452f-71be-4e8d-bcc2-a9b234def9b0">

![장바구니 결제](https://github.com/user-attachments/assets/381a5402-a07b-4e0d-b81a-be5175131703)

<br>

### [마이페이지 - 회원정보 조회]

- 회원가입 시 입력한 모든 정보를 조회할 수 있습니다.
- 유저가 보유한 포인트와 쿠폰을 조회할 수 있습니다.
  
<img width="1467" alt="마이페이지 회원정보 UI" src="https://github.com/user-attachments/assets/875dcff1-3ea1-409d-8d11-60b4cfa1b689">

<br>

### [마이페이지 - 찜 목록 조회]

- 유저가 좋아요를 등록한 상품을 모아볼 수 있습니다.
- 좋아요 취소가 가능합니다.

<img width="1458" alt="마이페이지 찜 목록 UI" src="https://github.com/user-attachments/assets/6982340e-8b5b-4775-8c48-964dd0468aaf">

<br>

### [마이페이지 - 구매내역 조회]

- 유저가 구매한 상품 목록을 조회할 수 있습니다.
- 상품 사진과 브랜드명, 상품명, 옵션명을 확인할 수 있습니다.
- 리뷰 작성 기간(구매 날짜로부터 1개월)을 확인할 수 있습니다.
- 구매한 상품에 대한 리뷰를 별점과 텍스트를 사용해서 작성할 수 있습니다.
- 이미 리뷰를 작성한 내역은 리뷰 작성 버튼이 비활성화됩니다.
  
<img width="1463" alt="마이페이지 구매내역 UI" src="https://github.com/user-attachments/assets/930e9ee4-f722-4885-a2f5-5b93a319c219">

![마이페이지 리뷰작성](https://github.com/user-attachments/assets/7ba1715c-23f6-46bb-a576-5b95d519a2ee)

<br>

### [마이페이지 - 리뷰내역 조회]

- 구매내역에서 작성한 모든 리뷰를 조회할 수 있습니다.
- 작성한 리뷰 수정 및 삭제가 가능합니다.
  
<img width="1461" alt="마이페이지 리뷰내역 UI" src="https://github.com/user-attachments/assets/1af34459-a187-4d77-ac69-a5c15b86abfb">

![마이페이지 리뷰수정](https://github.com/user-attachments/assets/389ac63f-e9b2-4924-9532-bdd94dbafa0a)

<br>

### [마이페이지 - 문의내역 조회]

- 유저가 상품 상세페이지에서 작성한 모든 문의를 조회할 수 있습니다.
- 답변 상태 여부를 답변완료, 답변대기로 확인할 수 있습니다.
- 문의 내용을 클릭하면 나타나는 모달창에서 제품 상세내역과 문의 작성일자, 답변 내용을 조회할 수 있습니다.
- 답변대기 상태인 경우, 모달창에 아직 답변이 작성되지 않았다는 메시지가 표시됩니다.
  
![마이페이지 문의](https://github.com/user-attachments/assets/b978436a-591e-4422-b437-bca7f4645db8)

---

<br>

## 8. 개선 목표

- API 모듈화 : API를 호출하는 코드의 반복이 많아서 모듈화할 예정입니다.
- SEO 증진
  - lighthouse 분석 시 Performance는 대체로 95~100점으로 우수합니다.
  - Best Practices와 SEO 점수가 상대적으로 미흡한 점을 고려하여 이를 증진할 수 있도록 개선할 예정입니다.
  
<img width="1319" alt="lighthouse" src="https://github.com/user-attachments/assets/115e0441-bcf0-459a-a7ea-dacbfbbee8c6">

---

<br>

## 9. 회고

- 처음 프로젝트를 시작하는 상황에서는 git을 통해 협업을 하는 과정이 익숙하지 않아서 적응하는 데 시간이 걸렸습니다. 하지만 프로젝트 후반부로 갈수록 팀원들 간의 코드리뷰가 활발해지고 소통이 원활해지는 과정을 겪으며 협업에 대한 자신감을 가질 수 있게 되었습니다.
- 작업을 진행할수록 초기 설정과 폴더 구조, 브랜치 전략이 중요하다는 점을 느꼈습니다. 폴더 구조 변경이 필요하거나 브랜치 운용에 있어 예상치 못한 상황이 발생하는 경우 팀원들 간의 충분한 소통과 협의가 필요했습니다. 사전에 좀 더 체계적인 전략을 세움으로써 작업 도중에 발생할 수 있는 다양한 상황을 예방할 수 있음을 알게 되었습니다.
- 프로젝트 후반부로 갈수록 시간에 쫓겨 버그를 해결하는 과정에서 충분한 이론 습득을 할 시간이 부족했던 점은 아쉬웠습니다. 프로젝트 마무리 이후 시간적 여유를 가지고 다시 한 번 복습하는 시간을 가지려면 발생한 버그와 해결 과정을 그때그떄 간단하게라도 기록해 두는 습관이 중요하다고 느꼈습니다.
