import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function useProductToCompany() {
  const { product } = useSelector((state) => state.products);
  const [company, setCompany] = useState('');

  useEffect(() => {
    switch (product) {
      case 'fried-chicken':
        setCompany('Los Pollos');
        break;
      case 'pizzas':
        setCompany('Blue Oyster');
        break;
      case 'burgers':
        setCompany('Krusty Krab');
        break;
      case 'sandwiches':
        setCompany('Central Perk');
        break;

      default:
        break;
    }
  }, [product]);

  return { product, company };
}
