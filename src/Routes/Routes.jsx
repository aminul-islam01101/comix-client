import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import About from '../pages/About';
import Error from '../pages/Error';
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';

import SignIn from '../pages/authentication/SignIn';
import SignUp from '../pages/authentication/SignUp';

import AddHero from '../pages/dashboard/AddHero';
import AllUsers from '../pages/dashboard/AllUsers';
import MyMeetup from '../pages/dashboard/MyMeetup';
import MeetUp from '../pages/meetUp/MeetUp';
import Checkout from '../pages/Products/Checkout';
import ProductsDetail from '../pages/Products/ProductDetail';
import AdminRoute from './AdminRoute';
import DashboardRoot from './DashboardRoot';
import ManageHeros from './ManageHeros';
import PrivateRoute from './ProtectedRoute';
import Root from './Root';
import Payment from '../pages/dashboard/Payment';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
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
            {/* dashboard layout */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <DashboardRoot />
                    </PrivateRoute>
                }
            >
                <Route path="/dashboard" element={<MyMeetup />} />
                <Route
                    path="/dashboard/users"
                    element={
                        <AdminRoute>
                            <AllUsers />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/dashboard/addhero"
                    element={
                        <AdminRoute>
                            <AddHero />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/dashboard/manageheros"
                    element={
                        <AdminRoute>
                            <ManageHeros />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/dashboard/payment/:id"
                    element={
                        <AdminRoute>
                            <Payment />
                        </AdminRoute>
                    }
                />
            </Route>
        </>
    )
);

export default router;
