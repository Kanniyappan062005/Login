import React from "react";
import "./App.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Layout from "./Layout/Layout";
import Landing from "./Pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SignUp />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
