import React from 'react';

import { DayPicker } from 'react-day-picker';

const MeetUpBanner = ({ selected, setSelected }) => (
    <div className="hero min-h-screen bg-slate-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <img
                src="https://placeimg.com/260/400/arch"
                className="max-w-sm rounded-lg shadow-2xl"
                alt=""
            />
            <div>
                <DayPicker mode="single" selected={selected} onSelect={setSelected} />
            </div>
        </div>
    </div>
);

export default MeetUpBanner;
