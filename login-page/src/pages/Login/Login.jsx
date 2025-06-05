import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", {
                email,
                password
            });

            if (response.status === 200) {
                alert(response.data.message);
                setError(""); // Clear error
                navigate("/landing"); // Navigate to landing page
            }
        } catch (error) {
            const status = error.response?.status;
            const message = error.response?.data?.message || "Something went wrong";

            if (status === 400 || status === 401) {
                setError(message);
            } else {
                setError("Unexpected error occurred.");
            }
        }
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3 className="login__heading">Login</h3>

            <div className='login__input'>
                <input
                    type="text"
                    placeholder='Username'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                />
            </div>

            {error && <p className='login__err-msg'>{error}</p>}

            <div>
                <input className='login-btn' type="submit" value="Login" />
            </div>

            <div className="route__link">
                <p>Create a new Account? <Link to="/signup" style={{ color: "aqua" }}>Signup</Link></p>
            </div>
        </form>
    );
};

export default Login;
