/* eslint-disable @next/next/no-img-element */
"use client";

import gsap from "gsap";
import { useLayoutEffect, useMemo, useRef } from "react";

const DEFAULT_CONTENT = {
  eyebrow: "",
  title: "OUR LOCATION AND\nARRIVAL INFORMATION",
  description:
    "The Red Sea destination is 500km north of Jeddah, between the Saudi towns of AlWajh and Umluj. With its own dedicated Red Sea International Airport, the destination is easily accessible to visitors from around the world.",
  leftLabel: "UK MAP",
  rightLabel: "BAHRAIN MAP",
  leftMapImage: "/uk-map.jpg",
  rightMapImage: "/bahrain-map.jpg",
};

export default function LocationArrivalMapsSection({
  content = DEFAULT_CONTENT,
  className = "",
}) {
  const safeContent = useMemo(
    () => ({ ...DEFAULT_CONTENT, ...content }),
    [content],
  );

  const sectionRef = useRef(null);
  const introLineRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const leftLabelRef = useRef(null);
  const rightLabelRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(introLineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set([titleRef.current, descRef.current], {
        y: 26,
        opacity: 0,
        filter: "blur(8px)",
      });

      gsap.set([leftCardRef.current, rightCardRef.current], {
        y: 48,
        opacity: 0,
      });

      gsap.set([leftLabelRef.current, rightLabelRef.current], {
        y: 18,
        opacity: 0,
        filter: "blur(6px)",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.to(introLineRef.current, {
        scaleX: 1,
        duration: 0.7,
      })
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
          },
          "-=0.3",
        )
        .to(
          descRef.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
          },
          "-=0.72",
        )
        .to(
          [leftCardRef.current, rightCardRef.current],
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
          },
          "-=0.52",
        )
        .to(
          [leftLabelRef.current, rightLabelRef.current],
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.06,
          },
          "-=0.7",
        );

      [leftCardRef.current, rightCardRef.current].forEach((card) => {
        if (!card) return;

        const image = card.querySelector("[data-map-image]");
        const overlay = card.querySelector("[data-map-overlay]");

        const enter = () => {
          gsap.to(image, {
            scale: 1.035,
            duration: 1.2,
            ease: "power3.out",
          });
          gsap.to(overlay, {
            opacity: 0.18,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        const leave = () => {
          gsap.to(image, {
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          });
          gsap.to(overlay, {
            opacity: 0.1,
            duration: 0.45,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        card._enter = enter;
        card._leave = leave;
      });
    }, sectionRef);

    return () => {
      [leftCardRef.current, rightCardRef.current].forEach((card) => {
        if (!card?._enter || !card?._leave) return;
        card.removeEventListener("mouseenter", card._enter);
        card.removeEventListener("mouseleave", card._leave);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={[
        "relative w-full overflow-hidden bg-[#e7d9d4]",
        className,
      ].join(" ")}>
      <div className='mx-auto w-full max-w-[1529px]'>
        {/* Top content */}
        <div className='grid grid-cols-1 gap-y-10 px-[42px] pb-0 pt-[68px] md:grid-cols-[1fr_1fr] md:gap-x-[56px] lg:px-[70px] xl:px-[86px]'>
          <div className='max-w-[560px]'>
            <div ref={introLineRef} className='h-[2px] w-[33px] bg-[#111111]' />

            <h2
              ref={titleRef}
              className='whitespace-pre-line pt-[36px] text-[34px] font-normal uppercase leading-[0.98] tracking-[-0.05em] text-[#111111] sm:text-[42px] md:text-[50px] lg:text-[55px]'
              style={{
                fontFamily:
                  'var(--font-sans, "Helvetica Neue", Helvetica, Arial, sans-serif)',
              }}>
              {safeContent.title}
            </h2>
          </div>

          <div className='flex justify-start md:justify-end'>
            <p
              ref={descRef}
              className='max-w-[533px] pt-[0px] text-[18px] font-normal leading-[1.32] tracking-[-0.025em] text-[#252525] sm:text-[20px] lg:text-[21px]'
              style={{
                fontFamily:
                  'var(--font-sans, "Helvetica Neue", Helvetica, Arial, sans-serif)',
              }}>
              {safeContent.description}
            </p>
          </div>
        </div>

        {/* Bottom maps */}
        <div
          ref={cardsWrapRef}
          className='grid grid-cols-1 gap-0 pt-[88px] py-10 md:grid-cols-2'>
          <MapPanel
            refProp={leftCardRef}
            labelRef={leftLabelRef}
            label={safeContent.leftLabel}
            image={safeContent.leftMapImage}
            alt='UK map'
          />

          <MapPanel
            refProp={rightCardRef}
            labelRef={rightLabelRef}
            label={safeContent.rightLabel}
            image={safeContent.rightMapImage}
            alt='Bahrain map'
            withDivider
          />
        </div>
      </div>
    </section>
  );
}

function MapPanel({
  refProp,
  labelRef,
  label,
  image,
  alt,
  withDivider = false,
}) {
  return (
    <div
      ref={refProp}
      className={[
        "relative h-[360px] overflow-hidden sm:h-[430px] md:h-[520px] lg:h-[563px]",
        withDivider ? "md:border-l md:border-l-[#e7d9d4]" : "",
      ].join(" ")}>
      <div
        data-map-image
        className='absolute inset-0 scale-100'
        style={{
          transformOrigin: "center center",
        }}>
        {image ? (
          <img
            src={image}
            alt={alt}
            className='h-full w-full object-cover'
            draggable='false'
          />
        ) : (
          <div className='h-full w-full bg-[#091526]' />
        )}
      </div>

      <div
        data-map-overlay
        className='absolute inset-0 opacity-10'
        style={{
          background:
            "linear-gradient(180deg, rgba(2,8,18,0.14) 0%, rgba(2,8,18,0.08) 42%, rgba(2,8,18,0.18) 100%)",
        }}
      />

      <div className='absolute inset-0 bg-[#081628]/[0.84]' />

      <div className='absolute inset-0 flex items-center justify-center px-8 text-center'>
        <div
          ref={labelRef}
          className='text-[44px] font-light uppercase leading-none tracking-[-0.045em] text-[#e8d6d0] sm:text-[58px] md:text-[68px] lg:text-[62px] xl:text-[64px]'
          style={{
            fontFamily:
              'var(--font-sans, "Helvetica Neue", Helvetica, Arial, sans-serif)',
          }}>
          {label}
        </div>
      </div>
    </div>
  );
}
