import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'buyer' or 'seller'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userType,
    setUserType,
    loading
  };

  return React.createElement(
    AuthContext.Provider,
    { value: value },
    !loading && children
  );
};