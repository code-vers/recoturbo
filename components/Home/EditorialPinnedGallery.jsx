/* eslint-disable @next/next/no-img-element */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useMemo, useRef } from "react";

const DEFAULT_SLIDES = [
  {
    title: "ETHEREAL DESIGN",
    description:
      "Designed to transform an authentic immersion into nature, air bubbles reflecting the sky and the sea",
    image: "/ab.jpg",
  },
  {
    title: "PURE CONNECTION WITH NATURE",
    description:
      "Shebara offers a unique blend of lush ecosystems and breathtaking coral reefs, where barefoot luxury meets conservation",
    image: "/bc.jpg",
  },
  {
    title: "SCULPTED SERENITY",
    description:
      "Curved forms, immersive views, and tactile materials come together to shape a timeless atmosphere of elevated hospitality.",
    image: "/cd.jpg",
  },
];

export default function EditorialPinnedGallery({
  slides = DEFAULT_SLIDES,
  className = "",
}) {
  const safeSlides = useMemo(
    () => (slides?.length ? slides : DEFAULT_SLIDES),
    [slides],
  );

  const sectionRef = useRef(null);
  const titleWrapRef = useRef(null);
  const descWrapRef = useRef(null);
  const countWrapRef = useRef(null);
  const progressFillRef = useRef(null);
  const imageRefs = useRef([]);
  const dotRefs = useRef([]);
  const activeIndexRef = useRef(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const titleWrap = titleWrapRef.current;
    const descWrap = descWrapRef.current;
    const countWrap = countWrapRef.current;
    const progressFill = progressFillRef.current;
    const images = imageRefs.current.filter(Boolean);
    const dots = dotRefs.current.filter(Boolean);

    if (
      !section ||
      !titleWrap ||
      !descWrap ||
      !countWrap ||
      !progressFill ||
      !images.length
    ) {
      return;
    }

    // GPU-accelerate all image layers upfront — no scale, just compositing
    images.forEach((img) => {
      img.style.willChange = "opacity";
    });

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isTablet } = context.conditions;
        const total = safeSlides.length;

        const setTextImmediate = (index) => {
          const slide = safeSlides[index];
          titleWrap.innerHTML = `<span class="block">${slide.title}</span>`;
          descWrap.innerHTML = `<span class="block">${slide.description}</span>`;
          countWrap.innerHTML = `<span class="block">${index + 1}/${total}</span>`;
        };

        const animateTextChange = (index) => {
          const slide = safeSlides[index];
          const targets = [titleWrap, descWrap, countWrap];

          const tl = gsap.timeline({ defaults: { overwrite: true } });

          tl.to(targets, {
            y: -12,
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.38,
            stagger: 0.04,
            ease: "power2.inOut",
          });

          tl.add(() => {
            titleWrap.innerHTML = `<span class="block">${slide.title}</span>`;
            descWrap.innerHTML = `<span class="block">${slide.description}</span>`;
            countWrap.innerHTML = `<span class="block">${index + 1}/${total}</span>`;
          });

          tl.fromTo(
            targets,
            {
              y: 20,
              opacity: 0,
              clipPath: "inset(100% 0 0% 0)",
            },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0% 0 0% 0)",
              duration: 0.85,
              stagger: 0.06,
              ease: "expo.out",
            },
          );
        };

        const updateDots = (index) => {
          dots.forEach((dot, i) => {
            gsap.to(dot, {
              opacity: i <= index ? 1 : 0.22,
              duration: 0.6,
              ease: "power2.out",
              overwrite: true,
            });
          });
        };

        const showSlide = (index, immediate = false) => {
          const clamped = Math.max(0, Math.min(index, total - 1));
          if (!immediate && clamped === activeIndexRef.current) return;

          const prev = activeIndexRef.current;
          activeIndexRef.current = clamped;

          if (immediate) {
            setTextImmediate(clamped);
          } else {
            animateTextChange(clamped);
          }

          images.forEach((img, i) => {
            if (immediate) {
              gsap.set(img, {
                autoAlpha: i === clamped ? 1 : 0,
                force3D: true,
              });
              return;
            }

            if (i === clamped) {
              // New image waits for old to mostly vanish, then fades in cleanly
              gsap.fromTo(
                img,
                { autoAlpha: 0, force3D: true, immediateRender: false },
                {
                  autoAlpha: 1,
                  force3D: true,
                  duration: 2.0,
                  delay: 0.55,
                  ease: "power1.inOut",
                  overwrite: true,
                },
              );
            } else if (i === prev) {
              // Old image dissolves away slowly — no scale, no jitter
              gsap.to(img, {
                autoAlpha: 0,
                force3D: true,
                duration: 2.2,
                ease: "power1.inOut",
                overwrite: true,
              });
            } else {
              // Any other slide: instantly hidden
              gsap.set(img, { autoAlpha: 0, force3D: true });
            }
          });

          updateDots(clamped);
        };

        // Initial state
        images.forEach((img, i) => {
          gsap.set(img, {
            autoAlpha: i === 0 ? 1 : 0,
            force3D: true,
          });
        });

        dots.forEach((dot, i) => {
          gsap.set(dot, { opacity: i === 0 ? 1 : 0.22 });
        });

        setTextImmediate(0);
        gsap.set(progressFill, { scaleX: 1 / total });
        showSlide(0, true);

        const perSlideDistance = isDesktop
          ? window.innerHeight * 1.35
          : isTablet
            ? window.innerHeight * 1.12
            : window.innerHeight * 1.0;

        const holdDistance = isDesktop
          ? window.innerHeight * 0.24
          : window.innerHeight * 0.14;

        const totalDistance = perSlideDistance * total + holdDistance;
        const revealDistance = totalDistance - holdDistance;

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${totalDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 3.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: false,
          onUpdate: (self) => {
            const scrolled = Math.min(
              self.progress * totalDistance,
              revealDistance,
            );
            const continuous = scrolled / perSlideDistance;

            const fillScale = Math.min(
              1,
              Math.max(1 / total, (continuous + 1) / total) * 0.8,
            );
            gsap.to(progressFill, {
              scaleX: fillScale,
              duration: 0.9,
              ease: "power2.out",
              overwrite: true,
            });

            const nextIndex = Math.min(total - 1, Math.floor(continuous));
            if (nextIndex !== activeIndexRef.current) {
              showSlide(nextIndex);
            }
          },
        });

        return () => {
          trigger.kill();
        };
      },
    );

    return () => mm.revert();
  }, [safeSlides]);

  return (
    <div>
      <section
        ref={sectionRef}
        className={[
          "relative h-screen w-full py-10 pt-40 md:pt-0 overflow-hidden bg-[#ebe7e4] p-4 md:p-0",
          className,
        ].join(" ")}
        style={{
          isolation: "isolate",
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(255,232,220,0.42), transparent 18%), radial-gradient(circle at 66% 15%, rgba(194,220,255,0.24), transparent 16%), radial-gradient(circle at 84% 86%, rgba(255,221,206,0.16), transparent 14%)",
        }}>
        <div>
          <div className='mx-auto flex h-full w-full max-w-[1640px] flex-col pt-4 pb-4 sm:pt-5 sm:pb-5 lg:pt-10 lg:pb-6'>
            <div className='grid grid-cols-12 gap-y-5 lg:gap-y-0 lg:gap-x-[42px] h-[200px] md:h-auto'>
              <div className='col-span-12 lg:col-span-6'>
                <div className='mb-4 h-[2px] w-[40px] bg-[#2b2b2b]/75 lg:mb-5' />
                <div
                  ref={titleWrapRef}
                  className='max-w-[780px] molde-expanded text-[24px] md:text-[50px] leading-[30px] md:leading-[50px] font-normal text-black'>
                  <span className='block'>{safeSlides[0].title}</span>
                </div>
              </div>

              <div className='col-span-12 lg:col-span-6 lg:pt-[14px]'>
                <div
                  ref={descWrapRef}
                  className='max-w-[800px] text-[15px] md:text-[18px] md:mt-7 leading-[25px] text-black'>
                  <span className='block'>{safeSlides[0].description}</span>
                </div>

                <div className='mt-8 flex w-[120px] flex-col gap-[7px] lg:mt-11'>
                  <div
                    ref={countWrapRef}
                    className='text-[clamp(15px,0.96vw,22px)] leading-none tracking-[-0.03em] text-black'>
                    <span className='block'>1/{safeSlides.length}</span>
                  </div>

                  <div className='relative h-[2px] w-[80px] overflow-hidden bg-[#c8c0bb]'>
                    <div
                      ref={progressFillRef}
                      className='absolute inset-y-0 left-0 w-full origin-left bg-[#1d1d1d]'
                      style={{
                        transform: `scaleX(${2 / safeSlides.length})`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='relative mt-12 h-[56vh] overflow-hidden sm:mt-7 sm:h-[58vh] md:mt-8 md:h-[60vh] lg:mt-9 lg:h-[66.5vh]'>
              <div className='relative h-full w-full overflow-hidden'>
                {safeSlides.map((slide, index) => (
                  <div
                    key={`${slide.title}-${index}`}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className='absolute px-2 md:px-4 inset-0'>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className='h-[200px] md:h-[550.59] w-full object-cover mt-12'
                      draggable='false'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
