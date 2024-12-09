// AuthProvider.jsx
import React, { createContext, useContext, useState } from "react";

// Create the AuthContext with default values
const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
