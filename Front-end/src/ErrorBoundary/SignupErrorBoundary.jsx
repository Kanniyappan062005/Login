import React from "react";

const SignupErrorBoundary = ({ error, children }) => {
  if (error) {
    return (
      <div className="errorContainer">
        <h2>ERROR: {error}</h2>
      </div>
    );
  }

  return children;
};

export default SignupErrorBoundary;
