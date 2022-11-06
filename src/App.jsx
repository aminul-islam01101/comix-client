import React from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';

const App = () => {
    console.log('app');

    return (
        <div>
            <RouterProvider router={router} />
            <Toaster />
        </div>
    );
};
export default App;
