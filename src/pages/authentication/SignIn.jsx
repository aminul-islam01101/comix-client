/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../Contexts/AuthContext';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const { signIn, sendPassResetEmail, setLoading, googleSignIn, githubSignIn } =
        useContext(AuthContext);
    const { email, password } = input;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onFieldChange = (event) => {
        const { value } = event.target;

        setInput({ ...input, [event.target.name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        signIn(email, password)
            .then((result) => {
                const { user } = result;
                console.log(user);
                form.reset();
                setError('');
                user.emailVerified
                    ? navigate(from, { replace: true })
                    : toast.error('Please verify your email address.');
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
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

                user.emailVerified && navigate(from, { replace: true });
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
        <div className="grid min-h-90v place-items-center my-36 ">
            <h2 className="text-xl text-rose-600 font-bold my-10">{error}</h2>
            <div className="w-full max-w-md space-y-3 rounded-xl p-8 bg-slate-300 dark:bg-gray-900 dark:text-gray-100">
                <h1 className="text-center text-2xl font-bold">Login</h1>
                <form
                    onSubmit={handleSubmit}
                    className="ng-untouched ng-pristine ng-valid space-y-6"
                >
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block dark:text-gray-400">
                            email
                            <input
                                onChange={onFieldChange}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="write your email"
                                className="w-full rounded-md px-4 py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                                required
                            />
                        </label>
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block dark:text-gray-400">
                            Password
                            <input
                                onChange={onFieldChange}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="w-full rounded-md px-4 py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400"
                                required
                            />
                        </label>
                    </div>
                    <div className="flex justify-end text-xs dark:text-gray-400">
                        Forgot Password?
                        <button type="button" className="underline" onClick={handleForgetPass}>
                            {' '}
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
