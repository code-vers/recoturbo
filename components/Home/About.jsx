"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useId, useLayoutEffect, useRef } from "react";

export default function About({
  text = "We create timeless experiences for our guests, balancing modern design with a focus on the present, while upholding hospitality's core values of generosity and compassion to shape lasting memories.",
  className = "",
}) {
  const uid = useId();

  const sectionRef = useRef(null);
  const textBoxRef = useRef(null);

  const circleRef = useRef(null);
  const turbRef = useRef(null);
  const dispRef = useRef(null);
  const blurRef = useRef(null);

  const blackLayerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textBox = textBoxRef.current;
    const circle = circleRef.current;
    const turb = turbRef.current;
    const disp = dispRef.current;
    const blur = blurRef.current;
    const blackLayer = blackLayerRef.current;

    if (
      !section ||
      !textBox ||
      !circle ||
      !turb ||
      !disp ||
      !blur ||
      !blackLayer
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const state = { progress: 0 };

      let scrollDistance = window.innerHeight * 4.2;
      let maxRadius = 1.9;

      const compute = () => {
        const rect = textBox.getBoundingClientRect();
        const aspect = rect.height / Math.max(rect.width, 1);

        maxRadius = Math.max(1.85, Math.sqrt(1 + aspect * aspect) + 0.42);

        scrollDistance = Math.max(window.innerHeight * 4.8, rect.height * 5.4);
      };

      const render = () => {
        const p = state.progress;

        // top-left -> bottom-right
        const cx = 0.08 + 0.78 * p;
        const cy = 0.12 + 0.62 * p;
        const r = 0.02 + (maxRadius - 0.02) * p;

        // smoother + slightly tighter edge so revealed area looks solid black
        const wave = Math.sin(p * Math.PI);
        const baseFrequency = 0.009 + 0.008 * wave;
        const displacement = 0.01 + 0.018 * wave;
        const blurAmount = 0.003 + 0.006 * wave;

        circle.setAttribute("cx", `${cx}`);
        circle.setAttribute("cy", `${cy}`);
        circle.setAttribute("r", `${r}`);

        turb.setAttribute("baseFrequency", `${baseFrequency}`);
        disp.setAttribute("scale", `${displacement}`);
        blur.setAttribute("stdDeviation", `${blurAmount}`);

        // keep black always fully solid;
        // only the mask controls what part is visible
        blackLayer.style.opacity = "1";
      };

      compute();
      render();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 3.1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: false,
          onRefresh: () => {
            compute();
            render();
          },
        },
      });

      tl.to(state, {
        progress: 1,
        duration: 1,
        onUpdate: render,
      });

      tl.to(state, {
        progress: 1,
        duration: 0.28,
        onUpdate: render,
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        tl.kill();
      };
    }, section);

    return () => ctx.revert();
  }, [uid]);

  const maskId = `about-mask-${uid}`;
  const filterId = `about-liquid-${uid}`;

  return (
    <section
      ref={sectionRef}
      className={[
        "relative h-screen w-full overflow-hidden bg-[#e9e4e1]",
        className,
      ].join(" ")}
      style={{ isolation: "isolate" }}>
      <div className='flex h-full w-full items-center'>
        <div className='mx-auto w-full max-w-[1280px] px-6 sm:px-8 md:px-10'>
          <div className='mb-8 h-[2px] w-10 bg-[#1b1b1b]/75' />

          <div ref={textBoxRef} className='relative max-w-[980px]'>
            {/* Base white text */}
            <p className='text-[clamp(34px,4.2vw,64px)] leading-[1.02] tracking-[-0.03em] text-white'>
              {text}
            </p>

            {/* Revealed area becomes immediately full black */}
            <p
              ref={blackLayerRef}
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 text-[clamp(34px,4.2vw,64px)] leading-[1.02] tracking-[-0.03em]'
              style={{
                color: "#0a0a0a",
                opacity: 1,
                WebkitMask: `url(#${maskId})`,
                mask: `url(#${maskId})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                willChange: "transform",
              }}>
              {text}
            </p>

            <svg
              className='pointer-events-none absolute inset-0 h-full w-full'
              viewBox='0 0 1 1'
              preserveAspectRatio='none'
              aria-hidden='true'>
              <defs>
                <filter
                  id={filterId}
                  x='-50%'
                  y='-50%'
                  width='200%'
                  height='200%'
                  filterUnits='objectBoundingBox'>
                  <feTurbulence
                    ref={turbRef}
                    type='fractalNoise'
                    baseFrequency='0.012'
                    numOctaves='2'
                    seed='4'
                    result='noise'
                  />
                  <feDisplacementMap
                    ref={dispRef}
                    in='SourceGraphic'
                    in2='noise'
                    scale='0.014'
                    xChannelSelector='R'
                    yChannelSelector='G'
                    result='displaced'
                  />
                  <feGaussianBlur
                    ref={blurRef}
                    in='displaced'
                    stdDeviation='0.004'
                    result='blurred'
                  />
                </filter>

                <mask
                  id={maskId}
                  maskUnits='objectBoundingBox'
                  maskContentUnits='objectBoundingBox'>
                  <rect x='0' y='0' width='1' height='1' fill='black' />
                  <g filter={`url(#${filterId})`}>
                    <circle
                      ref={circleRef}
                      cx='0.08'
                      cy='0.12'
                      r='0.02'
                      fill='white'
                    />
                  </g>
                </mask>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
