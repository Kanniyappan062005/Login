import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [user, setUser] = useState([]); // Array of users
  const [name, setName] = useState(""); // Current username
  const [pass, setPass] = useState(""); // Current password
  const [error, setError] = useState(""); //Error Message
  const navigate = useNavigate()

  const handleUser = (e) => {
    setName(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Always prevent form default first
    try {
      const newUser = { email: name, password: pass }; // Backend expects 'email'

      // Send data to backend
      const response = await axios.post("http://localhost:8080/signup", newUser);
      console.log(response.data);

      // Store in local state (optional)
      setUser(prevUsers => [...prevUsers, newUser]);

      if (response.status === 201) {
        alert("User are Created Sucessfull!");
        navigate("/login")
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Show backend error message
      } else {
        setError(error.message);
      }
    } finally {
      setName("");
      setPass("");
    }
  };


  return (
    <>
      <form className='signup' onSubmit={handleSubmit}>
        <h2 className='signup__heading'>SignUp</h2>
        <div className='signup__input'>
          <input
            type="text"
            placeholder='Username'
            value={name}
            onChange={handleUser}
            required
          />
          <br />
          <input
            type="password"
            placeholder='Password'
            value={pass}
            onChange={handlePass}
            required
          />
        </div>
        {error && <p className='signup__err-msg'>{error}</p>}
        <div>
          <input className='signup-btn' type="submit" value="SignUp" />
        </div>
        <div style={{ display: "flex", gap: "2px", alignItems: "center", }}>
          <p style={{ fontSize: "16px"}}>Already have an Account? <Link to={"/login"} style={{ color: "aqua" }} >Login</Link></p>
        </div>
      </form>
    </>
  );
};

export default SignUp;
