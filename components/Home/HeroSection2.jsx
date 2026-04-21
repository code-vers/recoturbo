const HeroSection2 = () => {
  return (
    <section className='relative w-full h-screen min-h-[600px] overflow-hidden font-sans'>
      {/* Background Image Container */}
      <div className='absolute inset-0 w-full h-full'>
        <img
          src='/h2.jpg'
          alt='Modern mirrored architecture by the sea'
          className='w-full h-full object-cover object-center'
        />
      </div>

      {/* Content Overlay */}
      <div
        className='relative z-10 h-full max-w-[1640px] mx-auto flex flex-col px-6 md:px-12 py-12 
                      justify-center lg:justify-between'>
        {/* Top Heading */}
        <div className='lg:mt-20 max-w-4xl'>
          <h1 className='text-white text-[35px] molde-expanded sm:text-[45px] lg:text-[50px] font-bold leading-[1.1] lg:leading-[0.9] uppercase'>
            Design that defines <br className='hidden lg:block' /> your space
          </h1>
        </div>

        {/* Bottom Logo/Branding */}
        <div className='mt-10 lg:mt-0 lg:mb-4'>
          <div className='mb-4 h-[2px] w-[40px] bg-white' />
          <p className='text-white text-[24px] sm:text-[28px] lg:text-[30px] leading-none lowercase'>
            room residences
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
