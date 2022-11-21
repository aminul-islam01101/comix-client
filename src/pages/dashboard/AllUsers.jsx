/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const AllUsers = () => {
    const { data: users } = useQuery(['users'], () =>
        axios.get('https://comix-server.vercel.app/users').then((res) => res.data)
    );

    return <div>    <div className="container">
    <div className="overflow-x-auto">
        <table className=" bg-slate-200 w-full">
            <thead>
                <tr>
                    <th className="py-2 px-4">Serial</th>
                    <th> Name</th>
                    <th>email</th>
                    
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
                    
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div></div>;
};

export default AllUsers;
