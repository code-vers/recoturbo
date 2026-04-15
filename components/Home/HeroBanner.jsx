"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * HeroBanner component.
 *
 * Displays a full-screen video hero section with:
 * - a floating brand title
 * - play/pause control
 * - mute/unmute control
 * - a headline aligned to the bottom-right
 *
 * Brand behaviour:
 * - Initially shows "room residences"
 * - After scrolling past the sentinel, it switches to "room"
 * - The font size stays the same during the switch
 *
 * @param {Object} props - Component props.
 * @param {string} [props.videoSrc="/videos/ocean.mp4"] - Background video source.
 * @param {string} [props.brand="room"] - Compact brand name shown after scroll.
 * @returns {JSX.Element} Hero banner section.
 */
export default function HeroBanner({
  videoSrc = "/videos/VRoom.mp4",
  brand = "room",
}) {
  const sentinelRef = useRef(null);
  const videoRef = useRef(null);

  const [compact, setCompact] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCompact(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /**
   * Toggles video play and pause state.
   *
   * @returns {void}
   */
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPaused(false);
      return;
    }

    video.pause();
    setPaused(true);
  };

  /**
   * Toggles video mute state.
   *
   * @returns {void}
   */
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const controlBtn =
    "group flex h-14 w-14 shrink-0 items-center justify-center rounded-full " +
    "border border-white/70 bg-black/20 text-white backdrop-blur-md " +
    "shadow-[0_6px_30px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out " +
    "hover:scale-105 hover:bg-white/15 active:scale-95 " +
    "max-md:h-12 max-md:w-12 max-sm:h-11 max-sm:w-11";

  const brandText = compact ? brand : "room residences";

  return (
    <section className='relative w-full bg-black'>
      {/* Scroll trigger */}
      <div
        ref={sentinelRef}
        className='absolute top-30 h-px w-full max-lg:top-24 max-md:top-21 max-sm:top-19'
      />

      {/* Navbar layer */}
      <div
        className={[
          "fixed left-0 right-0 z-40 flex items-center",
          "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          compact
            ? "top-0 h-[45px] bg-black backdrop-blur-md"
            : "top-0 h-24 bg-transparent",
          "max-lg:h-20 max-md:h-16 max-sm:h-14",
        ].join(" ")}>
        <div className='relative mx-auto w-full px-6 max-lg:px-5 max-md:px-4 max-sm:px-4'>
          {/* Brand */}
          <div>
            <img
              // Dynamically change the image source based on `compact` state
              src={compact ? "onlyRoom.svg" : "roomLogo2.svg"}
              alt='Your brand image'
              className={`object-contain transition-opacity duration-500 ease-in-out ${
                compact ? "h-6" : "h-12" // Resize logo when scrolling
              }`}
            />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className='relative h-screen w-full overflow-hidden'>
        {/* Background video */}
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

        {/* Bottom content */}
        <div className='absolute inset-0 items-end justify-between pb-12 max-w-[1880px] hidden lg:flex  lg:px-10 mx-auto'>
          <div className='flex gap-4 max-md:gap-3 max-sm:gap-3'>
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className={controlBtn}
              aria-label={paused ? "Play video" : "Pause video"}
              type='button'>
              {paused ? (
                <Play
                  size={22}
                  strokeWidth={1.8}
                  className='cursor-pointer transition-transform duration-300 group-hover:scale-110 max-md:h-4.5 max-md:w-4.5 max-sm:h-4.5 max-sm:w-4.5'
                />
              ) : (
                <Pause
                  size={22}
                  strokeWidth={1.8}
                  className='cursor-pointer transition-transform duration-300 group-hover:scale-110 max-md:h-4.5 max-md:w-4.5 max-sm:h-4.5 max-sm:w-4.5'
                />
              )}
            </button>

            {/* Volume */}
            <button
              onClick={toggleMute}
              className={controlBtn}
              aria-label={muted ? "Unmute video" : "Mute video"}
              type='button'>
              {muted ? (
                <VolumeX
                  size={22}
                  strokeWidth={1.8}
                  className='cursor-pointer transition-transform duration-300 group-hover:scale-110 max-md:h-4.5 max-md:w-4.5 max-sm:h-4.5 max-sm:w-4.5'
                />
              ) : (
                <Volume2
                  size={22}
                  strokeWidth={1.8}
                  className='cursor-pointer transition-transform duration-300 group-hover:scale-110 max-md:h-4.5 max-md:w-4.5 max-sm:h-4.5 max-sm:w-4.5'
                />
              )}
            </button>
          </div>

          {/* Headline */}
          <div className='min-w-0 max-w-230 pl-4 text-left text-[#f2f6f6] max-lg:max-w-190 max-md:max-w-155 max-sm:max-w-[92%] max-sm:pl-3'>
            <h1
              style={{ fontWeight: "300" }}
              className='molde-expanded uppercase leading-[50px] text-[50px]'>
              STAY
              <br />
              SOMEWHERE
            </h1>
          </div>
        </div>
      </div>

      {/* md / sm layout - same content, only layout adjusted */}
      <div className='absolute inset-0 lg:hidden'>
        <div className='flex h-full items-center mt-14'>
          <div className='w-full px-4 md:px-6'>
            <div className='text-left text-white'>
              {/* Headline */}
              <h1 className='font-light molde-expanded uppercase tracking-[0.2px] text-[26px] leading-[1.12] md:text-[30px] md:leading-[1.08]'>
                STAY
                <br />
                SOMEWHERE
              </h1>

              {/* Controls */}
              <div className='mt-6 flex gap-3 md:mt-10 md:gap-4'>
                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  className={controlBtn}
                  aria-label={paused ? "Play video" : "Pause video"}
                  type='button'>
                  {paused ? (
                    <Play
                      size={18}
                      strokeWidth={1.8}
                      className='cursor-pointer transition-transform duration-300 group-hover:scale-110 md:h-5 md:w-5 max-sm:h-4 max-sm:w-4'
                    />
                  ) : (
                    <Pause
                      size={18}
                      strokeWidth={1.8}
                      className='cursor-pointer transition-transform duration-300 group-hover:scale-110 md:h-5 md:w-5 max-sm:h-4 max-sm:w-4'
                    />
                  )}
                </button>

                {/* Volume */}
                <button
                  onClick={toggleMute}
                  className={controlBtn}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  type='button'>
                  {muted ? (
                    <VolumeX
                      size={18}
                      strokeWidth={1.8}
                      className='cursor-pointer transition-transform duration-300 group-hover:scale-110 md:h-5 md:w-5 max-sm:h-4 max-sm:w-4'
                    />
                  ) : (
                    <Volume2
                      size={18}
                      strokeWidth={1.8}
                      className='cursor-pointer transition-transform duration-300 group-hover:scale-110 md:h-5 md:w-5 max-sm:h-4 max-sm:w-4'
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
