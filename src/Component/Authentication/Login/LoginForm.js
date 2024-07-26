import React from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
const LoginForm = ({
  loginSubmitHandler,
  loginField,
  loginChangeHandler,
  visible,
  setVisible,
  loginGoogleHandler,
}) => {
  return (
    <div className="form">
      <div>
        <h1 className="heading">Login</h1>
      </div>
      <div>
        <form onSubmit={loginSubmitHandler}>
          <input
            type="text"
            placeholder="Enter Email address"
            id="email"
            required
            value={loginField.email}
            onChange={loginChangeHandler}
            autoComplete="off"
          />
          <div className="password-container">
            <input
              type={visible ? "text" : "password"}
              placeholder="Enter Password"
              id="password"
              required
              value={loginField.password}
              onChange={loginChangeHandler}
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
          <button type="submit" className="login_button">
            Login
          </button>
          <h5>Or</h5>
          <button
            type="button"
            className="login_button"
            onClick={loginGoogleHandler}
          >
            Google
          </button>
          <hr />
          <br />
          <h5>
            New Account ?{" "}
            <Link to="/signup" className="links">
              Signup
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
