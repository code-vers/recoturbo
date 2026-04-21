const StaySomewhereCta = () => {
  return (
    <section className='relative isolate flex min-h-[484px] w-full items-center justify-center overflow-hidden bg-[#e7d9d4]'>
      {/* content */}
      <div className='relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center'>
        {/* <h1 className='text-[42px] font-semibold leading-none tracking-[-0.06em] text-black sm:text-[72px] md:text-[86px]'>
          room residences
        </h1> */}
        <img src='/roomLogo.svg' className='text-black py-10' alt='' />

        <p className='mt-1 text-[28px] molde-expanded uppercase md:leading-[70px] text-black sm:text-[48px]'>
          STAY SOMEWHERE
        </p>

        <p className='mt-8 text-[18px] leading-[25px] font-normal text-black/85'>
          rooms for living and rental
        </p>

        <button
          type='button'
          className='mt-12 inline-flex h-[50px] md:h-[75px] min-w-[344px] items-center justify-center bg-black px-8 text-[24px] font-light tracking-[-0.03em] text-white transition-transform duration-200 hover:scale-[1.02]'>
          Book a Consultation
        </button>
      </div>
    </section>
  );
};

export default StaySomewhereCta;
