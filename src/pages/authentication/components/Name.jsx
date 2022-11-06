/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const Name = ({ placeholder, name }) => {
    const {
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            checkbox: false,
            firstName: '',
        },
    });

    return (
        <div>
            <div>
                <Controller
                    rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            id={name}
                            placeholder={placeholder}
                            className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                        />
                    )}
                />
                {errors?.firstName?.type === 'pattern' && <p>Alphabetical characters only</p>}
                {errors?.firstName?.type === 'maxLength' && (
                    <p>First name cannot exceed 20 characters</p>
                )}
            </div>
        </div>
    );
};

export default Name;
