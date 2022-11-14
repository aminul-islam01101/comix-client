import { format } from 'date-fns';
import React, { useState } from 'react';

import { DayPicker } from 'react-day-picker';

const MeetUpBanner = () => {
    const [selected, setSelected] = useState(new Date());
    return (
        <div>
            <div className="hero container bg-base-200 text-white">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src="https://placeimg.com/260/400/arch"
                        className="max-w-sm rounded-lg shadow-2xl"
                        alt=""
                    />
                    <div>
                        <h1 className="text-5xl font-bold">Box Office News!</h1>

                        <DayPicker mode="single" selected={selected} onSelect={setSelected} />
                    </div>
                    <p>selected date: {format(selected, 'PP')}</p>
                </div>
            </div>
        </div>
    );
};

export default MeetUpBanner;
