import React from "react";

const LoginErrorBoundary = ({ error, children }) => {
  if (error) {
    return (
      <div className="errorContainer">
        <h2>ERROR: {error}</h2>
      </div>
    );
  }

  return children;
};

export default LoginErrorBoundary;
