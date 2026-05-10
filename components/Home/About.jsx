"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

export default function About({
  text = "Built by iconic architects. Designed by room. Shared by like-minded people. Blending modern design, mindful living, and nature, our rooms create lasting memories.",
  className = "",
}) {
  const sectionRef = useRef(null);
  const textBoxRef = useRef(null);
  const blackLayerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textBox = textBoxRef.current;
    const blackLayer = blackLayerRef.current;

    if (!section || !textBox || !blackLayer) return;

    const ctx = gsap.context(() => {
      const state = { progress: 0 };
      let scrollDistance = window.innerHeight * 2.6;

      const ease = gsap.parseEase("power1.out");

      const compute = () => {
        const rect = textBox.getBoundingClientRect();
        scrollDistance = rect.height * 2.2;
      };

      const render = () => {
        const p = state.progress;
        const eased = ease(p);

        // Calculate radius as percentage
        const radius = (0.005 + 1.85 * eased * 0.5) * 100; // Adjust max as needed

        gsap.set(blackLayer, { clipPath: `circle(${radius}% at 50% 50%)` });
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className={[
        "relative h-screen w-full overflow-hidden bg-[#ebe7e4]",
        className,
      ].join(" ")}
      style={{
        isolation: "isolate",
        backgroundImage:
          "radial-gradient(circle at 18% 22%, rgba(255,232,220,0.42), transparent 18%), radial-gradient(circle at 66% 15%, rgba(194,220,255,0.24), transparent 16%), radial-gradient(circle at 84% 86%, rgba(255,221,206,0.16), transparent 14%)",
      }}>
      <div className='flex h-full w-full items-center'>
        <div className='mx-auto w-full max-w-[1280px] px-6 sm:px-8 md:px-10'>
          <div className='relative z-10'>
            <div className='mb-6 h-[2px] w-[40px] ml-1.5 bg-[#1b1b1b]' />
            <div ref={textBoxRef} className='relative max-w-7xl'>
              {/* Base white text (always visible) */}
              <p className='text-[clamp(34px,4.2vw,60px)] leading-[1.02] tracking-[-0.03em] text-white'>
                {text}
              </p>

              {/* Black overlay text revealed on scroll */}
              <p
                ref={blackLayerRef}
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 text-[clamp(34px,4.2vw,60px)] leading-[1.02] tracking-[-0.03em] text-[#0a0a0a]'
                style={{
                  clipPath: "circle(0% at 50% 50%)",
                }}>
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
