import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { theme, GlobalStyle } from './utils/theme';

import { AuthProvider } from './AuthProvider';
import AuthenticatedApp from './AuthenticatedApp';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastContainer />
        <main>
          <Router>
            <AuthenticatedApp />
          </Router>
        </main>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
