import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import TapCounter from './tap.jsx';
import './stylefarm.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TapCounter />
  </React.StrictMode>
);
