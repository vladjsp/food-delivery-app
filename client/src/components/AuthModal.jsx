import { useState } from 'react';
import LoginForm from './SignInForm';
import RegistrationForm from './SignUpForm';

const AuthModal = ({ toggleModal }) => {
  const [loginOrRegistration, setLoginOrRegistration] = useState('login');

  const handleAuthMode = () => {
    setLoginOrRegistration(loginOrRegistration === 'login' ? 'registration' : 'login');
  };

  return (
    // Main modal
    <div
      onClick={toggleModal}
      id='authentication-modal'
      tabIndex='-1'
      className='fixed inset-0 mx-auto z-[9999] w-full p-0 h-full bg-slate-500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
      <div className='relative max-w-lg rounded-lg bg-slate-200 md:my-6'>
        {/* Modal content */}
        <button
          onClick={toggleModal}
          type='button'
          className='absolute top-1 right-1.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center z-50'>
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
          <span className='sr-only'>Close modal</span>
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          className='flex flex-col items-center justify-center max-w-md p-10 mx-auto max-h-full'>
          <div className='relative w-full max-h-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-6 space-y-2'>
            {loginOrRegistration === 'login' ? (
              <LoginForm handleAuthMode={handleAuthMode} toggleModal={toggleModal} />
            ) : (
              <RegistrationForm handleAuthMode={handleAuthMode} toggleModal={toggleModal} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
