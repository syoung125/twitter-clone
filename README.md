# TWITTER-CLONE (sytwitter)

## #1 SET UP

#### 1. Firebase 연결

- 설치: npm install --save firegbase
- 서버 실행: npm start
- config 정보는 .env파일에 변수로 저장
- github에 키 정보 등을 업로드하지 않기 위해

#### 2. Router 생성

- 설치: npm install react-router-dom
- Router 생성 경로: src > components > Router.js
- AppRouter Hook: isLoggedIn==false이면 로그인 페이지 Auth를 보여줌

```js
<Router exact path="/">
```

- exact: 해당 path와 비슷한 path가 여러개 있을 때 꼭 선언해주어야 한다.
  예를들어,

```js
<Switch>
  <Route path="/users" component={Users} />
  <Route path="/users/create" component={CreateUser} />
</Switch>
```

이렇게 두가지 path 가 있는 경우

- App안에 AppRouter를 사용하는 이유 - App에서 중복되는 부분인 예를들어 footer를 추가하는 경우가 생길 수도 있기 때문

## #2 AUTHENTICATION

#### 1.Firebase Auth 사용

- 먼저, auth를 import (import "firebase/auth")
<br/>
<details>
<summary>*Absolute import*</summary>
- 절대 경로로 import 할 수 있다.
- jsconfig.json 파일 생성

```js
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

</details>
<br/>

- [firebase.auth.Auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth):link:
  - authService.currentUser: 유저의 로그인 여부를 알 수 있다
