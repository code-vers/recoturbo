import About from "@/components/Home/About";
import EditorialPinnedGallery from "@/components/Home/EditorialPinnedGallery";
import LuxuryFaqSection from "@/components/Home/faq";
import FeaturedExperienceSection2 from "@/components/Home/FeaturedExperienceSection2";
import HeroBanner from "@/components/Home/HeroBanner";
import LocationArrivalMapsSection from "@/components/Home/LocationArrivalMapsSection";
import LuxuryResortShowcase from "@/components/Home/LuxuryResortShowcase";
import OrderSteps from "@/components/Home/OrderSteps";
import StaySomewhereCta from "@/components/Home/StaySomewhereCta";
import VillaDetails from "@/components/Home/VillaDetails";
import DynamicTitle from "@/components/Shared/DynamicTitle";
import DynamicTitle2 from "@/components/Shared/DynamicTitle2";

export default function Page() {
  return (
    <>
      <HeroBanner videoSrc='/videos/VRoom.mp4' brand='sung' showMark={true} />

      <About />
      <EditorialPinnedGallery />
      <VillaDetails />
      <DynamicTitle text={"INNOVATIVE HOMES ANYWHERE IN THE WORLD"} />
      <LuxuryResortShowcase />
      <DynamicTitle2 text={"From Vision → to Profit"} />
      <FeaturedExperienceSection2 />
      <LuxuryFaqSection />
      <LocationArrivalMapsSection
        content={{
          leftMapImage: "/UK.png",
          rightMapImage: "/Baharain.png",
        }}
      />
      <OrderSteps />
      <StaySomewhereCta />
    </>
  );
}
