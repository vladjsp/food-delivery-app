import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import { useAuth } from '../../hooks/useAuth';
import { useProductToCompany } from '../../hooks/useProduct';
import { postOrder } from '../../redux/slices/orderSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import Map from '../../components/Map';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const [adress, setAdress] = useState('');
  const { isAuth, email, id } = useAuth();
  const { company } = useProductToCompany();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'all' });

  const getCustomerId = useMemo(() => {
    return isAuth ? id : nanoid();
  }, [isAuth, email, id]);

  const onSubmit = (data) => {
    const orderInfo = {
      customerId: getCustomerId,
      customerInfo: {
        phone: data.customerPhone,
        name: data.customerName,
        email: data.email,
      },
      date: new Date(),
      company: company,
      totalPrice: totalPrice,
      deliveryAdress: data.customerAdress,
      orderInfo: cartItems,
    };
    dispatch(postOrder(orderInfo));
    reset();
    dispatch(clearCart());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full mx-auto sm:mx-0 md:max-w-[320px] border p-4 rounded-xl'>
      <div className='block sm:flex sm:flex-col mb-6'>
        <div className='mb-3 relative'>
          <label htmlFor='customerName' className='block mb-2 text-sm font-medium text-gray-900'>
            Name
          </label>
          <input
            {...register('customerName', {
              required: 'This field is required',
              maxLength: { value: 40, message: 'Max 40 characters' },
            })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='Vlad'
          />
          <div className='absolute -bottom-4 right-0'>
            {errors?.customerName && (
              <p className='text-red-500/75 text-xs'>{errors?.customerName?.message || 'Error!'}</p>
            )}
          </div>
        </div>
        <div className='mb-3 relative'>
          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 '>
            Email
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
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='vladyslav@example.com'
          />
          <div className='absolute -bottom-4 right-0'>
            {errors?.email && (
              <p className='text-red-500/75 text-xs'>{errors?.email?.message || 'Error!'}</p>
            )}
          </div>
        </div>
        <div className='mb-3 relative'>
          <label htmlFor='customerPhone' className='block mb-2 text-sm font-medium text-gray-900 '>
            Phone number
          </label>
          <input
            type='tel'
            {...register('customerPhone', {
              required: 'This field is required',
              pattern: {
                value: /^[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/,
                message: 'Enter valid phone number.',
              },
            })}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            placeholder='0001245678'
          />
          <div className='absolute -bottom-4 right-0'>
            {errors?.customerPhone && (
              <p className='text-red-500/75 text-xs'>
                {errors?.customerPhone?.message || 'Error!'}
              </p>
            )}
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='customerAdress' className='block mb-2 text-sm font-medium text-gray-900 '>
            Adress
          </label>
          <div className='relative mb-5'>
            <input
              {...register('customerAdress', {
                required: 'This field is required',
                minLength: { value: 6, message: 'Min 6 characters' },
              })}
              value={adress}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
              placeholder='Pick a valid adress on map'
            />
            <div className='absolute -bottom-4 right-0'>
              {errors?.customerAdress && (
                <p className='text-red-500/75 text-xs'>
                  {errors?.customerAdress?.message || 'Error!'}
                </p>
              )}
            </div>
          </div>

          <Map adress={adress} setAdress={setAdress} />
        </div>

        <div className='flex items-start relative'>
          <div className='flex items-center h-5'>
            <input
              type='checkbox'
              {...register('conditions', {
                required: 'Required',
              })}
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 '
            />
          </div>
          <div className='absolute -bottom-4 right-0'>
            {errors?.conditions && (
              <p className='text-red-500/75 text-xs'>{errors?.conditions?.message || 'Error!'}</p>
            )}
          </div>
          <label htmlFor='remember' className='ml-2 text-sm font-medium text-gray-900'>
            I agree with the
            <a href='#' className='ml-1.5 text-blue-600 hover:underline '>
              terms and conditions
            </a>
            .
          </label>
        </div>
      </div>
      <input
        type='submit'
        value='Submit Order'
        className={clsx(
          'text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center',
          isValid ? ' bg-blue-700 hover:bg-blue-800' : 'bg-slate-500'
        )}
      />
    </form>
  );
};

export default ContactForm;
