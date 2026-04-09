"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useId, useLayoutEffect, useRef } from "react";

export default function About({
  text = "Built by iconic architects. Designed by room. Shared by like-minded people. Blending modern design, mindful living, and nature, our rooms create lasting memories.",
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
  // 🔴 NEW: ref to the <svg> element we'll use as a clipPath workaround
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textBox = textBoxRef.current;
    const circle = circleRef.current;
    const turb = turbRef.current;
    const disp = dispRef.current;
    const blur = blurRef.current;
    const blackLayer = blackLayerRef.current;
    const svg = svgRef.current;

    if (
      !section ||
      !textBox ||
      !circle ||
      !turb ||
      !disp ||
      !blur ||
      !blackLayer ||
      !svg
    )
      return;

    // 🔴 FIX 1: Detect Safari (includes all iOS browsers — they all use WebKit)
    const isSafari =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
      /iPad|iPhone|iPod/.test(navigator.userAgent);

    const ctx = gsap.context(() => {
      const state = { progress: 0 };
      let scrollDistance = window.innerHeight * 2.6;
      let maxRadius = 1.85;

      const setCircle = (el, cx, cy, r) => {
        el.setAttribute("cx", `${cx}`);
        el.setAttribute("cy", `${cy}`);
        el.setAttribute("r", `${Math.max(0, r)}`);
      };

      const compute = () => {
        const rect = textBox.getBoundingClientRect();
        const aspect = rect.height / Math.max(rect.width, 1);
        maxRadius = Math.max(1.8, Math.sqrt(1 + aspect * aspect) + 0.18);
        scrollDistance = rect.height * 2.2;
      };

      const render = () => {
        const p = state.progress;
        const eased = gsap.parseEase("power1.out")(p);

        const cx = 0.5;
        const cy = 0.5;
        const radius = 0.005 + (maxRadius - 0.005) * eased * 0.5;
        setCircle(circle, cx, cy, radius);

        const settle = Math.max(0, (p - 0.82) / 0.18);
        const noiseFade = 1 - gsap.parseEase("power2.out")(settle);

        const baseFrequency = 0.0015 + 0.001 * noiseFade;
        const displacement = 0.0005 + 0.0025 * noiseFade;
        const blurAmount = 0.0008 + 0.0014 * noiseFade;

        turb.setAttribute("baseFrequency", `${baseFrequency}`);
        disp.setAttribute("scale", `${displacement}`);
        blur.setAttribute("stdDeviation", `${blurAmount}`);

        blackLayer.style.opacity = "1";

        // 🔴 FIX 2: Force Safari to repaint the SVG filter/mask
        // Safari caches SVG filter results aggressively; toggling a harmless
        // attribute on the root <svg> breaks the cache each frame.
        if (isSafari && svg) {
          svg.setAttribute("data-tick", p.toFixed(6));
        }
      };

      compute();
      render();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 2.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onRefresh: () => {
            compute();
            render();
          },
        },
      });

      tl.to(state, { progress: 1, duration: 1, onUpdate: render });
      tl.to(state, { progress: 1, duration: 0.04, onUpdate: render });

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
    // 🔴 FIX 3: Remove `isolation: isolate` — breaks Safari mask stacking context
    <section
      ref={sectionRef}
      className={[
        "relative h-screen w-full overflow-hidden bg-[#e9e4e1]",
        className,
      ].join(" ")}>
      {/* ... your background layers unchanged ... */}
      <div className='absolute top-0 left-0 right-0 h-2 bg-black opacity-50' />
      <div className='absolute inset-0 bg-[linear-gradient(180deg,#e3e3e3_0%,#d6d6d6_45%,#d9d9d9_100%)]' />
      <div className='absolute inset-0 opacity-100'>
        <div className='absolute left-[-10%] top-[4%] h-[52%] w-[75%] rotate-[24deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.40)_22%,rgba(255,255,255,0.15)_44%,rgba(255,255,255,0)_70%)] blur-[22px]' />
        <div className='absolute right-[-8%] top-[2%] h-[54%] w-[75%] -rotate-[23deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.36)_26%,rgba(255,255,255,0.14)_48%,rgba(255,255,255,0)_74%)] blur-[24px]' />
        <div className='absolute left-[6%] bottom-[-6%] h-[58%] w-[78%] -rotate-[22deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.30)_25%,rgba(255,255,255,0.12)_46%,rgba(255,255,255,0)_72%)] blur-[26px]' />
        <div className='absolute right-[2%] bottom-[0%] h-[54%] w-[72%] rotate-[22deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.28)_28%,rgba(255,255,255,0.10)_48%,rgba(255,255,255,0)_74%)] blur-[24px]' />
      </div>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.04),transparent_40%)]' />

      <div className='flex h-full w-full items-center'>
        <div className='mx-auto w-full max-w-[1280px] px-6 sm:px-8 md:px-10'>
          <div className='mb-6 h-[2px] w-10 bg-[#1b1b1b]' />

          <div className='relative z-10'>
            <div className='mb-6 h-[2px] w-[40px] bg-[#1b1b1b]' />
            <div ref={textBoxRef} className='relative max-w-7xl'>
              <p className='text-[clamp(34px,4.2vw,60px)] leading-[1.02] tracking-[-0.03em] text-white'>
                {text}
              </p>

              <p
                ref={blackLayerRef}
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 text-[clamp(34px,4.2vw,60px)] leading-[1.02] tracking-[-0.03em]'
                style={{
                  color: "#0a0a0a",
                  opacity: 1,
                  // 🔴 FIX 4: Always declare both prefixed and unprefixed,
                  // and do NOT use will-change here — it breaks Safari compositing
                  WebkitMaskImage: `url(#${maskId})`,
                  WebkitMask: `url(#${maskId})`,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "100% 100%",
                  mask: `url(#${maskId})`,
                  maskRepeat: "no-repeat",
                  maskSize: "100% 100%",
                  // 🔴 REMOVED: willChange — causes Safari to composite before mask resolves
                }}>
                {text}
              </p>

              {/* 🔴 FIX 5: Add ref to svg so we can poke it each frame to force Safari repaint */}
              <svg
                ref={svgRef}
                className='pointer-events-none absolute inset-0 h-full w-full'
                viewBox='0 0 1 1'
                preserveAspectRatio='none'
                aria-hidden='true'
                // 🔴 FIX 6: xmlns is required for Safari to treat this as a valid SVG mask source
                xmlns='http://www.w3.org/2000/svg'>
                <defs>
                  <filter
                    id={filterId}
                    x='-50%'
                    y='-50%'
                    width='200%'
                    height='200%'
                    // 🔴 FIX 7: Change to userSpaceOnUse — objectBoundingBox is
                    // unreliable in Safari when the SVG is sized via CSS
                    filterUnits='userSpaceOnUse'
                    // 🔴 FIX 8: color-interpolation-filters must be sRGB for
                    // feDisplacementMap to work correctly on WebKit
                    colorInterpolationFilters='sRGB'>
                    <feTurbulence
                      ref={turbRef}
                      type='fractalNoise'
                      baseFrequency='0.002'
                      numOctaves='1'
                      seed='7'
                      result='noise'
                    />
                    <feDisplacementMap
                      ref={dispRef}
                      in='SourceGraphic'
                      in2='noise'
                      scale='0.0015'
                      xChannelSelector='R'
                      yChannelSelector='G'
                      result='displaced'
                    />
                    <feGaussianBlur
                      ref={blurRef}
                      in='displaced'
                      stdDeviation='0.0012'
                      result='blurred'
                    />
                  </filter>

                  <mask
                    id={maskId}
                    // 🔴 FIX 9: Match filterUnits — use userSpaceOnUse with 0–1 coords
                    // since viewBox="0 0 1 1" makes the user space 0–1
                    maskUnits='objectBoundingBox'
                    maskContentUnits='objectBoundingBox'>
                    <rect x='0' y='0' width='1' height='1' fill='black' />
                    <g filter={`url(#${filterId})`}>
                      <circle
                        ref={circleRef}
                        cx='0.5'
                        cy='0.5'
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
      </div>
    </section>
  );
}
