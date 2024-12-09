import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      // Save token and log in
      const token = response.data.token;
      localStorage.setItem("authToken", token); // Store token securely
      login(); // Update authentication state
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          marginTop: "-8%",
        }}
      >
        <div className="card-body">
          <h3 className="card-title text-center mb-4">
            <img
              src="./images/protivaLogo.jpg"
              width={150}
              height={30}
              alt="Logo"
            />
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
