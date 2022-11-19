/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns/esm';
import React, { useState } from 'react';
import MeetupCard from './MeetupCard';
import MeetupModal from './MeetupModal';

export default function AvailableAppointments({ selected }) {
    const [meetings, setMeetings] = useState(null);

    const date = format(selected, 'PP');
    //  .get('https://comix-server.vercel.app/meetupOptions')
    const { data: appointmentOptions, refetch } = useQuery(['meetupOptions', date], () =>
        axios
            .get(`https://comix-server.vercel.app/meetupOptions?meetupDate=${date}`)
            .then((res) => res.data)
    );

    return (
        <div className=" bg-slate-400">
            <div className="container text-center">AvailableAppointments on {date} </div>
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
                    date={date}
                    refetch={refetch}
                />
            )}
        </div>
    );
}
