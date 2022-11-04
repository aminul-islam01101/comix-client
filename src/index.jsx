import React from 'react';
import ReactDOM from 'react-dom/client';
// import { ToastContainer } from 'react-toastify';

import App from './App';
// import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />

        {/* <ToastContainer autoClose={1000} /> */}
    </React.StrictMode>
);
