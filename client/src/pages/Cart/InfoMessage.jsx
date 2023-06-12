const InfoMessages = ({ image, title, description }) => {
  return (
    <div className='flex items-center justify-center flex-col'>
      <img className='mb-12' width='120px' src={image} alt='empty cart' />
      <h2 className='font-bold text-lg'>{title}</h2>
      <p className='opacity-6'>{description}</p>
    </div>
  );
};

export default InfoMessages;
