/* eslint-disable @next/next/no-img-element */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

const DEFAULT_SLIDES = [
  {
    eyebrow: "01 Quick on site assembly",
    title: "",
    description:
      "Our houses are delivered as ready-to-assemble kits and built directly on-site in just 7–10 days — with no need for a foundation or heavy construction work. Perfect for quickly and efficiently launching glamping sites, rentals, or for private use.",
    cta: "",
    image: "/showcase/rec1.webp",
  },
  {
    eyebrow: "02 Aesthetics and durability",
    title: "",
    description:
      "Inspired by modern design, our structures combine visual elegance with strong and reliable assembly. A timeless style built to last — both beautiful and dependable.",
    cta: "",
    image: "/showcase/rec2.webp",
  },
  {
    eyebrow: "03 Easy installation on any site",
    title: "",
    description:
      "Install on forest plots, mountain slopes, or by the sea — with no need for utility connections and minimal environmental impact. True autonomy and placement flexibility.",
    cta: "",
    image: "/showcase/rec3.webp",
  },
  {
    eyebrow: "04 Smart investment",
    title: "",
    description:
      "High profitability — ideal for Airbnb or tourist rentals. Fast return on investment and steady income.",
    cta: "",
    image: "/showcase/rec4.webp",
  },
  {
    eyebrow: "Want to know more details?",
    title: "",
    description: "Learn more about our fast and simple installation process.",
    cta: "",
    image: "/showcase/rec5.webp",
  },
];

export default function FeaturedExperienceSection({
  slides = DEFAULT_SLIDES,
  className = "",
}) {
  const safeSlides = useMemo(
    () => (slides?.length ? slides : DEFAULT_SLIDES),
    [slides],
  );

  const sectionRef = useRef(null);
  const imageContainersRef = useRef([]);

  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  const activeIndexRef = useRef(0);
  const textIndexRef = useRef(0);
  const scrollTriggerRef = useRef(null);
  const perSlideDistanceRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const total = safeSlides.length;

  const setTextImmediate = (index) => {
    const slide = safeSlides[index];
    if (!slide) return;
    if (eyebrowRef.current) eyebrowRef.current.textContent = slide.eyebrow;
    if (titleRef.current) titleRef.current.textContent = slide.title;
    if (descRef.current) descRef.current.textContent = slide.description;
    if (ctaRef.current) ctaRef.current.textContent = slide.cta;
  };

  const animateTextChange = (index) => {
    if (index === textIndexRef.current || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    const slide = safeSlides[index];
    if (!slide) {
      isAnimatingRef.current = false;
      return;
    }

    textIndexRef.current = index;

    gsap.killTweensOf([
      eyebrowRef.current,
      titleRef.current,
      descRef.current,
      ctaRef.current,
    ]);

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.to(eyebrowRef.current, {
      x: 40,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    })
      .to(
        titleRef.current,
        { x: 50, opacity: 0, duration: 0.5, ease: "power3.in" },
        "-=0.35",
      )
      .to(
        descRef.current,
        { x: -50, opacity: 0, duration: 0.5, ease: "power3.in" },
        "-=0.35",
      )
      .to(
        ctaRef.current,
        { x: -40, opacity: 0, duration: 0.5, ease: "power3.in" },
        "-=0.35",
      )
      .add(() => setTextImmediate(index))
      .fromTo(
        eyebrowRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "+=0.1",
      )
      .fromTo(
        titleRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
        "-=1.0",
      )
      .fromTo(
        descRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
        "-=1.2",
      )
      .fromTo(
        ctaRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=1.0",
      );
  };

  const silkEase = (t) =>
    t < 0.5 ? 64 * Math.pow(t, 7) : 1 - Math.pow(-2 * t + 2, 7) / 2;

  const resetAllImages = () => {
    imageContainersRef.current.forEach((container, i) => {
      if (!container) return;
      if (i === 0) {
        gsap.set(container, {
          clipPath: "inset(0% 0% 0% 0%)",
          autoAlpha: 1,
          zIndex: 2,
        });
      } else {
        gsap.set(container, {
          clipPath: "inset(0% 100% 0% 0%)",
          autoAlpha: 0,
          zIndex: 0,
        });
      }
    });
  };

  const renderSlideProgress = (baseIndex, progress) => {
    const currentIndex = Math.max(0, Math.min(baseIndex, total - 1));
    const nextIndex = Math.min(currentIndex + 1, total - 1);
    const smoothP = silkEase(progress);
    const clipPercentage = smoothP * 100;

    imageContainersRef.current.forEach((container, i) => {
      if (!container) return;
      if (i === currentIndex) {
        gsap.set(container, {
          clipPath: `inset(0% ${clipPercentage}% 0% 0%)`,
          autoAlpha: 1,
          zIndex: 2,
        });
      } else if (i === nextIndex && nextIndex !== currentIndex) {
        gsap.set(container, {
          clipPath: "inset(0% 0% 0% 0%)",
          autoAlpha: 1,
          zIndex: 1,
        });
      } else {
        gsap.set(container, {
          clipPath: "inset(0% 100% 0% 0%)",
          autoAlpha: 0,
          zIndex: 0,
        });
      }
    });

    const visibleIndex = progress >= 0.5 ? nextIndex : currentIndex;
    activeIndexRef.current = visibleIndex;
    if (visibleIndex !== textIndexRef.current && !isAnimatingRef.current) {
      animateTextChange(visibleIndex);
    }
  };

  const goToSlide = (index) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;
    const clamped = Math.max(0, Math.min(index, total - 1));
    const y = trigger.start + perSlideDistanceRef.current * clamped + 1;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    resetAllImages();
    setTextImmediate(0);

    const mm = gsap.matchMedia();
    mm.add(
      { desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" },
      (context) => {
        const { desktop } = context.conditions;
        const perSlideDistance = desktop
          ? window.innerHeight * 1.5
          : window.innerHeight;
        perSlideDistanceRef.current = perSlideDistance;

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${perSlideDistance * (total - 1)}`,
          pin: true,
          scrub: 5,
          onUpdate: (self) => {
            const continuous = self.progress * (total - 1);
            const baseIndex = Math.floor(continuous);
            const progress = continuous - baseIndex;
            renderSlideProgress(baseIndex, progress);
          },
        });
        scrollTriggerRef.current = trigger;
        return () => trigger.kill();
      },
    );
    return () => mm.revert();
  }, [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goPrev = () => goToSlide(activeIndexRef.current - 1);
  const goNext = () => goToSlide(activeIndexRef.current + 1);

  return (
    <section
      ref={sectionRef}
      className={[
        "relative h-screen w-full overflow-hidden bg-[#1a1a1a]",
        className,
      ].join(" ")}>
      {/* Background Image Stack - Responsive adjustments */}
      <div className='absolute inset-0 overflow-hidden'>
        {safeSlides.map((slide, index) => (
          <div
            key={`img-container-${index}`}
            ref={(el) => (imageContainersRef.current[index] = el)}
            className='absolute inset-0 h-[50vh] w-full lg:h-full lg:w-full'
            style={{
              willChange: "clip-path",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}>
            <img
              src={slide.image}
              alt={slide.title}
              className='h-full w-full object-cover object-center'
              draggable='false'
              style={{ transform: "scale(1.05)" }}
            />
          </div>
        ))}
      </div>

      {/* Desktop Overlays (Hidden on Mobile) */}
      <div className='hidden lg:block absolute inset-0 z-[1] bg-black/10' />
      <div className='hidden lg:block absolute inset-y-0 left-0 z-[2] w-[49.4%] bg-black/10 backdrop-blur-xl' />
      <div className='hidden lg:block absolute inset-y-0 left-0 z-[2] w-[49.4%] bg-gradient-to-b from-black/40 via-transparent to-black/40' />
      <div className='hidden lg:block absolute inset-0 z-[2] bg-gradient-to-r from-black/40 via-transparent to-transparent' />
      <div className='hidden lg:block absolute inset-y-0 left-[49.4%] z-[3] w-px bg-white/10' />

      {/* UI Content - Flex direction column for mobile, row for desktop */}
      <div className='relative z-10 flex h-full w-full flex-col lg:flex-row'>
        {/* Top Half Spacer for Mobile (keeps text at bottom half) */}
        <div className='h-[50vh] w-full lg:hidden' />

        {/* Text and Controls Container */}
        <div className='flex h-[50vh] w-full flex-col justify-between bg-[#e3d0c9] p-6 backdrop-blur-md lg:h-full lg:max-w-[49.4%] lg:bg-transparent lg:p-12 lg:px-20 lg:py-16 lg:backdrop-blur-none'>
          <div className='overflow-hidden'>
            <div
              ref={eyebrowRef}
              className='text-[14px] molde-expanded md:text-[25px] lg:text-[30px] uppercase text-black lg:text-white/80'>
              {safeSlides[0].eyebrow}
            </div>
            <div className='mt-2 h-[2px] w-8 bg-black lg:bg-white' />
          </div>

          <div className='max-w-xl'>
            <div className='overflow-hidden'>
              <h2
                ref={titleRef}
                className='text-[20px] molde-expanded lg:text-[24px] font-semibold leading-tight text-black lg:text-white'>
                {safeSlides[0].title}
              </h2>
            </div>
            <div className='overflow-hidden'>
              <p
                ref={descRef}
                className='mt-4 lg:mt-8 text-sm lg:text-lg leading-relaxed text-black lg:text-white/70 line-clamp-3 lg:line-clamp-none'>
                {safeSlides[0].description}
              </p>
            </div>
            <div className='overflow-hidden'>
              <button
                ref={ctaRef}
                className='mt-6 lg:mt-10 inline-block underline text-sm lg:text-[18px] cursor-pointer font-medium text-black lg:text-white transition-colors'>
                {safeSlides[0].cta}
              </button>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <button
              onClick={goPrev}
              className='group flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-black lg:border-white text-black lg:text-white transition-all duration-300 hover:bg-white hover:text-black'>
              <ChevronLeft className='h-4 w-4 lg:h-5 lg:w-5' />
            </button>
            <button
              onClick={goNext}
              className='group flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-black lg:border-white text-black lg:text-white transition-all duration-300 hover:bg-white hover:text-black'>
              <ChevronRight className='h-4 w-4 lg:h-5 lg:w-5' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
