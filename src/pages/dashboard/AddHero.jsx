/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddHero = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const imgApI = import.meta.env.VITE_IMGBB_API;
    const { data: genres } = useQuery(['genres'], () =>
        axios.get(`https://comix-server.vercel.app/genre`).then((res) => res.data)
    );
    console.log(genres);

    // Posting form data
    const muteFunc = async (data) => axios.post('https://comix-server.vercel.app/heros', data);

    const { mutate } = useMutation(muteFunc, {
        onSuccess: () => {
            toast.success('Successfully added a hero');
            navigate('/dashboard/manageheros');
        },
        onError: () => toast.error('There is an error'),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm({ mode: 'onChange' });

    const onSubmit = (data) => {
        console.log(data);

        const image = data.photo[0];
        const formData = new FormData();
        const url = `https://api.imgbb.com/1/upload?key=${imgApI}`;
        formData.append('image', image);
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((imgData) => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const hero = {
                        name: data.heroName,
                        email: data.email,
                        genre: data.genre,
                        image: imgData.data.url,
                    };
                    mutate(hero);
                }
            });
    };

    return (
        <div className="grid min-h-90v place-items-center  ">
            <h2 className="text-xl text-rose-600 font-bold my-10">{error}</h2>
            <div className="w-full max-w-md space-y-3 rounded-xl p-8 bg-slate-300 dark:bg-gray-900 dark:text-gray-100">
                <h1 className="text-center text-2xl font-bold">Login</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="ng-untouched ng-pristine ng-valid space-y-6"
                >
                    <div>
                        <label className="label">
                            <span className="label-text">Hero Name</span>
                        </label>
                        <input
                            {...register('heroName', {
                                required: true,
                                maxLength: 20,
                                pattern: /^[A-Za-z]+$/i,
                            })}
                            type="text"
                            id="heroName"
                            placeholder="Hero Name"
                            className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                        />

                        {errors?.heroName?.type === 'pattern' && (
                            <p className="text-red-500">*Alphabetical characters only</p>
                        )}
                        {errors?.heroName?.type === 'maxLength' && (
                            <p className="text-red-500">*Last name cannot exceed 20 characters</p>
                        )}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email Address is required',
                            })}
                            className="input input-bordered w-full "
                        />
                        {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select {...register('genre')} className="select select-info w-full ">
                            {genres?.map((genre) => (
                                <option key={genre._id} value={genre.genre}>
                                    {genre.genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">photo</span>
                        </label>
                        <input
                            type="file"
                            {...register('photo', { required: 'Image is required' })}
                            className="input input-bordered w-full "
                        />
                        {errors.photo && <p className="text-red-600">{errors.photo?.message}</p>}
                    </div>

                    <button type="submit" className="button w-full rounded-sm p-3 text-center">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddHero;
