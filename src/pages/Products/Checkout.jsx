/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import AuthContext from '../../Contexts/AuthContext';

export default function Checkout() {
    const { register, handleSubmit, reset } = useForm();
    // const queryClient = useQueryClient();

    const { user } = useContext(AuthContext);

    const muteFunc = async (data) => axios.post('https://comix-server.vercel.app/orders', data);

    const { mutate } = useMutation(muteFunc, {
        onSuccess: () => toast.success('success'),
        onError: () => toast.error('there was an error'),
        //     onSettled: () => {
        //         queryClient.invalidateQueries('create');
        //     },
    });

    const onSubmit = (data) => {
        mutate(data);
        reset();
    };

    return (
        <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
            <form
                className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
                onSubmit={handleSubmit(onSubmit)}
            >
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Personal Inormation</p>
                        <p className="text-xs">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga
                            autem eum!
                        </p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="firstname" className="text-sm">
                                User name
                                <input
                                    {...register('firstname')}
                                    id="firstname"
                                    type="text"
                                    placeholder="User name"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                                />
                            </label>
                        </div>

                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="email" className="text-sm">
                                Email
                                <input
                                    {...register('email')}
                                    defaultValue={user?.email}
                                    readOnly
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                                />
                            </label>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="address" className="text-sm">
                                Address
                                <input
                                    {...register('address')}
                                    id="address"
                                    type="text"
                                    placeholder=""
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                                />
                            </label>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="bio" className="text-sm">
                                Bio
                                <textarea
                                    {...register('bio')}
                                    id="bio"
                                    placeholder=""
                                    className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"
                                />
                            </label>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="bio" className="text-sm">
                                Photo
                            </label>
                            <div className="flex items-center space-x-2">
                                <img
                                    src="https://source.unsplash.com/30x30/?random"
                                    alt=""
                                    className="w-10 h-10 rounded-full dark:bg-gray-700"
                                />
                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded-md dark:border-gray-100"
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <input className="button" type="submit" />
            </form>
        </section>
    );
}
