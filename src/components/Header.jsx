import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, Navigate, NavLink } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';

export default function Header() {
    const { logOut, user, setUser, setLoading } = useContext(AuthContext);

    const handleClick = () => {
        logOut()
            .then(() => {
                toast.success('Sign-out successful.');
                setLoading(false);
                setUser(null);
                Navigate('/');
            })
            .catch((er) => {
                console.error(er);
            });
    };
    console.log(user);

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
                    <div className="  dark:text-white">
                        {user?.uid ? (
                            <li className="list-none">
                                <button
                                    onClick={handleClick}
                                    type="button"
                                    className="button text-black"
                                >
                                    logout
                                </button>
                            </li>
                        ) : (
                            <div className="flex mx-5">
                                <li className="list-none">
                                    <Link to="/login" className="mr-2 text-black dark:text-white ">
                                        Login
                                    </Link>
                                </li>
                                <li className="list-none">
                                    <Link to="/signup" className="text-black dark:text-white">
                                        SignUp
                                    </Link>
                                </li>
                            </div>
                        )}
                    </div>
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
                    <NavLink to="/about">About-us</NavLink>
                    <NavLink to="/products">Inventory</NavLink>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
