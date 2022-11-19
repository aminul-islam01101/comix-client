// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { ToastContainer } from 'react-toastify';

// import App from './App';
// import UserContext from './Contexts/UserContext';
// import 'react-toastify/dist/ReactToastify.css';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <UserContext>
//             <App />

//             {/* <ToastContainer autoClose={1000} /> */}
//         </UserContext>
//     </React.StrictMode>
// );
import { CssBaseline } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import 'react-day-picker/dist/style.css';
import ReactDOM from 'react-dom/client';

// app

import App from './App';
import Theme from './assets/styles/CustomMui';
// styles
import UserContext from './Contexts/UserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <UserContext>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={Theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </StyledEngineProvider>
        </UserContext>
    </React.StrictMode>
);
