/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import AuthContext from '../../Contexts/AuthContext';

const MyMeetup = () => {
    const { user } = useContext(AuthContext);
    const { data: myMeetups } = useQuery(['myMeetup'], () =>
        axios
            .get(`https://comix-server.vercel.app/bookings?email=${user?.email}`, {
            //  .get(`http://localhost:5000/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => res.data)
    );

    return (
        <div className="container">
            <div className="overflow-x-auto">
                <table className=" bg-slate-200 w-full">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Serial</th>
                            <th>Hero Name</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myMeetups.map((myMeetup, i) => (
                            <tr
                                key={myMeetup._id}
                                className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                            >
                                <th>{i + 1}</th>
                                <td className="py-2 px-4">{myMeetup?.heroName}</td>
                                <td>{myMeetup?.meetupDate}</td>
                                <td>{myMeetup?.timeSlot}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyMeetup;
