import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SignupErrorBoundary from "../ErrorBoundary/SignupErrorBoundary";

const SignUp = () => {
  const [email, setEmail] = useState(""); // ✅ default empty
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password };
      const response = await axios.post(
        "http://localhost:5000/signup",
        newUser
      );

      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        console.log("Caught Error:", err.response.data.message); // ✅ Always log error
        setError(err.response.data.message); // ✅ Display in UI
      } else {
        setNetworkError(err.message);
      }
    }
  };

  return (
    <SignupErrorBoundary error={networkError} >
      <div className="signup">
        <div className="signup__container">
          <h1 className="signup__heading">SignUp</h1>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input className="signup-btn" type="submit" value="SignUp" />
          </form>

          {/* ✅ This will now show */}
          {error && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "left" }}>
              {error}
            </p>
          )}

          <div className="link-to-login">
            <p>
              Already have an account?{" "}
              <Link style={{ color: "skyblue" }} to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </SignupErrorBoundary>
  );
};

export default SignUp;
