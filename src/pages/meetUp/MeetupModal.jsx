/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext } from 'react';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import AuthContext from '../../Contexts/AuthContext';

const MeetupModal = ({ meetings, selected, setMeetings }) => {
    const { handleSubmit, register } = useForm();
    const { user } = useContext(AuthContext);

    const muteFunc = async (data) => axios.post('https://comix-server.vercel.app/bookings', data);

    const { mutate } = useMutation(muteFunc, {
        onSuccess: () => {
            setMeetings(null);
            toast.success('Successfully posted Your Meetup bookings');
        },
        onError: () => toast.error('there was an error'),
    });

    const onSubmit = (values) => {
        mutate({ ...values, heroName: meetings?.name });
    };
    return (
        <div>
            <input type="checkbox" id="meetup-modal" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box bg-slate-100 relative">
                    <label
                        htmlFor="meetup-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-lg font-bold">{meetings?.name}</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        {selected && (
                            <input
                                {...register('meetupDate')}
                                type="text"
                                defaultValue={format(selected, 'PP')}
                                className="w-full "
                            />
                        )}

                        <input
                            type="text"
                            placeholder="userName"
                            defaultValue={user?.displayName}
                            {...register('name')}
                            className="w-full "
                        />
                        <input
                            type="email"
                            placeholder="email"
                            defaultValue={user?.email}
                            {...register('email')}
                            className="w-full "
                        />
                        <input
                            type="number"
                            placeholder="phone number"
                            {...register('phoneNumber')}
                            className="w-full "
                        />

                        <select name="" id="" className="w-full" {...register('timeSlot')}>
                            {meetings?.slots.map((slot) => (
                                <option key={Math.random()} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="button w-full mt-5">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MeetupModal;
