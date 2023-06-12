import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../../hooks/useAuth';

import Spinner from '../../components/Spinner';

const UserAccount = () => {
  const { isAuth, email, id } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
    return;
  }, [isAuth]);

  const url = `https://642be6fad7081590f92ca383.mockapi.io/eliftech/?customerId=${id}`;

  async function fetchOrders() {
    try {
      setLoading(true);

      const response = await axios.get(url);
      const data = await response.data;

      data.length === 0 ? setOrders(['No orders found']) : setOrders(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Failed to load your orders history.');
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [id]);

  return !loading ? (
    <div className='relative overflow-x-auto mt-6'>
      <h1 className='font-bold text-xl py-3'>
        Orders for account: <span className='text-sky-600'>{email}</span>
      </h1>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Order Id
            </th>
            <th scope='col' className='px-6 py-3'>
              Date
            </th>
            <th scope='col' className='px-6 py-3'>
              Company
            </th>
            <th scope='col' className='px-6 py-3'>
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length !== 0 ? (
            orders.map((order, i) => {
              return <TableRow key={i} data={order} />;
            })
          ) : (
            <NoOrderHistoryMessage />
          )}
        </tbody>
      </table>
    </div>
  ) : (
    <Spinner />
  );
};

export const TableRow = ({ data }) => {
  const date = new Date(data.date);

  return (
    <tr className='bg-white border-b '>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
        {data.id}
      </th>
      <td className='px-6 py-4'>{`${date.getDate().toString().padStart(2, '0')} / ${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')} / ${date.getFullYear()}`}</td>
      <td className='px-6 py-4'>{data.company}</td>
      <td className='px-6 py-4'>{data.totalPrice}</td>
    </tr>
  );
};

export const NoOrderHistoryMessage = () => {
  return (
    <tr className='text-center'>
      <td colSpan='4' className='w-full px-6 py-4 font-bold'>
        No orders yet
      </td>
    </tr>
  );
};

export default UserAccount;
