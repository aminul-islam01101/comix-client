import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import 'react-day-picker/dist/style.css';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';

const App = () => {
    console.log('app');
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                suspense: true,
            },
        },
    });

    return (
        <div>
            <QueryClientProvider client={client}>
                <Suspense fallback={<div>Loading...</div>}>
                    <RouterProvider router={router} />
                    <Toaster />
                </Suspense>
            </QueryClientProvider>
        </div>
    );
};
export default App;
