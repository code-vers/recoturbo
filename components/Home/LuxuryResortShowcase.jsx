/* eslint-disable @next/next/no-img-element */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

const DEFAULT_SLIDES = [
  {
    eyebrow: "FEATURED EXPERIENCE",
    title: "Catamaran Sailing",
    description:
      "Discover thrilling sailing adventures and elevate your skills with our world-class instructors and diverse immersive programs. Set sail today!",
    cta: "Explore More Experiences",
    image: "/ab.jpg",
  },
  {
    eyebrow: "FEATURED EXPERIENCE",
    title: "Sunset Cruise",
    description:
      "Enjoy a refined evening at sea with warm coastal light, curated service, and uninterrupted horizon views in a truly memorable setting.",
    cta: "Explore More Experiences",
    image: "/a1.jpg",
  },
  {
    eyebrow: "FEATURED EXPERIENCE",
    title: "Private Island Escape",
    description:
      "Step into secluded island moments designed around comfort, privacy, and immersive connection with the surrounding landscape.",
    cta: "Explore More Experiences",
    image: "/cd.jpg",
  },
  {
    eyebrow: "FEATURED EXPERIENCE",
    title: "Ocean Discovery",
    description:
      "Explore marine beauty through guided experiences that combine adventure, elegance, and a deep sense of place.",
    cta: "Explore More Experiences",
    image: "/a1.jpg",
  },
  {
    eyebrow: "FEATURED EXPERIENCE",
    title: "Wellness by the Water",
    description:
      "Slow down and reconnect through calming rituals, open sea views, and intentionally designed moments of stillness.",
    cta: "Explore More Experiences",
    image: "/b1.jpg",
  },
  {
    eyebrow: "FEATURED EXPERIENCE",
    title: "Coral Reef Journey",
    description:
      "Discover extraordinary reef environments through immersive experiences shaped by nature, clarity, and thoughtful guidance.",
    cta: "Explore More Experiences",
    image: "/ab.jpg",
  },
  {
    eyebrow: "FEATURED EXPERIENCE",
    title: "Luxury Sailing Retreat",
    description:
      "A graceful balance of freedom, comfort, and panoramic beauty, crafted for guests seeking a refined adventure at sea.",
    cta: "Explore More Experiences",
    image: "/cd.jpg",
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
  const imageRefs = useRef([]);

  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  const activeIndexRef = useRef(0);
  const textIndexRef = useRef(0);
  const scrollTriggerRef = useRef(null);
  const perSlideDistanceRef = useRef(0);

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
    if (index === textIndexRef.current) return;

    const slide = safeSlides[index];
    if (!slide) return;

    textIndexRef.current = index;

    const elements = [
      eyebrowRef.current,
      titleRef.current,
      descRef.current,
      ctaRef.current,
    ].filter(Boolean);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    tl.to(elements, {
      y: 8,
      opacity: 0,
      duration: 0.18,
      stagger: 0.03,
      overwrite: true,
    });

    tl.add(() => {
      if (eyebrowRef.current) eyebrowRef.current.textContent = slide.eyebrow;
      if (titleRef.current) titleRef.current.textContent = slide.title;
      if (descRef.current) descRef.current.textContent = slide.description;
      if (ctaRef.current) ctaRef.current.textContent = slide.cta;
    });

    tl.fromTo(
      elements,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.42,
        stagger: 0.035,
      },
    );
  };

  const setImageState = (
    el,
    { visible, xPercent = 0, scale = 1, zIndex = 0, opacity = 1 },
  ) => {
    if (!el) return;

    gsap.set(el, {
      autoAlpha: visible ? opacity : 0,
      xPercent,
      scale,
      zIndex,
      willChange: "transform, opacity",
      force3D: true,
      backfaceVisibility: "hidden",
      transformOrigin: "center center",
    });
  };

  const resetAllImages = () => {
    imageRefs.current.forEach((img) => {
      setImageState(img, {
        visible: false,
        xPercent: 110,
        scale: 1.02,
        zIndex: 0,
        opacity: 0,
      });
    });
  };

  const renderSlideProgress = (baseIndex, progress) => {
    const currentIndex = Math.max(0, Math.min(baseIndex, total - 1));
    const nextIndex = Math.min(currentIndex + 1, total - 1);

    const rawP = Math.max(0, Math.min(progress, 1));
    const easedP = gsap.parseEase("power3.out")(rawP);

    imageRefs.current.forEach((img, i) => {
      if (!img) return;

      if (i === currentIndex) {
        setImageState(img, {
          visible: true,
          xPercent: -easedP * 4,
          scale: 1 - easedP * 0.01,
          zIndex: 1,
          opacity: 1,
        });
      } else if (i === nextIndex && nextIndex !== currentIndex) {
        setImageState(img, {
          visible: true,
          xPercent: 110 - easedP * 110,
          scale: 1.02 - easedP * 0.02,
          zIndex: 2,
          opacity: 1,
        });
      } else {
        setImageState(img, {
          visible: false,
          xPercent: 110,
          scale: 1.02,
          zIndex: 0,
          opacity: 0,
        });
      }
    });

    const visibleIndex = rawP >= 0.6 ? nextIndex : currentIndex;
    activeIndexRef.current = visibleIndex;

    if (visibleIndex !== textIndexRef.current) {
      animateTextChange(visibleIndex);
    }
  };

  const goToSlide = (index) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const clamped = Math.max(0, Math.min(index, total - 1));
    const y = trigger.start + perSlideDistanceRef.current * clamped;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const images = imageRefs.current.filter(Boolean);

    if (!section || !images.length) return;

    resetAllImages();
    setTextImmediate(0);
    textIndexRef.current = 0;
    activeIndexRef.current = 0;
    renderSlideProgress(0, 0);

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 1024px)",
        tablet: "(min-width: 768px) and (max-width: 1023px)",
        mobile: "(max-width: 767px)",
      },
      (context) => {
        const { desktop, tablet } = context.conditions;

        const perSlideDistance = desktop
          ? window.innerHeight * 1.22
          : tablet
            ? window.innerHeight * 1.06
            : window.innerHeight * 0.95;

        const holdDistance = desktop
          ? window.innerHeight * 0.24
          : tablet
            ? window.innerHeight * 0.16
            : window.innerHeight * 0.12;

        perSlideDistanceRef.current = perSlideDistance;

        const totalDistance = perSlideDistance * (total - 1) + holdDistance;

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${totalDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: false,
          onUpdate: (self) => {
            const maxScrollable = perSlideDistance * (total - 1);
            const scrolled = Math.min(
              self.progress * totalDistance,
              maxScrollable,
            );

            const continuous = scrolled / perSlideDistance;
            const baseIndex = Math.floor(continuous);
            const progress = continuous - baseIndex;

            renderSlideProgress(baseIndex, progress);
          },
        });

        scrollTriggerRef.current = trigger;

        return () => {
          trigger.kill();
          scrollTriggerRef.current = null;
        };
      },
    );

    return () => {
      mm.revert();
    };
  }, [total, safeSlides]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        goToSlide((activeIndexRef.current - 1 + total) % total);
      }

      if (e.key === "ArrowRight") {
        goToSlide((activeIndexRef.current + 1) % total);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const goPrev = () => goToSlide((activeIndexRef.current - 1 + total) % total);
  const goNext = () => goToSlide((activeIndexRef.current + 1) % total);

  return (
    <section
      ref={sectionRef}
      className={[
        "relative h-screen w-full overflow-hidden bg-[#69717a] py-12",
        className,
      ].join(" ")}>
      {/* Full-width image stack */}
      <div className='absolute inset-0 overflow-hidden'>
        {safeSlides.map((slide, index) => (
          <div
            key={`img-${slide.title}-${index}`}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className='absolute inset-0 overflow-hidden'>
            <img
              src={slide.image}
              alt={slide.title}
              className='h-full w-full object-cover'
              draggable='false'
            />
          </div>
        ))}
      </div>

      {/* Left soft blur overlay */}
      <div className='absolute inset-y-0 left-0 z-[2] w-[49.4%] bg-[rgba(120,150,170,0.14)] backdrop-blur-[18px]' />

      {/* Left color wash */}
      <div className='absolute inset-y-0 left-0 z-[2] w-[49.4%] bg-[linear-gradient(180deg,rgba(23,34,43,0.42)_0%,rgba(17,42,58,0.34)_38%,rgba(10,56,80,0.40)_100%)]' />

      {/* Global overlay */}
      <div className='absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(12,24,35,0.22)_0%,rgba(12,24,35,0.14)_34%,rgba(12,24,35,0.04)_52%,rgba(12,24,35,0.00)_62%)]' />

      {/* Divider */}
      <div className='absolute inset-y-0 left-[49.4%] z-[3] w-px bg-white/12' />

      {/* Content */}
      <div className='relative z-10 flex h-full w-full'>
        <div className='flex h-full w-full'>
          <div className='flex w-full max-w-[49.4%] flex-col justify-between px-6 py-9 sm:px-8 sm:py-10 lg:px-[54px] lg:py-[42px] xl:px-[56px]'>
            <div className='pt-[2px]'>
              <div
                ref={eyebrowRef}
                className='text-[clamp(18px,1.62vw,31px)] font-medium uppercase leading-none tracking-[-0.035em] text-white/92'>
                {safeSlides[0].eyebrow}
              </div>
              <div className='mt-[10px] h-[2px] w-[39px] bg-white/92' />
            </div>

            <div className='max-w-[720px] pb-[6.8vh]'>
              <h2
                ref={titleRef}
                className='text-[clamp(22px,2vw,40px)] font-semibold leading-[1.04] tracking-[-0.04em] text-white'>
                {safeSlides[0].title}
              </h2>

              <p
                ref={descRef}
                className='mt-[38px] max-w-[840px] text-[clamp(16px,1.12vw,25px)] leading-[1.42] tracking-[-0.022em] text-white/92'>
                {safeSlides[0].description}
              </p>

              <button
                ref={ctaRef}
                className='mt-[42px] inline-flex border-b border-white/85 pb-[2px] text-[clamp(15px,1vw,20px)] font-medium tracking-[-0.02em] text-white'>
                {safeSlides[0].cta}
              </button>
            </div>

            <div className='flex items-center gap-[16px]'>
              <button
                type='button'
                onClick={goPrev}
                className='flex h-[58px] w-[58px] items-center justify-center rounded-full border border-white/80 text-white transition duration-300 hover:bg-white/10'
                aria-label='Previous slide'>
                <ChevronLeft className='h-[22px] w-[22px]' strokeWidth={1.7} />
              </button>

              <button
                type='button'
                onClick={goNext}
                className='flex h-[58px] w-[58px] items-center justify-center rounded-full border border-white/80 text-white transition duration-300 hover:bg-white/10'
                aria-label='Next slide'>
                <ChevronRight className='h-[22px] w-[22px]' strokeWidth={1.7} />
              </button>
            </div>
          </div>

          <div className='hidden flex-1 lg:block' />
        </div>
      </div>
    </section>
  );
}
