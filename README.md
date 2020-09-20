# TWITTER-CLONE (sytwitter)

## #1 SET UP

#### 1. firebase 연결

- 설치: npm install --save firegbase
- 서버 실행: npm start
- config 정보는 .env파일에 변수로 저장
- github에 키 정보 등을 업로드하지 않기 위해

#### 2. router 생성

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
