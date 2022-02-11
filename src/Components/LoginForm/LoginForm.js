import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const LoginForm = () => {
  const Googleprovider = new GoogleAuthProvider();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isExist, setIsExist] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const CreateNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setErrorMsg("");
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const SignInExistingUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setErrorMsg("");
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const handleExistingAccount = () => {
    setIsExist(!isExist);
  };

  // Google sign in method
  const signInWithGoogle = () => {
    signInWithPopup(auth, GoogleAuthProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return setErrorMsg("Password should be at least 6 character long");
    } else {
      setErrorMsg("");
    }
    isExist
      ? SignInExistingUser(email, password)
      : CreateNewUser(email, password);
  };
  return (
    <Form onSubmit={handleSubmit} style={{ margin: "0 80px" }}>
      <h3>Please {isExist ? "Sign in" : "Sign up"} Now</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          onBlur={handleEmail}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          onBlur={handlePassword}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group
        onChange={handleExistingAccount}
        className="mb-3"
        controlId="formBasicCheckbox"
      >
        <Form.Check type="checkbox" label="Already have Account?" />
      </Form.Group>
      <h3>{errorMsg}</h3>
      <Button variant="primary" type="submit">
        {isExist ? "Sign in" : "Sign up"}
      </Button>
    </Form>
  );
};

export default LoginForm;
