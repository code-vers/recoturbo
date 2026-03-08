"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * HeroBanner
 *
 * Behaviour:
 * - Brand text initially sits on top of the video
 * - On scroll it smoothly scales down and moves into navbar position
 * - Same element is animated (no duplicate title)
 *
 * @param {Object} props
 * @param {string} props.videoSrc
 * @param {string} props.brand
 */

export default function HeroBanner({
  videoSrc = "/videos/ocean.mp4",
  brand = "room",
}) {
  const sentinelRef = useRef(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setCompact(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  /**
   * Video control buttons
   * - Play / Pause
   * - Mute / Unmute
   */

  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const controlBtn =
    "group flex h-14 w-14 items-center justify-center rounded-full " +
    "border border-white/70 text-white " +
    "bg-black/20 backdrop-blur-md " +
    "transition-all duration-300 ease-out " +
    "hover:bg-white/15 hover:scale-105 active:scale-95 " +
    "shadow-[0_6px_30px_rgba(0,0,0,0.35)] " +
    "max-md:h-12 max-md:w-12 max-sm:h-11 max-sm:w-11";

  return (
    <section className='relative w-full bg-black'>
      {/* Sentinel */}
      <div
        ref={sentinelRef}
        className='absolute top-30 h-px w-full max-lg:top-24 max-md:top-21 max-sm:top-19'
      />

      {/* Navbar Layer */}
      <div
        className={[
          "fixed left-0 right-0 z-40 flex items-center",
          "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          compact
            ? "top-0 h-16 bg-black/20 backdrop-blur-md"
            : "top-0 h-24 bg-transparent",
          "max-lg:h-20 max-md:h-16 max-sm:h-14",
        ].join(" ")}>
        <div className='relative w-full mx-auto px-6 max-lg:px-5 max-md:px-4 max-sm:px-4'>
          {/* Brand */}
          <div
            className={[
              "text-white font-light tracking-[0.5px]",
              "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              compact ? "text-[30px]" : "text-[clamp(46px,5vw,80px)]",
              "max-lg:text-[42px] max-md:text-[34px] max-sm:text-[30px]",
              compact ? "max-md:text-[26px] max-sm:text-[24px]" : "",
            ].join(" ")}>
            {brand}
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className='relative h-[min(92vh,860px)] w-full overflow-hidden max-lg:h-[min(88vh,760px)] max-md:h-[min(82vh,680px)] max-sm:h-[min(78vh,620px)]'>
        {/* Background Video */}
        <video
          ref={videoRef}
          className='absolute inset-0 h-full w-full object-cover'
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload='metadata'
        />

        {/* Bottom UI */}
        <div className='absolute inset-0 flex items-end justify-between p-8 max-lg:p-7 max-md:p-5 max-sm:p-4'>
          <div className='flex gap-4 max-md:gap-3 max-sm:gap-3 shrink-0'>
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className={controlBtn}
              aria-label={paused ? "Play video" : "Pause video"}>
              {paused ? (
                <Play
                  size={22}
                  strokeWidth={1.8}
                  className='transition-transform duration-300 cursor-pointer group-hover:scale-110 max-md:w-4.5 max-md:h-4.5 max-sm:w-4.5 max-sm:h-4.5'
                />
              ) : (
                <Pause
                  size={22}
                  strokeWidth={1.8}
                  className='transition-transform duration-300 cursor-pointer group-hover:scale-110 max-md:w-4.5 max-md:h-4.5 max-sm:w-4.5 max-sm:h-4.5'
                />
              )}
            </button>

            {/* Volume */}
            <button
              onClick={toggleMute}
              className={controlBtn}
              aria-label={muted ? "Unmute video" : "Mute video"}>
              {muted ? (
                <VolumeX
                  size={22}
                  strokeWidth={1.8}
                  className='transition-transform duration-300 cursor-pointer group-hover:scale-110 max-md:w-4.5 max-md:h-4.5 max-sm:w-4.5 max-sm:h-4.5'
                />
              ) : (
                <Volume2
                  size={22}
                  strokeWidth={1.8}
                  className='transition-transform duration-300 cursor-pointer group-hover:scale-110 max-md:w-4.5 max-md:h-4.5 max-sm:w-4.5 max-sm:h-4.5'
                />
              )}
            </button>
          </div>

          {/* Headline */}
          <div className='text-white text-right min-w-0 pl-4 max-sm:pl-3'>
            <div className='font-extralight tracking-[2px] text-[clamp(28px,4vw,58px)] max-lg:text-[44px] max-md:text-[34px] max-sm:text-[26px] leading-none truncate'>
              STAY
            </div>
            <div className='font-extralight tracking-[2px] text-[clamp(38px,5vw,76px)] max-lg:text-[56px] max-md:text-[44px] max-sm:text-[34px] leading-[1.05] truncate'>
              SOMEWHERE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
