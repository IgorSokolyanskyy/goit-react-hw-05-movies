import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'constants';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
