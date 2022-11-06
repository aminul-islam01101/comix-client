import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import About from '../pages/About';
import Error from '../pages/Error';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';

import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';
import PrivateRoute from './ProtectedRoute';
import Root from './Root';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<Error />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
                path="/products"
                element={
                    <PrivateRoute>
                        <Products />
                    </PrivateRoute>
                }
                loader={async () => fetch('https://comix-server.vercel.app/products')}
            />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
        </Route>
    )
);

export default router;
