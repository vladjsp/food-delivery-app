import { useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { persLogo } from '../assets';
import clsx from 'clsx';

import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';

import { removeUser } from '../redux/slices/userSlice';

const menuItems = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Cart',
    link: '/cart',
  },
];

const Header = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmountInCart = cartItems.reduce((acc, curr) => acc + curr.amount, 0);
  const { isAuth, email } = useAuth();

  return (
    <header className=''>
      <nav className='bg-white py-3'>
        <div className='container mx-auto flex flex-wrap justify-between items-center'>
          <Link to='/' className='flex items-center'>
            <img src={persLogo} className='mr-3 h-6 sm:h-9' alt='personal Logo' />
            <span className='self-center text-slate-800 text-xl font-semibold whitespace-nowrap '>
              Dream Delivery
            </span>
          </Link>
          <div className='flex justify-between items-center lg:w-auto lg:order-1'>
            <ul className='flex flex-row font-medium lg:space-x-8 lg:mt-0'>
              {menuItems.map((item) => (
                <li key={item.title}>
                  <NavLink
                    to={item.link}
                    className={clsx(
                      'block py-2 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 aria-[current=page]:text-blue-600'
                    )}
                    aria-current='page'>
                    {item.title}
                    {item.title === 'Cart' ? (
                      <span
                        className={clsx(
                          totalAmountInCart > 0 ? 'font-bold text-blue-600' : 'text-slate-700'
                        )}>
                        ({totalAmountInCart})
                      </span>
                    ) : (
                      ''
                    )}
                  </NavLink>
                </li>
              ))}
              {isAuth ? (
                <>
                  <li>
                    <NavLink
                      to='/user'
                      className={clsx(
                        'block py-2 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 aria-[current=page]:text-blue-600'
                      )}
                      aria-current='page'>
                      Account
                    </NavLink>
                  </li>
                  <li
                    onClick={() => dispatch(removeUser())}
                    className='block py-2 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 cursor-pointer'>
                    Sign out
                  </li>
                </>
              ) : (
                <li
                  onClick={toggleModal}
                  className='block py-2 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 cursor-pointer'>
                  Sign in
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
