import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import About from '../pages/About';
import Error from '../pages/Error';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';

import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';
import MeetUp from '../pages/meetUp/MeetUp';
import Checkout from '../pages/Products/Checkout';
import ProductsDetail from '../pages/Products/ProductDetail';
import PrivateRoute from './ProtectedRoute';
import Root from './Root';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<Error />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductsDetail />} />
            <Route
                path="/checkout/:id"
                element={
                    <PrivateRoute>
                        <Checkout />
                    </PrivateRoute>
                }
                loader={async () => fetch('https://comix-server.vercel.app/products')}
            />
            <Route path="/meetup" element={<MeetUp />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
        </Route>
    )
);

export default router;
