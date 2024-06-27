import React, {  useState } from "react";
import { auth } from "../../Firebase";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import { doc, setDoc } from "firebase/firestore";
import {Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import Navbar from "../Navbar/Navbar";

const Signup = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible,setVisible]=useState(false);
  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("signup button is clicked")
    try {
      const auth=getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      // console.log(userId);
    
      if (userId != null) {
        alert("Signup successful");
        history.replace("/home");
      }
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Email is already in use");
          setUserName("")
          setEmail("")
          setPassword("")
          break;
        default:
          alert(error)
          alert("Error occurred during signup");
          break;
      }
    }
    
  };

  const googleHandler = () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          GoogleAuthProvider.credentialFromResult(result);
          history.replace("/home");
        })
        .catch((error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            alert("email already used");
            // var pendingCred = error.credential;
            // console.log(pendingCred);
          }
        });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="form">
      <div>
        <h1 className="heading">Signup</h1>
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter your user name"
          id="name"
          autoComplete="new-user"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          autoComplete="new-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-container">
        <input
          type={visible ? "text" :"password"}
          placeholder="Enter password"
          id="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div 
        className="password-toggle"
        style={{cursor:"pointer"}}
        onClick={()=>setVisible(!visible)}
        >
          {visible ? <AiOutlineEye /> :  <AiOutlineEyeInvisible />}
        </div>
        </div>
        <button type="submit" className="login_button" >Sign up</button>
        <h5>Or</h5>

        <div>
          <button type="submit" className="login_button" onClick={googleHandler}>
            Google
          </button>
          <hr />
          <h5 >
          Already have an account  ?   <Link to="/" className="links">Login</Link>
        </h5>
        </div>
       
      </form>
    </div>
    </div>
  );
};

export default Signup;

