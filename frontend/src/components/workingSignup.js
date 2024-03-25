import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios'
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase";
import DisplayIcons from "../DisplayIcons";
import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    dob: "",
    phoneNo: "",
    profilePic: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass || !values.dob || !values.phoneNo || !values.profilePic) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);    

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {

        // write data to mongoDB
        let result = await fetch(
          'http://localhost:3001/register', {
            method: "post",
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
        }

        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });

        navigate("/");
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

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', [values.name, values.email, values.pass, values.dob, values.phoneNo, values.profilePic])
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }


  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Create your account</h1>

        <form onSubmit={formSubmit}>

          <InputControl
            label="Name"
            placeholder="Enter your name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <InputControl
            label="Email"
            placeholder="Enter email address"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />
          <InputControl
            label="Password"
            placeholder="Enter password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />
          <InputControl
            label="Date of Birth"
            placeholder="DD/MM/YYYY"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, dob: event.target.value }))
            }
          />
          <InputControl
            label="Phone Number"
            placeholder="Enter phone no."
            onChange={(event) =>
              setValues((prev) => ({ ...prev, phoneNo: event.target.value }))
            }
          />
          <InputControl
            type="file"
            label="Profile Photo"
            placeholder="Upload Profile pic"
            accept="image/*"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, profilePic: event.target.value }))
            }
          />

          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button className={styles.btn}  onClick={handleSubmission} disabled={submitButtonDisabled}>
              Signup
            </button>

            <p style={{textAlign:"center", color:"rgb(105, 97, 97)",marginTop:"-0.5rem"}}>Or</p>
            
            <button className={styles.googlebtn} onClick={handle_google_Submission} disabled={submitButtonDisabled}>
            <span><DisplayIcons /></span> Google 
            </button> 

            <p>
              Already have an account?{" "}
              <span>
                <Link to="/login">Login now</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
