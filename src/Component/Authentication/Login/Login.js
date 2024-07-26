import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import FrontPageNavbar from "../../Navbar/FrontPageNavbar";
import {
  loginHandleConfirm,
  loginChangeHandler,
  loginSubmitHandler,
  loginGoogleHandler,
} from "../Utilities/AuthenticationUitility";
import LoginForm from "./LoginForm";
import { MessageBox } from "../../MessageBox";
const Login = () => {
  const [loginField, setLoginField] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });

  const [visible, setVisible] = useState(false);
  const history = useHistory();

  return (
    <div>
      <FrontPageNavbar />
      <LoginForm
        loginSubmitHandler={(e) =>
          loginSubmitHandler(e, loginField, setModalContent, setShowModal)
        }
        loginField={loginField}
        loginChangeHandler={(e) => loginChangeHandler(e, setLoginField)}
        visible={visible}
        setVisible={setVisible}
        loginGoogleHandler={() =>
          loginGoogleHandler(setModalContent, setShowModal)
        }
      />

      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          loginHandleConfirm(setShowModal, modalContent, history, setLoginField)
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </div>
  );
};

export default Login;
