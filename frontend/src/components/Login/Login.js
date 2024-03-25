import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import UserProfile from "../QRcode/QRcode";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";
// import { useParams } from 'react-router-dom';
import Signup from "../Signup/Signup";
import styles from "./Login.module.css";
import DisplayIcons from "../DisplayIcons";


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  // const { username } = useParams();
  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        
        const email = values.email;
        let result = await fetch(
          'http://localhost:3001/get_user_details', {
              method: "post",
              body: JSON.stringify({email : email}),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          result = await result.json();
          if (result) {
            // navigate(`/QRcode/${result.name}`, {state: result});
            navigate(`/login/${result.name}`, {state: result});
            // console.log("get call result:", result);
          }


        // navigate(`/${values.email}`);
        // navigate(`/QRcode/${values.name}`, {state: user});
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const handle_google_Submission = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
    };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login to your account</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button className={styles.btn} disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>

          <p style={{textAlign:"center", color:"rgb(105, 97, 97)",marginTop:"-0.5rem"}}>Or</p>

          <button className={styles.googlebtn} onClick={handle_google_Submission} disabled={submitButtonDisabled}>
          <span><DisplayIcons /></span> Google 
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
