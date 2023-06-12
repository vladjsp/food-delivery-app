import { useDispatch } from 'react-redux';

import { addItem } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const { id, name, img, price } = product;

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const selectedProduct = {
      id,
      name,
      price,
      img,
      amount: 1,
    };
    dispatch(addItem(selectedProduct));
  };

  return (
    <div className='max-w-sm w-full sm:w-60 min-h-[96px] mx-auto mb-3 bg-white border border-gray-200 rounded-lg shadow'>
      <img className='h-44 p-3 mx-auto rounded-t-lg ' src={img} alt='product image' />
      <div className='px-3 pb-3'>
        <h5 className='text-lg font-medium text-gray-900'>{name}</h5>
        <div className='flex items-center justify-between mt-3'>
          <span className='text-xl font-bold text-gray-900'>${price}</span>
          <button
            type='button'
            onClick={handleAddToCart}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
