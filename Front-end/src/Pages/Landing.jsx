import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎉 Welcome to the App!</h1>
      <p style={styles.text}>You have successfully logged in.</p>

      <div style={styles.buttonContainer}>
        <Link to="/login" style={styles.button}>Log Out</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    padding:"30px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f4f8",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "16px",
    color: "#333",
  },
  text: {
    fontSize: "18px",
    marginBottom: "24px",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default Landing;
