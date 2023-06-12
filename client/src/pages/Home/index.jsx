import { useSelector, useDispatch } from 'react-redux';
import { setProduct, fetchProducts } from '../../redux/slices/productsSlice';
import { useEffect } from 'react';

import ProductsList from './ProductsList';
import SideBar from './SideBar';
import Spinner from '../../components/Spinner';

import { shops } from '../../data/config';

const Home = () => {
  const { product, productList, requestStatus } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const onShopSelection = (product) => {
    dispatch(setProduct(product));
  };

  useEffect(() => {
    const productBinId = shops.filter((shop) => shop.productType === product)[0].binId;
    const getProducts = () => {
      dispatch(fetchProducts(productBinId));
      window.scrollTo(0, 0);
    };

    getProducts();
  }, [product]);

  return (
    <div className='container mx-auto sm:flex sm:justify-between mt-6'>
      <SideBar onClick={onShopSelection} />
      {requestStatus === 'loading' ? <Spinner /> : <ProductsList productList={productList} />}
    </div>
  );
};

export default Home;
