/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import formatCurrency from '../../Utilities/FormateCurrency';

const MeetupOption = ({ option, setMeetings }) => {
    const { name, slots, price } = option;
    return (
        <div>
            <div className="card w-full bg-base-100 shadow-xl image-full">
                <figure>
                    <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{slots.length ? slots[0] : 'Try Another day'}</p>
                    <p>
                        {slots.length} {slots.length ? 'spaces' : 'space'} available
                    </p>
                    <p>Entree Fee {formatCurrency(price)}</p>
                    <div className="card-actions  justify-end">
                        <button
                            type="button"
                            disabled={slots.length === 0}
                            onClick={() => setMeetings(option)}
                            className="button disabled:bg-slate-300"
                        >
                            <label
                                className=" cursor-pointer "
                                htmlFor={slots.length && 'meetup-modal'}
                            >
                                get meetup
                            </label>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetupOption;
