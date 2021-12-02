import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext([false, () => {}]);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    const storagedLogin = localStorage.getItem('user_login');

    if (storagedLogin?.token) {
      setState(JSON.parse([true, storagedLogin]));
    }
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};
