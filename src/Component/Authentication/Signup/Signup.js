import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FrontPageNavbar from "../../Navbar/FrontPageNavbar";
import SignupForm from "./SignupForm";
import { MessageBox } from "../../MessageBox";

import {
  handleSignupConfirm,
  signupSubmitHandler,
  signupChangeHandler,
  SignupGoogleHandler,
} from "../Utilities/AuthenticationUitility";

const Signup = () => {
  const history = useHistory();
  const [signupFields, setSignupFields] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
  });
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <FrontPageNavbar />
      <SignupForm
        signupSubmitHandler={(e) =>
          signupSubmitHandler(
            e,
            signupFields,
            setModalContent,
            setShowModal
          )
        }
        signupChangeHandler={(e) => signupChangeHandler(e, setSignupFields)}
        signupFields={signupFields}
        visible={visible}
        setVisible={setVisible}
        SignupGoogleHandler={() => SignupGoogleHandler(setShowModal, setModalContent)}
      />
      <MessageBox
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() =>
          handleSignupConfirm(setShowModal, modalContent, history, setSignupFields)
        }
        title={modalContent.title}
        body={modalContent.body}
      />
    </div>
  );
};

export default Signup;
