import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginErrorBoundary from "../ErrorBoundary/LoginErrorBoundary";

const Login = () => {
  const [email, setEmail] = useState(""); // ✅ default empty
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [networkError, setNetworkError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert(response.data.message);
        navigate("/landing");
      }
    } catch (err) {
      const status = err.response?.status; // ✅ use correct field
      const message = err.response?.data?.message;

      if (status === 400 || status === 401 || status === 404) {
        setError(message);
      } else {
        setNetworkError(err.message);
      }
    }
  };

  return (
    <LoginErrorBoundary error={networkError}>
      <div className="login">
        <div className="login__container">
          <h1 style={{fontSize:"32px"}} className="login__heading">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="login-input">
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
            <input className="login-btn" type="submit" value="Login" />
          </form>

          {error && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "left" }}>
              {error}
            </p>
          )}

          <div className="link-to-signup">
            <p>
              Don't have an account?{" "}
              <Link style={{ color: "skyblue" }} to="/signup">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </LoginErrorBoundary>
  );
};

export default Login;
