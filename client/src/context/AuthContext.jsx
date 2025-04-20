import React, { createContext, useState, useContext } from 'react';

// Create context
const AuthContext = createContext();

// Create provider
export const AuthProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${email}:${password}`)
        }
      });

      if (response.ok) {
        const user = await response.json();
        user.email = email;
        user.password = password;
        setAuthenticatedUser(user);
        return user;
      } else if (response.status === 401) {
        return null;
      } else {
        throw new Error('Sign in failed');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signOut = () => {
    setAuthenticatedUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticatedUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);