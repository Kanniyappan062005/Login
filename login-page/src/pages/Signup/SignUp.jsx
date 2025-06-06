import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import SignupErrorBoundary from '../../hooks/SignupErrorBoundary';

const SignUp = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email: name, password: pass };
      const response = await axios.post("http://localhost:8080/signup", newUser);
      if (response.status === 201) {
        alert("User created successfully!");
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setName("");
      setPass("");
    }
  };

  return (
    <SignupErrorBoundary error={error}>
      <form className='signup' onSubmit={handleSubmit}>
        <h2 className='signup__heading'>SignUp</h2>
        <div className='signup__input'>
          <input
            type="text"
            placeholder='Username'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder='Password'
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <div>
          <input className='signup-btn' type="submit" value="SignUp" />
        </div>
        <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
          <p style={{ fontSize: "16px" }}>
            Already have an Account? <Link to="/login" style={{ color: "aqua" }}>Login</Link>
          </p>
        </div>
      </form>
    </SignupErrorBoundary>
  );
};

export default SignUp;
