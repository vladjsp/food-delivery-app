import { useSelector, useDispatch } from 'react-redux';

import { clearCart } from '../../redux/slices/cartSlice';
const CartHeader = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  return (
    <>
      <div className='flex items-center justify-between  mt-6'>
        <h1 className='block text-2xl font-medium'>Confirm Your Order</h1>
        <div className='flex items-center cursor-pointer'>
          <span onClick={() => dispatch(clearCart())} className='inline-block'>
            Clear Cart
          </span>
        </div>
      </div>
      <div className='flex justify-between items-center my-3'>
        <h2>
          Amount of products: <span className='text-[#1d4ed8] font-bold'>{cartItems.length}</span>
        </h2>
        <h2>
          Total price: <span className='text-xl text-[#1d4ed8] font-bold'>{totalPrice} hrn.</span>
        </h2>
      </div>
    </>
  );
};

export default CartHeader;
