import * as firebase from "firebase/app";

// firebase 프로젝트 생성시 config 정보
const firebaseConfig = {
  apiKey: "AIzaSyBgLXjSaIl6kgMxnV4Te0hKl5Ah04cOlqs",
  authDomain: "sytwitter-e3bdc.firebaseapp.com",
  databaseURL: "https://sytwitter-e3bdc.firebaseio.com",
  projectId: "sytwitter-e3bdc",
  storageBucket: "sytwitter-e3bdc.appspot.com",
  messagingSenderId: "981267419581",
  appId: "1:981267419581:web:9a95967ff6800c233902d4",
};

export default firebase.initializeApp(firebaseConfig);
