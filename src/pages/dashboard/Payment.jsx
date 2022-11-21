import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const { id } = useParams();
    const { data: singleBooking } = useQuery(['singleBooking'], () =>
        axios.get(`https://comix-server.vercel.app/bookings/${id}`).then((res) => res.data)
    );

    return (
        <div>
    
            <div>Booking For {singleBooking.heroName}</div>
        </div>
    );
};

export default Payment;
