import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { CompareProvider } from './context/CompareContext';
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <CompareProvider>
      <App />
    </CompareProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
