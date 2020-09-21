import * as firebase from "firebase/app";
import "firebase/auth";

// firebase 프로젝트 생성시 config 정보
/**
 * [#1.1 Securing the Keys]
 * .env파일에 변수로 만들어줌 (REACT_APP_을 앞에 붙여야 하는게 rule)
 * .env는 gitignore에 포함되어있으므로 내 정보를 github에 올리지 않음 (보안을 위함? ㄴㄴ 그냥 깃허브에만 올리지 않는 것)
 * => 하지만 완전히 막을 수 있는 것은 아니다.
 * 아예 숨길 수 있게 해주지 않음
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
