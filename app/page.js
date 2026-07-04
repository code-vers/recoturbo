import About from '@/components/Home/About';
import EditorialPinnedGallery from '@/components/Home/EditorialPinnedGallery';
import FeaturedExperienceSection2 from '@/components/Home/FeaturedExperienceSection2';
import HeroBanner from '@/components/Home/HeroBanner';
import HeroSection2 from '@/components/Home/HeroSection2';
import LuxuryResortShowcase from '@/components/Home/LuxuryResortShowcase';
import StaySomewhereCta from '@/components/Home/StaySomewhereCta';
import VillaDetails from '@/components/Home/VillaDetails';
import DynamicTitle from '@/components/Shared/DynamicTitle';
import DynamicTitle2 from '@/components/Shared/DynamicTitle2';
import LetsConnect from '@/components/Home/LetsConnect';

export default function Page() {
  return (
    <>
      <HeroBanner videoSrc='/videos/VRoom.mp4' brand='sung' showMark={true} />

      <About />
      <EditorialPinnedGallery />
      <VillaDetails />
      <DynamicTitle text={'LUXURY ROOMS ANYWHERE IN THE WORLD'} />
      <LuxuryResortShowcase />
      <div className='pt-50 bg-[#ebe7e4]'>
        <HeroSection2 />
      </div>
      <DynamicTitle2 />
      <FeaturedExperienceSection2 />
      {/* <LocationArrivalMapsSection
        content={{
          leftMapImage: '/UK.png',
          rightMapImage: '/Baharain.png',
        }}
      /> */}
      {/* <OrderSteps /> */}
      <LetsConnect />
      <StaySomewhereCta />
    </>
  );
}
