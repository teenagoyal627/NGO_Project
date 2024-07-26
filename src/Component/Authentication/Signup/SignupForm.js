import React from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
const SignupForm = ({
    signupSubmitHandler,
  signupChangeHandler,
  signupFields,
  visible,
  setVisible,
  SignupGoogleHandler
}) => {
  return (
    <div className="form">
      <div>
        <h1 className="heading">Signup</h1>
      </div>
      <form onSubmit={signupSubmitHandler}>
        <input
          type="text"
          placeholder="Enter your user name"
          id="userName"
          autoComplete="new-user"
          required
          value={signupFields.userName}
          onChange={signupChangeHandler}
        />
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          autoComplete="new-email"
          required
          value={signupFields.email}
          onChange={signupChangeHandler}
        />
        <div className="password-container">
          <input
            type={visible ? "text" : "password"}
            placeholder="Enter password"
            id="password"
            autoComplete="new-password"
            required
            value={signupFields.password}
            onChange={signupChangeHandler}
          />
          <div
            className="password-toggle"
            style={{ cursor: "pointer" }}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </div>
        </div>
        <button type="submit" className="login_button">
          Sign up
        </button>
        <h5>Or</h5>
        
        <div>
          <button type="submit" className="login_button" onClick={SignupGoogleHandler}>
            Google
          </button>
          </div>
        <hr />
        <h5>
          Already have an account ?{" "}
          <Link to="/login" className="links">
            Login
          </Link>
        </h5>
      </form>
    </div>
  );
};

export default SignupForm;
