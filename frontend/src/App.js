import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import QRcode from "./components/QRcode/QRcode";
import ImageUpload from "./components/ImageUpload";

import { auth } from "./firebase";
// import QRCode from "qrcode.react";


function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="login/:name" element={<QRcode />} />
          <Route path="/ImageUpload" element={<ImageUpload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
