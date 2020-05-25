import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import Provider from './provider';

import './App.css';

// Changes main theme colors
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004B26',
    },
  },
  typography: {
    fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

function App() {
  const [auth, setAuth] = useState();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {auth === 'success' ? (
          <Provider>
            <Home />
          </Provider>
        ) : (
          <Login setAuth={setAuth} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
