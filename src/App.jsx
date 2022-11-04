import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';

const App = () => {
    console.log('app');

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};
export default App;
