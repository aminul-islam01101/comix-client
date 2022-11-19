import React, { useState } from 'react';

import AvailableAppointments from './AvailableAppointments';
import MeetUpBanner from './MeetUpBanner';

const MeetUp = () => {
    const [selected, setSelected] = useState();
    return (
        <div>
            <MeetUpBanner selected={selected} setSelected={setSelected} />
            <AvailableAppointments selected={selected || new Date()} setSelected={setSelected} />
        </div>
    );
};

export default MeetUp;
