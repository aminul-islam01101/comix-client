import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    const handleClick = () => {
        console.log('clicked');
    };
    return (
        <div>
            <Navbar className="bg-slate-500">
                <Navbar.Toggle />
                <Link to="./" className="flex">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Comix
                    </span>
                </Link>
                <div className="flex md:order-2">
                    <Link to="/login">Login</Link>
                    <button type="button" onClick={handleClick} className="button">
                        Logout
                    </button>
                    <Link to="/signup">SignUp</Link>
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">
                                name@flowbite.com
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                </div>

                <Navbar.Collapse>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
