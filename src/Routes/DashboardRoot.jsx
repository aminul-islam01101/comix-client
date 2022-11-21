/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Outlet } from 'react-router-dom';
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
                        <a>Sidebar Item 1</a>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default DashboardRoot;
