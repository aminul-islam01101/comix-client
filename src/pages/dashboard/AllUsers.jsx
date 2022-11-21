/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';

const AllUsers = () => {
    const { data: users, refetch }= useQuery(['users'], () =>
        axios.get('https://comix-server.vercel.app/users').then((res) => res.data)
    );
    const handleClick = (id) => {
        axios
            .put(`https://comix-server.vercel.app/users/admin/${id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`,
                },
            })

            .then((res) => {
                if (res.data.modifiedCount) {
                    toast.success('Make admin successful.');
                    refetch();
                }
            });
    };

    return (
        <div className="container">
            <div className="overflow-x-auto">
                <table className=" bg-slate-200 w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Serial</th>
                            <th> Name</th>
                            <th>email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr
                                key={user._id}
                                className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                            >
                                <th>{i + 1}</th>
                                <td className="py-2 px-4">{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {user?.role !== 'admin' && (
                                        <button
                                            type="button"
                                            onClick={() => handleClick(user._id)}
                                            className="button"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        // onClick={handleClick}
                                        className="btn btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
