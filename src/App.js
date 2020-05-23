import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from './pages/Home';
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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
