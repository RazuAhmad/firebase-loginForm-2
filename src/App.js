import React from "react";
import InitializeAuthentication from "./Components/firebase/firebase.initialize";
import LoginForm from "./Components/LoginForm/LoginForm";

InitializeAuthentication();
const App = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default App;
