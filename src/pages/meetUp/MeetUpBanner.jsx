import { format } from 'date-fns';
import React, { useState } from 'react';

import { DayPicker } from 'react-day-picker';

const MeetUpBanner = () => {
    const [selected, setSelected] = useState();

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }
    return (
        <div className="hero min-h-screen bg-slate-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src="https://placeimg.com/260/400/arch"
                    className="max-w-sm rounded-lg shadow-2xl"
                    alt=""
                />
                <div>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        footer={footer}
                    />
                </div>
            </div>
        </div>
    );
};

export default MeetUpBanner;
