import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../Firebase";

export const loginSubmitHandler = (
  e,
  loginField,
  setModalContent,
  setShowModal
) => {
    try{
        e.preventDefault();
        const auth = getAuth();
        const userId=auth.currentUser.uid
         console.log(userId)
        signInWithEmailAndPassword(auth, loginField.email, loginField.password)
          .then(() => {
            setModalContent({
              title: "Success",
              body: "Successfully Logged In!",
            });
            setShowModal(true);
          })
          .catch(() => {
            setModalContent({
              title: "Login Error",
              body: "Enter correct email or password for login",
            });
            setShowModal(true);
          });
    }catch {
        setModalContent({
          title: "Login Error",
          body: "Please signup before login",
        });
        setShowModal(true);
      }
  
};

export const loginGoogleHandler = (setModalContent, setShowModal) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      setModalContent({
        title: "Success",
        body: "Successfully Logged In!",
      });
      setShowModal(true);
    })
    .catch(() => {
      setModalContent({
        title: "Login Error",
        body: "Google sign-in failed. Please try again.",
      });
      setShowModal(true);
    });
};

export const loginChangeHandler = (e,setLoginField) => {
  const { id, value } = e.target;
  setLoginField((prevState) => ({
    ...prevState,
    [id]: value,
  }));
};

export const loginHandleConfirm = (
  setShowModal,
  modalContent,
  history,
  setLoginField
) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    history.replace("/form");
    setLoginField({
      email: "",
      password: "",
    });
  } else {
    history.replace("/login");
  }
};

export const signupSubmitHandler = async (
  e,
  signupFields,
  setModalContent,
  setShowModal
) => {
  try {
    e.preventDefault();
    const auth = getAuth();
    await createUserWithEmailAndPassword(
      auth,
      signupFields.email,
      signupFields.password
    )
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log(userId)
        if (userId != null) {
          setModalContent({
            title: "Success",
            body: "Successfully Logged In!",
          });
          setShowModal(true);
        }
      })
      .catch(() => {
        setModalContent({
          title: "Signup error",
          body: "Email already in use",
        });
        setShowModal(true);
      });
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        setModalContent({
          title: "Email already in used",
          body: "Please signup with another email id",
        });
        setShowModal(true);
        break;
      default:
        break;
    }
  }
};



export const signupChangeHandler = (e, setSignupFields) => {
  const { id, value } = e.target;
  setSignupFields((prevState) => ({
    ...prevState,
    [id]: value,
  }));
};

export const SignupGoogleHandler = (setShowModal, setModalContent) => {
  try {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        setModalContent({
          title: "Success",
          body: "Successfully Logged In!",
        });
        setShowModal(true);
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setModalContent({
            title: "Signup Error",
            body: "Email already used",
          });
          setShowModal(true);
        }
      });
  } catch {
    setModalContent({
      title: "Signup Error",
      body: "Error during signup",
    });
    setShowModal(true);
  }
};

export const handleSignupConfirm = (
  setShowModal,
  modalContent,
  history,
  setSignupFields
) => {
  setShowModal(false);
  if (modalContent.title === "Success") {
    history.replace("/form");
    setSignupFields({
      userName: "",
      email: "",
      password: "",
    });
  } else {
    history.replace("/signup");
  }
};
