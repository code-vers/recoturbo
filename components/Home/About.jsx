"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useId, useLayoutEffect, useRef } from "react";

// ─── Safari / iOS detection ────────────────────────────────────────────────
const isSafari =
  typeof navigator !== "undefined" &&
  (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // macOS Safari (desktop)
    (navigator.userAgent.includes("Mac") && "ontouchend" in document));

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
  const svgRef = useRef(null);
  // Canvas fallback for Safari
  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textBox = textBoxRef.current;
    const blackLayer = blackLayerRef.current;

    if (!section || !textBox || !blackLayer) return;

    const ctx = gsap.context(() => {
      const state = { progress: 0 };
      let scrollDistance = window.innerHeight * 2.6;
      let maxRadius = 1.85;

      // ── helpers ──────────────────────────────────────────────────────────
      const ease = gsap.parseEase("power1.out");
      const easeSettle = gsap.parseEase("power2.out");

      // ── Safari path: canvas clip-path reveal ─────────────────────────────
      // We draw a soft-edged circle on a canvas and use it as a webkit-mask-image.
      // This avoids ALL SVG filter / mask bugs on WebKit.

      if (isSafari) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const DPR = window.devicePixelRatio || 1;

        const syncCanvas = () => {
          const rect = textBox.getBoundingClientRect();
          canvas.width = rect.width * DPR;
          canvas.height = rect.height * DPR;
          canvas.style.width = rect.width + "px";
          canvas.style.height = rect.height + "px";
        };

        const renderSafari = () => {
          const p = state.progress;
          const eased = ease(p);

          const rect = textBox.getBoundingClientRect();
          const W = rect.width;
          const H = rect.height;

          canvas.width = W * DPR;
          canvas.height = H * DPR;

          const canvasCtx = canvas.getContext("2d");
          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

          // Radius: grows from 0 → covers full diagonal
          const diag = Math.sqrt(W * W + H * H);
          const minR = 2; // px – tiny seed dot
          const maxR = diag * 0.72;
          const r = (minR + (maxR - minR) * eased * 0.5) * DPR;

          const cx = (W / 2) * DPR;
          const cy = (H / 2) * DPR;

          // Settle: noise-like softness at the edge fades as p → 1
          const settle = Math.max(0, (p - 0.82) / 0.18);
          const noiseFade = 1 - easeSettle(settle);
          const softness = r * (0.08 + 0.18 * noiseFade); // feather width

          const gradient = canvasCtx.createRadialGradient(
            cx,
            cy,
            Math.max(0, r - softness),
            cx,
            cy,
            r + softness,
          );
          gradient.addColorStop(0, "rgba(0,0,0,1)");
          gradient.addColorStop(1, "rgba(0,0,0,0)");

          canvasCtx.fillStyle = gradient;
          canvasCtx.beginPath();
          canvasCtx.arc(cx, cy, r + softness, 0, Math.PI * 2);
          canvasCtx.fill();

          // Apply as mask
          blackLayer.style.webkitMaskImage = `url(${canvas.toDataURL()})`;
          blackLayer.style.webkitMaskSize = "100% 100%";
          blackLayer.style.maskImage = `url(${canvas.toDataURL()})`;
          blackLayer.style.maskSize = "100% 100%";
          blackLayer.style.opacity = "1";
        };

        const computeSafari = () => {
          const rect = textBox.getBoundingClientRect();
          scrollDistance = rect.height * 2.2;
          syncCanvas();
        };

        computeSafari();
        renderSafari();

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
              computeSafari();
              renderSafari();
            },
          },
        });

        tl.to(state, { progress: 1, duration: 1, onUpdate: renderSafari });
        tl.to(state, { progress: 1, duration: 0.04, onUpdate: renderSafari });

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
        return () => {
          window.removeEventListener("resize", onResize);
          tl.kill();
        };
      }

      // ── Non-Safari path: original SVG filter approach (works on Chrome/Firefox) ─
      const circle = circleRef.current;
      const turb = turbRef.current;
      const disp = dispRef.current;
      const blur = blurRef.current;
      const svg = svgRef.current;

      if (!circle || !turb || !disp || !blur || !svg) return;

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
        const eased = ease(p);

        setCircle(circle, 0.5, 0.5, 0.005 + (maxRadius - 0.005) * eased * 0.5);

        const settle = Math.max(0, (p - 0.82) / 0.18);
        const noiseFade = 1 - easeSettle(settle);

        turb.setAttribute("baseFrequency", `${0.0015 + 0.001 * noiseFade}`);
        disp.setAttribute("scale", `${0.0005 + 0.0025 * noiseFade}`);
        blur.setAttribute("stdDeviation", `${0.0008 + 0.0014 * noiseFade}`);

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

              {/* Dark overlay text masked to reveal on scroll */}
              <p
                ref={blackLayerRef}
                aria-hidden='true'
                className='pointer-events-none absolute inset-0 text-[clamp(34px,4.2vw,60px)] leading-[1.02] tracking-[-0.03em]'
                style={{
                  color: "#0a0a0a",
                  opacity: 1,
                  // Non-Safari: reference inline SVG mask
                  ...(isSafari
                    ? {}
                    : {
                        WebkitMaskImage: `url(#${maskId})`,
                        WebkitMask: `url(#${maskId})`,
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskSize: "100% 100%",
                        mask: `url(#${maskId})`,
                        maskRepeat: "no-repeat",
                        maskSize: "100% 100%",
                      }),
                }}>
                {text}
              </p>

              {/*
               * Safari path: hidden <canvas> used as a dynamic mask image.
               * The canvas is drawn in JS and its dataURL is applied via
               * style.webkitMaskImage — fully supported on all WebKit versions.
               */}
              {isSafari && (
                <canvas
                  ref={canvasRef}
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-0'
                  style={{
                    display: "none",
                  }} /* only used as mask source, not visible */
                />
              )}

              {/* Non-Safari: inline SVG with feTurbulence liquid-reveal mask */}
              {!isSafari && (
                <svg
                  ref={svgRef}
                  className='pointer-events-none absolute inset-0 h-full w-full'
                  viewBox='0 0 1 1'
                  preserveAspectRatio='none'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'>
                  <defs>
                    <filter
                      id={filterId}
                      x='-50%'
                      y='-50%'
                      width='200%'
                      height='200%'
                      filterUnits='userSpaceOnUse'
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
