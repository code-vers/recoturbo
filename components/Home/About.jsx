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

  const leadRef = useRef(null);
  const midRef = useRef(null);
  const tailRef = useRef(null);

  const turbRef = useRef(null);
  const dispRef = useRef(null);
  const blurRef = useRef(null);

  const blackLayerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textBox = textBoxRef.current;

    const lead = leadRef.current;
    const mid = midRef.current;
    const tail = tailRef.current;

    const turb = turbRef.current;
    const disp = dispRef.current;
    const blur = blurRef.current;

    const blackLayer = blackLayerRef.current;

    if (
      !section ||
      !textBox ||
      !lead ||
      !mid ||
      !tail ||
      !turb ||
      !disp ||
      !blur ||
      !blackLayer
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const state = { progress: 0 };

      // reduced from previous value so animation finishes faster
      let scrollDistance = window.innerHeight * 4.2;
      let maxRadius = 2.08;

      const compute = () => {
        const rect = textBox.getBoundingClientRect();
        const aspect = rect.height / Math.max(rect.width, 1);

        maxRadius = Math.max(2.0, Math.sqrt(1 + aspect * aspect) + 0.52);

        // reduced so reveal completes sooner
        scrollDistance = Math.max(window.innerHeight * 3.9, rect.height * 4.2);
      };

      const setCircle = (el, cx, cy, r) => {
        el.setAttribute("cx", `${cx}`);
        el.setAttribute("cy", `${cy}`);
        el.setAttribute("r", `${r}`);
      };

      const render = () => {
        const p = state.progress;
        const wave = Math.sin(p * Math.PI);

        const headX = 0.045 + 0.82 * p;
        const headY = 0.135 + 0.6 * p;
        const headR = 0.02 + (maxRadius - 0.02) * p;

        const frontPull = 0.04 + 0.015 * wave;
        const topLift = 0.04 * (1 - p);
        const bottomDrop = 0.075 + 0.02 * wave;

        const midX = headX - frontPull;
        const midY = headY - topLift;
        const midR = headR * (0.78 + 0.03 * wave);

        const tailX = headX - (0.13 + 0.03 * wave);
        const tailY = headY + bottomDrop;
        const tailR = headR * (1.05 + 0.04 * wave);

        setCircle(lead, headX, headY, headR);
        setCircle(mid, midX, midY, midR);
        setCircle(tail, tailX, tailY, tailR);

        const baseFrequency = 0.006 + 0.004 * wave;
        const displacement = 0.006 + 0.009 * wave;
        const blurAmount = 0.0018 + 0.0028 * wave;

        turb.setAttribute("baseFrequency", `${baseFrequency}`);
        disp.setAttribute("scale", `${displacement}`);
        blur.setAttribute("stdDeviation", `${blurAmount}`);

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
          scrub: 2.8, // reduced from 3.8 for faster response
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

      // short hold after full reveal
      tl.to(state, {
        progress: 1,
        duration: 0.08,
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
            <p className='text-[clamp(34px,4.2vw,64px)] leading-[1.02] tracking-[-0.03em] text-white'>
              {text}
            </p>

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
                    baseFrequency='0.008'
                    numOctaves='2'
                    seed='4'
                    result='noise'
                  />
                  <feDisplacementMap
                    ref={dispRef}
                    in='SourceGraphic'
                    in2='noise'
                    scale='0.008'
                    xChannelSelector='R'
                    yChannelSelector='G'
                    result='displaced'
                  />
                  <feGaussianBlur
                    ref={blurRef}
                    in='displaced'
                    stdDeviation='0.0022'
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
                      ref={leadRef}
                      cx='0.045'
                      cy='0.135'
                      r='0.02'
                      fill='white'
                    />
                    <circle
                      ref={midRef}
                      cx='0.005'
                      cy='0.10'
                      r='0.017'
                      fill='white'
                    />
                    <circle
                      ref={tailRef}
                      cx='-0.055'
                      cy='0.20'
                      r='0.024'
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
