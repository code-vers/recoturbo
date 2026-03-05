import HeroBanner from "@/components/Home/HeroBanner";

export default function Page() {
  return (
    <>
      <>
        <HeroBanner
          videoSrc='/videos/ocean.mp4'
          brand='Vipp Residences'
          showMark={true}
        />

        <div className='h-[200vh] bg-zinc-950' />
      </>

      <div className='h-[200vh] bg-zinc-950' />
    </>
  );
}
