"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const VillaDetails = () => {
  const [showFeatures, setShowFeatures] = useState(false);

  const images = [
    "/roomone-01.jpg",
    "/roomone-02.jpg",
    "/roomone-03.jpg",
    "/roomone-04.jpg",
    "/roomone-05.jpg",
    "/roomone-07.jpg",
    "/roomone-08.jpg",
    "/roomone-09.jpg",
    "/grok-image-89d36f3d-449b-4495-91bf-ed61e385a719-2.png",
  ];

  const features = {
    Concept:
      "A refined, design-led retreat suite created for seamless placement in natural settings, hospitality environments, or private land.",
    Versatility:
      "The R1 Terra Suite is perfectly suited for short-stay rentals, boutique accommodation, or personal use, offering a flexible space that comfortably accommodates a couple or small family. Thoughtfully designed to be compact, energy-efficient, and visually striking, it delivers both comfort and versatility—equally suited as a luxury guest suite, workspace, or reception unit. The R1 Terra Suite is designed around a flexible, modular interior system that maximises both space and functionality. Each unit seamlessly integrates a bedroom area, mini-kitchen, bathroom, wardrobe, and lounge seating, creating a complete, self-contained living environment.",
    Interior:
      "Designed around a flexible, modular interior system that integrates a bedroom area, mini-kitchen, bathroom, wardrobe, and lounge seating.",
    Adaptability:
      "Fully adaptable system allowing for additional configurations such as upper-level extensions or secondary bedroom modules, enabling the space to evolve in line with different lifestyle or hospitality requirements.",
    Philosophy:
      "Every detail is considered, resulting in a space that is not just visually striking, but deeply restorative—a private sanctuary designed for elevated living at the edge of nature.",
  };

  return (
    <section
      className='bg-[#ebe7e4] lg:min-h-screen px-4 md:px-8 lg:px-0'
      style={{
        isolation: "isolate",
        backgroundImage:
          "radial-gradient(circle at 18% 22%, rgba(255,232,220,0.42), transparent 18%), radial-gradient(circle at 66% 15%, rgba(194,220,255,0.24), transparent 16%), radial-gradient(circle at 84% 86%, rgba(255,221,206,0.16), transparent 14%)",
      }}>
      <div className='max-w-[1640px] mx-auto font-sans text-[#1a1a1a]'>
        {/* Header Info */}
        <div className='py-6 lg:py-10'>
          <h1 className='text-[32px] md:text-[40px] molde-expanded lg:text-[50px] font-light uppercase mb-4 leading-tight'>
            R1 Terra Suite by Room Residences
          </h1>
          <div className='flex flex-col lg:flex-row lg:gap-6 text-[13px] lg:text-[14px] font-medium uppercase leading-[25px] text-gray-600'>
            <span>
              Size: <b className='text-black'>6 x 5m (30 sqm) </b>
            </span>
            <span>
              From : <b className='text-black'>£70,500 / 30m²</b>
            </span>
          </div>
        </div>

        {/* Main Slider Section */}
        <div className='relative group mb-4 lg:mb-0'>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".prev-btn",
              nextEl: ".next-btn",
            }}
            loop={false}
            className='w-full h-[300px] md:h-[450px] lg:h-[600px]'>
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Villa view ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </SwiperSlide>
            ))}

            {/* Custom Navigation Buttons - Hidden on small mobile for cleaner UI */}
            <button className='prev-btn absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/80 rounded-full shadow-lg backdrop-blur-sm transition-all hover:bg-white disabled:opacity-0'>
              <ChevronLeft
                size={20}
                className='lg:w-6 lg:h-6'
                strokeWidth={1.5}
              />
            </button>
            <button className='next-btn absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/80 rounded-full shadow-lg backdrop-blur-sm transition-all hover:bg-white disabled:opacity-0'>
              <ChevronRight
                size={20}
                className='lg:w-6 lg:h-6'
                strokeWidth={1.5}
              />
            </button>
          </Swiper>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col md:flex-row gap-2 w-full border-b border-gray-200 mt-5 pb-6 lg:pb-0'>
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className={`flex-1 py-4 lg:py-5 hover:bg-black hover:text-white cursor-pointer uppercase tracking-[0.2em] text-xs lg:text-sm font-medium border border-black transition-colors ${showFeatures ? "bg-black text-white" : "bg-transparent text-black"}`}>
            {showFeatures ? "Close" : "Explore"}
          </button>
          <button className='flex-1 cursor-pointer py-4 lg:py-5 hover:bg-black text-black hover:text-white uppercase tracking-[0.2em] text-xs lg:text-sm font-medium border border-black transition-colors'>
            Book Consultation
          </button>
        </div>

        {/* Expandable Features Section */}
        {showFeatures && (
          <div className='py-8 lg:py-12 animate-in fade-in slide-in-from-top-4 duration-700 ease-in-out'>
            {/* Header with Underline */}
            <div className='relative mb-8 lg:mb-12 border-b border-gray-300'>
              <h2 className='text-[24px] lg:text-[32px] font-light tracking-wide pb-4'>
                Room Features
              </h2>
              <div className='absolute bottom-0 left-0 w-[80px] lg:w-[120px] h-[1.5px] bg-black'></div>
            </div>

            <div className='flex flex-col gap-0'>
              {Object.entries(features).map(([key, value]) => (
                <div
                  key={key}
                  className='grid grid-cols-1 lg:grid-cols-[350px_1fr] border-b border-gray-300 py-6 items-baseline'>
                  <span className='font-bold text-[13px] lg:text-[14px] uppercase tracking-[0.1em] mb-2 lg:mb-0'>
                    {key}:
                  </span>
                  <span className='text-[14px] text-[#4a4a4a] tracking-wide leading-relaxed'>
                    {value}
                  </span>
                </div>
              ))}
              <div className='flex justify-center pt-10'>
                <img src='/r1.jpg' className='h-100' alt='' />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VillaDetails;
