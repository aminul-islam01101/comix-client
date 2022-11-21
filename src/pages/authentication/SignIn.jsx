/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';
// import SaveUser from './components/SaveUser';

const Login = () => {
    const [error, setError] = useState('');
    // const [UserEmail, setUserEmail] = useState('');
    // const [token, setToken] = useState('');
    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm({ mode: 'onChange' });
    const { signIn, sendPassResetEmail, setLoading, googleSignIn, githubSignIn } =
        useContext(AuthContext);
    const { email } = getValues();

    const navigate = useNavigate();
    const location = useLocation();

    // const [token] = useToken(UserEmail);
    const from = location.state?.from?.pathname || '/';

    // if (token) {
       
    // }
    const getUserToken = (email) => {
        if (email) {
            fetch(`https://comix-server.vercel.app/jwt?email=${email}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data?.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        // setToken(data?.accessToken);
                        navigate(from, { replace: true });
                    }
                });
        }
    };
    const saveUser = (email, name) => {
        const user = { name, email };
        fetch('https://comix-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then(() => {
                getUserToken(email);
            });
    };
    const onSubmit = (data) => {
        console.log(data);
        setError('');
        signIn(data?.email, data?.password)
            .then((result) => {
                const { user } = result;
                console.log(user);
                 getUserToken(data.email)
                // setUserEmail(data.email);
        //   navigate(from, { replace: true });

                // setUserEmail(data?.email);
            })

            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    };
    const handleForgetPass = () => {
        if (!email) {
            alert('please enter a valid email');
            return;
        }
        sendPassResetEmail(email)
            .then(() => {
                toast.success('reset email sent.Please check your email');
            })
            .catch((er) => {
                console.error(er);
            });
    };
    // handle google sign in
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const { user } = result;
                console.log(user);
                user?.uid && navigate(from, { replace: true });
                 saveUser(user.email, user.displayName);
                // setUserEmail(user?.email);
            })

            .catch((errors) => {
                console.error(errors);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    // handle github sign in
    const handleGithubSignIn = () => {
        githubSignIn()
            .then((result) => {
                const { user } = result;
                console.log(user, user.emailVerified, user.uid);

                user?.uid && navigate(from, { replace: true });
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
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
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            {...register('email', {
                                required: 'Email Address is required',
                            })}
                            className="input input-bordered w-full "
                        />
                        {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be 6 characters or longer',
                                },
                            })}
                            className="input input-bordered w-full "
                        />
                        {errors.password && (
                            <p className="text-red-600">{errors.password?.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end text-xs dark:text-gray-400">
                        Forgot Password?
                        <button type="button" className="underline" onClick={handleForgetPass}>
                            Reset
                        </button>
                    </div>
                    <button type="submit" className="button w-full rounded-sm p-3 text-center">
                        Login
                    </button>
                </form>
                <div className="flex items-center space-x-1 pt-4">
                    <div className="h-px flex-1 dark:bg-gray-700 sm:w-16" />
                    <p className="px-3 text-sm dark:text-gray-400">Login with social accounts</p>
                    <div className="h-px flex-1 dark:bg-gray-700 sm:w-16" />
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        aria-label="Log in with Google"
                        className="rounded-sm  p-3 px-4 py-2 dark:bg-transparent bg-gray-400"
                    >
                        <FcGoogle />
                    </button>

                    <button
                        onClick={handleGithubSignIn}
                        type="button"
                        aria-label="Log in with GitHub"
                        className="rounded-sm p-3 px-4 py-2 bg-gray-400  dark:bg-transparent"
                    >
                        <FaGithub />
                    </button>
                </div>
                <p className="text-center text-xs dark:text-gray-400 sm:px-6">
                    Dont&#39;s have an account?
                    <Link
                        to="/signup"
                        rel="noopener noreferrer"
                        className="underline dark:text-gray-100"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
