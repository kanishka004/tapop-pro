import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import styles from "./QRcode.module.css";

const UserProfile = () => {
  // To get the username from the route parameters
  // const { values } = useParams();
  const location = useLocation();
  // console.log(useParams());
  const values = location.state;

  // const profileURL = `http://localhost:3000/login/${values.name}`;
  const profileURL = window.location.href;
  const date = new Date(values.dob).toLocaleString()
//   function formatDate(string){
//     var options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(string).toLocaleDateString([],options);
// }

  return (
    <div className={styles.profileBox}>
      <h1 className={styles.head}>User Profile</h1>
      <h1 className={styles.name}>{values.name}</h1>
      <div className={styles.userProfile}>
        <img src={`C:\\Users\\adhik\\Desktop\\tapop-pro\\backend\\${values.path}`.replaceAll("\\", "/")} alt={values.filename} />
        <h2>EMAIL : {values.email}</h2>
        <h2>PHONE : {values.phoneNo}</h2>
        <h2>DATE OF BIRTH : {date.split(",")[0]}</h2>
        
        {/* Display the QR code with the profile URL */}
        <div className={styles.scanQr}>
        <QRCode style={{height: "10rem", width:"10rem"}} value={profileURL} />
        </div>

        <h2> Scan QR Code</h2>
      </div>
    </div>
  );
};

export default UserProfile;