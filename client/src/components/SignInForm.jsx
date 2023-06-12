import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { setUser } from '../redux/slices/userSlice';

const LoginForm = ({ handleAuthMode, toggleModal }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'all' });

  const onSubmitLogin = (data, event) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        toggleModal();
      })
      .catch(() => {
        console.error;
        alert('User not found!');
      });

    //reset form after sign in
    reset();
  };

  return (
    <>
      <h1 className='text-center text-lg font-medium leading-tight tracking-tight text-gray-900 '>
        Sign in to your <br /> Dream Delivery account
      </h1>
      <form onSubmit={handleSubmit(onSubmitLogin)} className='space-y-3'>
        <div className='relative'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 '>
            Your email
          </label>
          <input
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Enter valid email',
              },
            })}
            type='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 '
            placeholder='name@company.com'
          />
          <div className='absolute -bottom-4 right-0'>
            {errors?.email && (
              <p className='text-red-500/75 text-xs'>{errors?.email?.message || 'Error!'}</p>
            )}
          </div>
        </div>
        <div className='relative'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 '>
            Password
          </label>
          <input
            {...register('password', {
              required: 'This field is required',
              maxLength: { value: 16, message: 'Max 16 characters' },
              minLength: { value: 6, message: 'Min 6 characters' },
            })}
            type='password'
            placeholder='••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-dky-600 block w-full p-2.5 '
          />
          <div className='absolute -bottom-4 right-0'>
            {errors?.password && (
              <p className='text-red-500/75 text-xs'>{errors?.password?.message || 'Error!'}</p>
            )}
          </div>
        </div>
        <div className='flex items-center justify-between pt-3'>
          <div className='flex items-start'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                aria-describedby='remember'
                type='checkbox'
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-300 '
                required=''
              />
            </div>
            <div className='ml-3 text-sm'>
              <label htmlFor='remember' className='text-gray-500 '>
                Remember me
              </label>
            </div>
          </div>
          <a href='#' className='text-sm font-medium text-sky-600 hover:underline '>
            Forgot password?
          </a>
        </div>
        <button
          type='submit'
          disabled={!isValid}
          className={clsx(
            'w-full text-white focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center',
            isValid ? ' bg-blue-700 hover:bg-blue-800' : 'bg-slate-500'
          )}>
          Sign in
        </button>
        <p className='flex justify-between items-center text-sm font-light text-gray-500 '>
          Don’t have an account yet?
          <span onClick={handleAuthMode} className='font-medium text-sky-600 hover:underline '>
            Sign up
          </span>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
