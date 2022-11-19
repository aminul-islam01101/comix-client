/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns/esm';
import React, { useState } from 'react';
import MeetupCard from './MeetupCard';
import MeetupModal from './MeetupModal';

export default function AvailableAppointments({ selected }) {
    const [meetings, setMeetings] = useState(null);
    // let date;
    // if (selected) {
    //     date = format(selected, 'PP');
    // }
    const date = format(selected, 'PP');

    const {
        data: appointmentOptions,

        refetch,
    } = useQuery(['meetupOptions', date], () =>
        axios
            //  .get('https://comix-server.vercel.app/meetupOptions')
            .get(`https://comix-server.vercel.app/meetupOptions?date=${date}`)
            .then((res) => res.data)
    );
    console.log(date);

    let footer = <p>Select a date first</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }

    return (
        <div className=" bg-slate-400">
            <div className="container text-center">AvailableAppointments on {footer} </div>
            <div className="container grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {appointmentOptions?.map((option) => (
                    <MeetupCard
                        key={option._id}
                        option={option}
                        selected={selected}
                        setMeetings={setMeetings}
                    />
                ))}
            </div>
            {meetings && (
                <MeetupModal
                    meetings={meetings}
                    setMeetings={setMeetings}
                    selected={selected}
                    refetch={refetch}
                />
            )}
        </div>
    );
}
