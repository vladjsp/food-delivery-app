import ProductCard from '../../components/ProductCard';

const ProductsList = ({ productList = [] }) => {
  return (
    <main className='block px-3 sm:px-0 mx-auto sm:flex sm:justify-between gap-2 sm:flex-wrap'>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
};

export default ProductsList;
