import React, { useState } from "react";
import './Login.css';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase";
import Navbar from "../Navbar/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user.uid;
        // console.log(user);
        alert("Successfully Login");
        history.replace("/home");
        setEmail("");
        setPassword("");
      })
      .catch(() => {
        alert("Enter correct email or password for login");
      });
  };

  const googleHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
        // console.log(token, user);
        alert("Successfully Login");
        history.replace("/home");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        alert(error.code);
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(credential);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="form">
        <div>
          <h1 className="heading">Login</h1>
        </div>
        <div  >
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Email address"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <div className="password-container">
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter Password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <div
              className="password-toggle"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>
          <button type="submit" className="login_button">Login</button>
          <h5>Or</h5>
          <button type="button" className="login_button" onClick={googleHandler}>Google</button>
          <hr /><br />
          <h5 >
            New Account  ?   <Link to="/signup" className="links">Signup</Link>
          </h5>
        </form>
        </div>
      </div>
      {/* <img style={{width:"20rem",height:"40rem",marginLeft:"90rem"}} src={VijayMandir} alt='logo of ngo' className='logo-image' /> */}

    </div>
  );
};

export default Login;


