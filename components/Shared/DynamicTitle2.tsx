const DynamicTitle = ({ text }) => {
  return (
    <div
      className='relative w-full h-auto md:py-22 lg:py-40 bg-[#ebe7e4] flex justify-center items-center'
      style={{
        isolation: "isolate",
        backgroundImage:
          "radial-gradient(circle at 18% 22%, rgba(255,232,220,0.42), transparent 18%), radial-gradient(circle at 66% 15%, rgba(194,220,255,0.24), transparent 16%), radial-gradient(circle at 84% 86%, rgba(255,221,206,0.16), transparent 14%)",
      }}>
      <div className='text-center px-4 max-w-5xl '>
        <div className='flex justify-center my-8'>
          <div className='relative h-[2px] w-[40px] overflow-hidden bg-black' />
        </div>
        <h2 className='md:text-[35px] lg:text-[35px] lg:text-[70px] lg:leading-[70px] text-black'>
          {text}
        </h2>
      </div>
    </div>
  );
};

export default DynamicTitle;
