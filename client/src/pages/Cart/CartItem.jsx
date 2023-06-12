import { useDispatch } from 'react-redux';
import { removeItem, plusItem, minusItem } from '../../redux/slices/cartSlice';

const CartItem = ({ item }) => {
  const { id, name, price, img, amount } = item;
  const dispatch = useDispatch();

  return (
    <div
      className='flex flex-col sm:flex-row justify-between items-center w-full p-4 mb-4 text-gray-500 bg-white rounded-lg shadow'
      role='alert'>
      <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg'>
        <img src={img} className='w-5 h-5' />
        <span className='sr-only'>Error icon</span>
      </div>
      <b className='w-3/5 my-3 sm:my-0 sm:ml-3 text-center sm:text-left font-bold'>{name}</b>
      <div className='flex justify-end mt-3 sm:mt-0'>
        <div className='flex items-center justify-center '>
          <button
            type='button'
            onClick={() => dispatch(minusItem(id))}
            className='text-blue-700 border border-blue-700 hover:bg-blue-200 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center '>
            <svg
              width='0.5rem'
              height='0.5rem'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'>
              <path
                fill='#000000'
                fillRule='evenodd'
                d='M18 10a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z'
              />
            </svg>
            <span className='sr-only'>remove one piace</span>
          </button>
          <b className='w-16 mx-2 text-center'>{amount} pcs.</b>
          <button
            type='button'
            onClick={() => dispatch(plusItem(id))}
            className='text-blue-700 border border-blue-700 hover:bg-blue-200 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center '>
            <svg
              width='0.5rem'
              height='0.5rem'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'>
              <path
                fill='#000000'
                fillRule='evenodd'
                d='M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z'
              />
            </svg>
            <span className='sr-only'>add one piece</span>
          </button>
        </div>
        <div className='flex items-center px-3'>
          <b className='w-20 text-center'>{Math.round(price * amount * 100) / 100} ₴</b>
        </div>
        <button
          type='button'
          onClick={() => dispatch(removeItem(id))}
          className='ml-auto -mx-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 '
          data-dismiss-target='#toast-danger'
          aria-label='Close'>
          <span className='sr-only'>Delete</span>
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
