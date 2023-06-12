import { lazy, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import UserAccount from './pages/UserAccount';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
// const AuthModal = lazy(() => import('./components/AuthModal'));
// const UserAccount = lazy(() => import('./pages/UserAccount'));
// const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='container mx-auto px-3 flex flex-col min-h-screen sm:px-0'>
      <Header toggleModal={() => setIsModalOpen(!isModalOpen)} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cart/' element={<Cart />}></Route>
        <Route path='/404' element={<NotFound />}></Route>
        <Route path='*' element={<Navigate to='/404' replace />}></Route>
        <Route path='/user' element={<UserAccount />}></Route>
      </Routes>
      <Footer />
      {isModalOpen && <AuthModal toggleModal={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
