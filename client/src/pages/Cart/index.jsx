import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CartHeader from './CartHeader';
import CartItem from './CartItem';
import ContactForm from './ContactForm';
import InfoMessages from './InfoMessage';
import { completeOrder, emptyCart } from '../../assets';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { requestStatus } = useSelector((state) => state.order);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);

  useEffect(() => {
    requestStatus === 'success' ? setIsOrderCompleted(true) : setIsOrderCompleted(false);
  }, [requestStatus]);

  return (
    <div className='container mx-auto'>
      <CartHeader />
      {cartItems.length > 0 ? (
        <div className='block mx-auto md:flex md:flex-row-reverse md:justify-between mt-6'>
          <div className='w-full flex flex-col md:ml-3'>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <ContactForm />
        </div>
      ) : (
        <InfoMessages
          title={isOrderCompleted ? 'Order Completed' : 'Cart is empty'}
          image={isOrderCompleted ? completeOrder : emptyCart}
          description={
            isOrderCompleted
              ? `We receive your order! 🔥`
              : 'You need to add items to your shopping cart'
          }
        />
      )}
    </div>
  );
};

export default Cart;
