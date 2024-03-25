import React from "react";
import { Link } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";
// import firebase from "firebase/app";
// import "firebase/auth";

// firebase.auth().signOut().then(function() {
//   console.log("Signout successful")
// }).catch(function(error) {
//   console.error(error);
// });

function Home(props) {
  return (
    <div>
      <div>
        <h1>Home Page</h1>
        <br />
        <br />
        <h1>
          <Link to="/login">Login</Link>
        </h1>
        <br />
        <h1>
          <Link to="/signup">Signup</Link>
        </h1>
        <br />
        <h1>
          <Link to="/ImageUpload">ImageUpload</Link>
        </h1>
      </div>

      <br />
      <br />
      <br />

      {/* <h2>{props.name ? `Welcome - ${props.name}` : "Login please"}</h2> */}

      {/* <button onClick={signOut}>SignOut</button> */}
    </div>
  );
}

export default Home;
