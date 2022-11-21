/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../components/ConfirmationModal';

const ManageHeros = () => {
    const [deleteHero, setDeleteHero] = useState(null);

    const closeModal = () => {
        setDeleteHero(null);
    };

    const { data: heros, refetch } = useQuery(['heros'], () =>
        axios
            .get('https://comix-server.vercel.app/heros', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => res.data)
    );

    const handleDeleteHero = (hero) => {
        axios
            .delete(`https://comix-server.vercel.app/heros/${hero._id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`,
                },
            })

            .then((res) => {
                if (res.data.deletedCount) {
                    refetch();
                    toast.success(`Hero ${hero.name} deleted successfully`);
                }
            });
    };

    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className=" bg-slate-200 w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Genre</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heros.map((hero, i) => (
                            <tr
                                key={hero._id}
                                className="bg-white odd:bg-gray-300 py-2 px-6 text-center"
                            >
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img
                                                src={hero?.image}
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>{hero?.name}</td>
                                <td>{hero?.genre}</td>
                                <th>
                                    <button
                                        type="button"
                                        onClick={() => setDeleteHero(hero)}
                                        className="button "
                                    >
                                        <label
                                            className=" cursor-pointer "
                                            htmlFor="confirmation-modal"
                                        >
                                            Delete
                                        </label>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {deleteHero && (
                <ConfirmationModal
                    title="Are you sure you want to delete?"
                    message={`If you delete ${deleteHero.name}. It cannot be undone.`}
                    successAction={handleDeleteHero}
                    successButtonName="Delete"
                    modalData={deleteHero}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default ManageHeros;
