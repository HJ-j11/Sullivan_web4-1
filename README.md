# Sullivan_web4 - 프로젝트 유지 보수 중

## 사용 기술
- 사용 언어 및 프레임워크 : Node.js + Express
- 데이터 베이스 : Maria DB
- 템플릿 : Boostrap + nunjucks
- 배포 : Firebase(Supabase도 고려 중)

(기존 : Boostrap + jQuery + 제한적 API(https://www.apispreadsheets.com/) 사용) 

## 프로젝트 설명

#### 목적
웹 입문자를 위한 기초 웹 콘텐츠 제작물(HTML, CSS, JavaScript) 
#### 기간
2021.04 ~ 2021. 08
#### 인원 
3명 (프론트2, 백엔드 1)

#### 기능
- 로그인(추가 예정)
- 댓글 작성
- 댓글 조회
- 비밀글/공개글(추가 예정) 

## 화면 
- 홈
<img src="/img/Home.PNG" width="600px">

- 방명록 작성
<img src="/img/Form.PNG" width="600px">

- 방명록 리스트
<img src="/img/List.PNG" width="600px">

- 로그인 
<img src="/img/Login.PNG" width="600px">

- 회원가입
<img src="/img/SignUp.PNG" width="600px">

<br>

## API 명세서

사용자 
|Function|URL|Method|Description|
|--------|---|------|-----------|
|홈|/|GET|처음 화면|
|방명록 리스트|/list|GET|방명록 목록|
|방명록 작성|/new|GET|방명록 작성 form 이동|
|방명록 작성|/write|POST|방명록 작성|
|로그인|/login|GET|로그인 화면 이동|
|회원가입|/signup|GET|회원가입 화면 이동|
|회원가입|/join|POST|회원가입 양식 작성|
