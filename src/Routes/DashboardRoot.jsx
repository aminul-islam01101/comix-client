/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardRoot = () => (
    <div>
        <Navbar />
        <div className="drawer drawer-mobile">
            <input id="dashboardOpener" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <Outlet />
            </div>
            <div className="drawer-side  ">
                <label htmlFor="dashboardOpener" className="drawer-overlay" />
                <ul className="menu p-4 w-56 bg-base-100 text-base-content">
                    <li>
                        <Link to="/dashboard">My Meetups</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/users">All Users</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default DashboardRoot;
