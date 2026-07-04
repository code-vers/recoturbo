const LetsConnect = () => {
  return (
    <section className='bg-[#e7d9d4] flex flex-col items-center justify-center py-20 px-6 sm:px-12'>
      <div className='max-w-7xl w-full flex flex-col items-center text-center'>
        {/* World Map Icon */}
        <div className='mb-6'>
          <img src='/worldmap.png' alt='World Map' className='w-[500px] h-auto object-contain' />
        </div>

        <h2 className='md:text-[35px] lg:text-[45px] lg:leading-[70px]  tracking-wide uppercase mb-8 text-[#111111]'>
          LETS CONNECT
        </h2>

        <p className='text-[13px] md:text-[15px] text-[#111111] leading-[1.6] mb-12 max-w-3xl'>
          If you have any further questions on Room Residences or your room journey please reach out
          to a member of the team who will be more than happy to answer your questions.
        </p>

        <h3 className='md:text-[35px] lg:text-[45px] lg:leading-[70px]  tracking-wide uppercase mb-8 text-[#111111]'>
          WORLDWIDE CONTACTS
        </h3>

        <div className='w-[18px] h-[1px] bg-[#111111] mb-14'></div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 w-full'>
          <div className='flex flex-col items-center'>
            <h4 className='text-[13px] md:text-[15px] font-bold tracking-wider uppercase mb-5 text-[#111111]'>
              SALES & GENERAL ENQUIRES
            </h4>
            <a
              href='mailto:info@roomresidences.com'
              className='text-[13px] md:text-[15px] font-medium text-[#111111] hover:opacity-70 transition-opacity'
            >
              info@roomresidences.com
            </a>
          </div>

          <div className='flex flex-col items-center'>
            <h4 className='text-[13px] md:text-[15px] font-bold tracking-wider uppercase mb-5 text-[#111111]'>
              PARTNER ENQUIRIES
            </h4>
            <a
              href='mailto:mr@roomresidences.com'
              className='text-[13px] md:text-[15px] font-medium text-[#111111] hover:opacity-70 transition-opacity'
            >
              mr@roomresidences.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsConnect;
