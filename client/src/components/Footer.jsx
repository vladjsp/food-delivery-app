import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='mt-auto'>
      <div className='w-full mx-auto py-4 mt-3 md:flex md:items-center md:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center'>
          © 2023
          <Link to='https://github.com/vladjsp/' target='_blank' className='hover:underline ml-1'>
            vladjsp™
          </Link>
          . All Rights Reserved.
        </span>
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0'>
          <li>
            <Link to='/' className='mr-4 hover:underline md:mr-6 '>
              Home
            </Link>
          </li>
          <li>
            <Link to='/cart' className='mr-4 hover:underline md:mr-6'>
              Cart
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
