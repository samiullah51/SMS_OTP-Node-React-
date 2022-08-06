import React, { useState } from "react";
import axios from "axios";
function Otp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState();
  const [msg, setMsg] = useState("");
  const handleLogin = async () => {
    try {
      const loggedUser = await axios.post(
        "http://localhost:5000/api/otp/login",
        {
          email,
          password,
        }
      );
      console.log(loggedUser);
      // setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleVerify = async () => {
    try {
      const loggedUser = await axios.post(
        "http://localhost:5000/api/otp/login/confirm",
        {
          email,
          otpCode,
        }
      );
      if (loggedUser) {
        console.log("Verified");
        setMsg(" Successfully Verified");
      } else {
        console.log("Invalid");
      }
      // setEmail("");
      setOtpCode("");
    } catch (err) {
      setMsg("Invalid OTP");
      console.log(err.message);
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        <br></br>
        <input
          type="number"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
        />
        <button onClick={handleVerify}>Verify</button>
        <h1>You are : {msg}</h1>
      </div>
    </div>
  );
}

export default Otp;
