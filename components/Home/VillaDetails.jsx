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
    "/image_0609a9.jpg",
    "/image_060948.jpg",
    "/image_060985.jpg",
  ];

  const features = {
    "Living Area": "Dining Table, Lounge, Bar Unit, Pantry",
    Bedroom:
      "King Bed, Wardrobe, Dressing Table, Double Shower, Double Vanity, Enclosed Toilet & Bidet, Bathtub",
    "Outdoor Features":
      "Infinity Pool, Terrace, Double Daybed, Sunken Lounge, Outdoor Shower",
  };

  return (
    <section
      className='bg-[#ebe7e4] min-h-screen px-4 md:px-8 lg:px-0'
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
              Size: <b className='text-black'>188 sqm (I: 103 sqm E: 85 sqm)</b>
            </span>
            <span>
              Beds: <b className='text-black'>King Size bed</b>
            </span>
            <span>
              Maximum Occupancy:{" "}
              <b className='text-black'>2 Adults, 1 Child, and 1 Infant</b>
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
        <div className='flex flex-col md:flex-row gap-2 w-full border-b border-gray-200 pb-6 lg:pb-0'>
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className={`flex-1 py-4 lg:py-5 hover:bg-black hover:text-white cursor-pointer uppercase tracking-[0.2em] text-xs lg:text-sm font-medium border border-black transition-colors ${showFeatures ? "bg-black text-white" : "bg-transparent text-black"}`}>
            {showFeatures ? "Close" : "Explore"}
          </button>
          <button className='flex-1 cursor-pointer py-4 lg:py-5 hover:bg-black text-black hover:text-white uppercase tracking-[0.2em] text-xs lg:text-sm font-medium border border-black transition-colors'>
            Check Availability
          </button>
        </div>

        {/* Expandable Features Section */}
        {showFeatures && (
          <div className='py-8 lg:py-12 animate-in fade-in slide-in-from-top-4 duration-700 ease-in-out'>
            {/* Header with Underline */}
            <div className='relative mb-8 lg:mb-12 border-b border-gray-300'>
              <h2 className='text-[24px] lg:text-[32px] font-light tracking-wide pb-4'>
                Villa Features
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
                  <span className='text-[14px] text-[#4a4a4a] tracking-wide leading-relaxed lg:text-right'>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VillaDetails;
