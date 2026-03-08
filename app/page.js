import About from "@/components/Home/About";
import EditorialPinnedGallery from "@/components/Home/EditorialPinnedGallery";
import HeroBanner from "@/components/Home/HeroBanner";

export default function Page() {
  return (
    <>
      <HeroBanner
        videoSrc='/videos/ocean.mp4'
        brand='Vipp Residences'
        showMark={true}
      />

      <About />
      <EditorialPinnedGallery />

      <p className='text-5xl text-red-800'>Hello Sung</p>

      {/* <div className='h-[200vh] bg-zinc-950' />s */}
    </>
  );
}
