import React from 'react';

const SignupErrorBoundary = ({ error, children }) => {
  if (error) {
    return <h2 style={{ color: "red" }}>Error: {error}</h2>;
  }

  return children;
};

export default SignupErrorBoundary;
