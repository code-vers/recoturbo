import About from "@/components/Home/About";
import EditorialPinnedGallery from "@/components/Home/EditorialPinnedGallery";
import LuxuryFaqSection from "@/components/Home/faq";
import HeroBanner from "@/components/Home/HeroBanner";
import LocationArrivalMapsSection from "@/components/Home/LocationArrivalMapsSection";
import LuxuryResortShowcase from "@/components/Home/LuxuryResortShowcase";
import StaySomewhereCta from "@/components/Home/StaySomewhereCta";

export default function Page() {
  return (
    <>
      <HeroBanner videoSrc='/videos/VRoom.mp4' brand='sung' showMark={true} />

      <About />
      <EditorialPinnedGallery />
      <LuxuryResortShowcase />
      <LuxuryFaqSection />
      <LocationArrivalMapsSection
        content={{
          leftMapImage: "/UK.png",
          rightMapImage: "/Baharain.png",
        }}
      />
      <StaySomewhereCta />
    </>
  );
}
