const StaySomewhereCta = () => {
  return (
    <section className='relative isolate flex min-h-[484px] w-full items-center justify-center overflow-hidden bg-[#d9d9d9]'>
      {/* base gradient */}
      <div className='absolute inset-0 bg-[linear-gradient(180deg,#e3e3e3_0%,#d6d6d6_45%,#d9d9d9_100%)]' />

      {/* brighter crossing lights */}
      <div className='absolute inset-0 opacity-100'>
        <div className='absolute left-[-10%] top-[4%] h-[52%] w-[75%] rotate-[24deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.40)_22%,rgba(255,255,255,0.15)_44%,rgba(255,255,255,0)_70%)] blur-[22px]' />

        <div className='absolute right-[-8%] top-[2%] h-[54%] w-[75%] -rotate-[23deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.36)_26%,rgba(255,255,255,0.14)_48%,rgba(255,255,255,0)_74%)] blur-[24px]' />

        <div className='absolute left-[6%] bottom-[-6%] h-[58%] w-[78%] -rotate-[22deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.30)_25%,rgba(255,255,255,0.12)_46%,rgba(255,255,255,0)_72%)] blur-[26px]' />

        <div className='absolute right-[2%] bottom-[0%] h-[54%] w-[72%] rotate-[22deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.28)_28%,rgba(255,255,255,0.10)_48%,rgba(255,255,255,0)_74%)] blur-[24px]' />
      </div>

      {/* subtle vignette */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.04),transparent_40%)]' />

      {/* content */}
      <div className='relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center'>
        <h1 className='text-[42px] font-semibold leading-none tracking-[-0.06em] text-black sm:text-[72px] md:text-[86px]'>
          room residences
        </h1>

        <p className='mt-1 text-[28px] font-light uppercase leading-none tracking-[-0.04em] text-black sm:text-[48px] md:text-[58px]'>
          STAY SOMEWHERE
        </p>

        <p className='mt-8 text-base font-normal text-black/85 sm:text-[17px]'>
          We can help you with any questions or information
        </p>

        <button
          type='button'
          className='mt-12 inline-flex h-14 min-w-[250px] items-center justify-center bg-black px-8 text-[24px] font-light tracking-[-0.03em] text-white transition-transform duration-200 hover:scale-[1.02]'>
          contact us
        </button>
      </div>
    </section>
  );
};

export default StaySomewhereCta;
