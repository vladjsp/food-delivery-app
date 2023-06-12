import { useSelector } from 'react-redux';

import { shops } from '../../data/config';
import clsx from 'clsx';

const SideBar = ({ onClick }) => {
  const { product } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  const isDisabled = (productType, currentCategory) => {
    if (cartItems.length === 0) {
      return false;
    }
    return productType !== currentCategory;
  };

  return (
    <aside id='separator-sidebar' className='mb-3 sm:mr-5' aria-label='Sidebar'>
      <div className='h-full w-full sm:w-44 overflow-y-auto'>
        <ul className='w-full font-medium flex flex-wrap justify-evenly gap-2 items-center sm:items-start sm:flex-col '>
          {shops.map((item) => (
            <li key={item.name} className=''>
              <button
                type='button'
                disabled={isDisabled(item.productType, product)}
                onClick={() => onClick(item.productType)}
                className={clsx(
                  'flex items-center p-2 w-44 text-gray-900 rounded-lg hover:bg-gray-100 disabled:bg-gray-300',
                  item.productType === product ? 'border-2  border-slate-800' : 'border'
                )}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
