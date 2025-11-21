import React from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase";

function Login() {
  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Пользователь вошёл:", result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={login}>Войти через Google</button>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}

export default Login;
