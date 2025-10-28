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
    const unsubscribe = onAuthStateChange(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Determine user type based on URL or other logic
        // For now, we'll set a default, but this should be determined from Firestore
        setUserType('buyer'); // This will be updated based on actual user data
      }
      
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