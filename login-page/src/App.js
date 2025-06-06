import './App.css';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/SignUp';
import Landing from './components/Landing';

function Layout() {
  return (
    <div>
      <h1 style={{ marginTop: "50px", fontSize: "35px" }}>My App</h1>

      <Outlet /> {/* Correct usage */}

    </div>
  );
}

function App() {
  return (
    <div className="App"> {/* Correct JSX attribute */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SignUp />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path='/landing' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
