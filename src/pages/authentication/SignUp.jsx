/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import { Link, Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';

const SignUp = () => {
    const { createUser, verifyMail, updateUserProfile } = useContext(AuthContext);
    const {
        register,

        handleSubmit,
        getValues,

        reset,

        formState: { errors },
    } = useForm({ mode: 'onChange' });

    // const location = useLocation();
    const { firstName, lastName, email, password } = getValues();
    // const from = location.state?.from?.pathname || '/';
    // verifyMail functionality
    const handleVerifyMail = () => {
        verifyMail()
            .then(() => {})
            .catch((e) => console.error(e));
    };
    // updateUserProfile functionality
    const handleUpdateProfile = () => {
        const profile = {
            displayName: `${firstName} ${lastName}`,
        };
        updateUserProfile(profile)
            .then(() => {})
            .catch((err) => console.error(err));
    };

    const onSubmit = (data) => {
        createUser(email, password)
            .then((result) => {
                const { user } = result;
                console.log(user);
                reset();
                handleVerifyMail();
                toast.success('please verifyMail');
                handleUpdateProfile();
                // user?.uid && Navigate(from, { replace: true });
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="container w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
                {/* username */}
                <div className="space-y-1 text-sm">
                    <div>
                        <label htmlFor="firstName" className="block dark:text-gray-400">
                            User Name
                            <div className="flex gap-2">
                                <div>
                                    <input
                                        {...register('firstName', {
                                            required: true,
                                            maxLength: 20,
                                            pattern: /^[A-Za-z]+$/i,
                                        })}
                                        id="firstName"
                                        placeholder="First Name"
                                        className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                                    />

                                    {errors?.firstName?.type === 'pattern' && (
                                        <p>Alphabetical characters only</p>
                                    )}
                                    {errors?.firstName?.type === 'maxLength' && (
                                        <p>First name cannot exceed 20 characters</p>
                                    )}
                                </div>

                                <div>
                                    <input
                                        {...register('lastName', {
                                            required: true,
                                            maxLength: 20,
                                            pattern: /^[A-Za-z]+$/i,
                                        })}
                                        id="lastName"
                                        placeholder="Last Name"
                                        className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                                    />

                                    {errors?.lastName?.type === 'pattern' && (
                                        <p>Alphabetical characters only</p>
                                    )}
                                    {errors?.lastName?.type === 'maxLength' && (
                                        <p>First name cannot exceed 20 characters</p>
                                    )}
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* email */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block dark:text-gray-400">
                            Email
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                id="email"
                                placeholder="Enter email"
                                className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                            />
                        </label>
                    </div>
                    {/* password */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block dark:text-gray-400">
                            Password
                            <input
                                {...register('password', {
                                    required: true,

                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                })}
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                            />
                            {errors?.password?.type === 'pattern' && (
                                <p>min 6ch , one letter, one number </p>
                            )}
                        </label>
                    </div>
                    {/* confirm password */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="confirmPassword" className="block dark:text-gray-400">
                            Confirm password
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    validate: (val) =>
                                        password === val || 'Passwords should match!',
                                })}
                                id="confirmPassword"
                                placeholder="Confirm password"
                                className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                            />
                            {errors?.confirmPassword && <p>{errors?.confirmPassword?.message}</p>}
                        </label>

                        {/* checkbox */}
                        <div className="flex items-center">
                            <label htmlFor="terms" className="text-sm dark:text-gray-400">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    id="terms"
                                    aria-label="terms"
                                    required
                                    className="mr-1 rounded-sm focus:ring-violet-400 focus:dark:border-violet-400 focus:ring-2 accent-violet-400"
                                />
                                I agree to terms and condition
                            </label>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <button
                                    type="submit"
                                    className="w-full mt-8 px-8 py-3 font-semibold rounded-md dark:bg-violet-400 bg-sky-500 dark:text-gray-900"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <p className="px-6 text-sm text-center dark:text-gray-400">
                                Already member?
                                <Link
                                    to="/Signin"
                                    rel="noopener noreferrer"
                                    className="hover:underline  dark:text-violet-400"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
