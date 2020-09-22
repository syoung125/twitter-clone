# TWITTER-CLONE (sytwitter:hatched_chick:)

<ul>
<li href="#1-set-up">#1 SET UP</li>
</ul>

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

#### Firebase Auth 사용

1. auth를 import (import "firebase/auth")

<details>
<summary><i>Absolute import</i></summary>

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

2. [firebase.auth.Auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
   - authService.currentUser: 유저의 로그인 여부를 알 수 있다
3. Firebase Auth 메뉴에서 Email/Password, Google, GitHub를 enabled 설정 함
4. src/routes/Auth.js에 form 만듦
5. [firebase.auth.EmailAuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.EmailAuthProvider)
   - [createUserWithEmailAndPassword](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword)
     - 회원가입 후 자동으로 로그인 됨
   - [signInWithEmailAndPassword](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword)
   - setPersistence란?
     - 사용자들을 어떻게 기억할 것인지 선택할 수 있게 해줌
       - local: default - 브라우저를 닫더라도 사용자 정보는 기억될 것
       - session: 탭이 열려 있는 동안에는 사용자 정보 기억
       - none: 유저를 기억하지 않음 (새로고침 -> 다시 로그인해야 함)

<details>
<summary><i>+ currentUser를 바로 설정할 수 없는 이유</i></summary>

- currentUser를 다음과 같이 설정하면 isLoggedIn값이 계속 null값이 된다.

```js
const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
```

- 2초간 한번씩 currentUser를 콘솔로 찍어보면 약 4초 이 후에 user값이 들어오는 것을 확일할 수 있다.
- 따라서 bool타입의 변수(init)를 선언하고(isLoading과 비슷한 역할), componetnDidMount의 기능을 하는 userEffect에서 onAuthStateChanged를 사용하여 user 상태가 있으면 페이지를 로딩한다.
- onAuthStateChanged: observer로 유저 상태가 변할 때 실행된다.
</details>
<br/>

6. 소셜 로그인: provider를 생성 -> signInWithPopup하면 된다. 간단!

7. 로그아웃: authService.signOut(); (/profile에서 구현했다.)
8. Redirect 방법
   - useLocation (Profile.js)
   ```js
   const history = useHistory();
   const onLogOutClick = () => {
     authService.signOut();
     history.push("/");
   };
   ```
   - Redirect (Router.js)
   ```js
   <Redirect from="*" to="/" />
   ```
   모든 url들을 "/"으로 보냄

## #3 TWEETING

#### Firebase Database 이용

1. Cloud Firestore에서 database생성
2. import "firebase/firestore" (fbase.js)
3. database는 collection을 갖고있고(폴더 같은거), colection은 document를 갖음 (collection: group of documents)

##### CRUD

- **CREATE**: dbService.collection(), **add({데이터})** 로 document 삽입 (Home.js) [참고](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#add)

```js
const onSubmit = async (e) => {
  e.preventDefault();
  await dbService.collection("sytweets").add({
    sytweet,
    createdAt: Date.now(),
    creatorId: userObj.uid,
  });
  setSytweet("");
};
```

creatorId 정보도 함께 저장 -> update, delete시 편함

- **READ**: **get()** 사용, get()은 QuerySnapshot(docs, metadata, size, empty, foreach 등)을 리턴 [참고](https://firebase.google.com/docs/reference/js/firebase.firestore.CollectionReference#get)

```js
const dbSytweets = await dbService.collection("sytweets").get();
dbSytweets.forEach((document) => console.log(document.data()));
```

- onSnapshot: 데이터베이스의 변화를 실시간으로 알려줌 (db에서 뭔가가 변하면 실행됨 -> 여기서 데이터 가져오기)

- **UPDATE, DELETE**

1. SYTWEET 컴포넌트 생성 -> 현재 접속 유저(userObj.uid)와 db date의 creatorId가 같은 경우만 편집, 삭제 가능
2. [DELETE](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#delete):

```js
await dbService.doc(`sytweet/${sytweetObj.id}`).delete();
```

3. [UPDATE](https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#update)

```js
await dbService.doc(`sytweets/${sytweetObj.id}`).update({
  text: newSytweet,
});
```

## #4 FILE UPLOAD

#### Firebase Storage 이용

- [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)를 사용하여 브라우저에서 파일을 읽는다
- [firebase.storage](https://firebase.google.com/docs/reference/js/firebase.storage) (import "firebase/storage";)
- [firebase.storage.Reference](https://firebase.google.com/docs/reference/js/firebase.storage.Reference): 파일을 업로드, 다운로드, 삭제 할 수 있음

#### 이미지 업로드

1. 이미지를 storage에 업로드한다.
2. 업로드된 url을 알아낸다.
3. database에 이미지의 url을 저장한다.

```js
const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
const response = await fileRef.putString(attachment, "data_url");
attechmentUrl = await response.ref.getDownloadURL(); // storage에 업로드된 url
```

- 이미지 랜덤 아이디 지정해야함 -> npm install uuid 사용

#### 이미지 delete

- url로 사진 삭제 가능
  - await storageService.refFromURL(sytweetObj.attachmentUrl).delete();

## #5 EDIT PROFILE

- [Update profile](https://firebase.google.com/docs/reference/js/firebase.User#updateprofile)

- displayName변경 -> Proifle에서 user객체를 받아서 form에서 변경
- firebase의 user.updateProfile 사용
  - 또는 user collection을 만들어서 user정보 저장 후 Read,Update
- currentUser정보가 바껴도 적용이 안되는이유(App.js - refreshUser()): 객체 크기가 너무 커서..!
- 해결: 1) object크기를 줄인다.

```js
// setUserObj(authService.currentUser); 이렇게 하는 대신
const user = authService.currentUser;
setUserObj({
  displayName: user.displayName,
  uid: user.uid,
  updateProfile: (args) => user.updateProfile(args),
});
```

## #6 FINISHING UP

[x] 코드 정리
[x] css 꾸미기
[x] 깃헙 deploying

- package.json에 script에 추가

```js
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
```

- npm run deploy
  - build 폴더 생성, 지정한(package.json의 homepage에) gh-pages에 업로드

(또는 github repository setting에서 publishing가능)

[x] firebase 보안

- publishing 하고 난 후 social 로그인 지원이 안된다.

  - firebase에서 이 웹페이지에서 해당 동작을 할 권한이 없다고 판단했기 때문

- firebase database [rule](https://firebase.google.com/docs/rules/get-started)을 변경할 수 있다. (storage에도 있음)
  - if request.auth != null; 로 해줌
  - 로그인 되어 있을 때만 read, write가능 [(이거)](https://firebase.google.com/docs/rules/basics#development-environment_rules)

[x] API Key Security

- https://console.developers.google.com/apis/credentials에서 프로젝트의 보안 설정 (firebase가 자동으로 만들어준것)
- *Browser key (auto created by Firebase)*에서 설정한 경로로만 api에 접근 가능하게 함
  - **firebase domain**을 꼭 넣어줘야 firebase 기능도 동작!
