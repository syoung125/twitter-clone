import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const user = authService.currentUser;
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
    return () => {};
  }, []);

  const refreshUser = () => {
    // setUserObj(authService.currentUser);
    // currentUser정보가 바껴도 적용이 안되는이유: 객체 크기가 너무 커서..!
    // 해결: 1) object크기를 줄인다.
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    // setUserObj(Object.assign({}, user));
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={user}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; sytwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
