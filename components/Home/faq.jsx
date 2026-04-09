/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_FAQS = [
  {
    question: "Can I rent out my room residence?",
    answer:
      "No. Rental is not permitted. However, you are welcome to lend your home to friends and family.",
    defaultOpen: false, // Change default to false for all items to collapse initially
  },
  {
    question: "Is co-ownership like a timeshare?",
    answer:
      "No. This is a real ownership structure with clearly defined usage rights, transparent terms, and long-term access to a specific residence.",
    defaultOpen: false, // Collapse initially
  },
  {
    question: "Who holds the legal ownership?",
    answer:
      "Legal ownership is structured through the residence ownership model and documented clearly before commitment, ensuring each owner understands their rights and responsibilities.",
    defaultOpen: false, // Collapse initially
  },
  {
    question: "How many nights can I use the residence?",
    answer:
      "Your annual usage depends on the ownership structure of the residence. The allocation is predefined and communicated clearly before purchase.",
    defaultOpen: false, // Collapse initially
  },
  {
    question: "How does the booking system work?",
    answer:
      "Bookings are handled through a structured owner calendar designed to ensure fairness, transparency, and ease of planning across seasons and preferred dates.",
    defaultOpen: false, // Collapse initially
  },
  {
    question: "What do the monthly costs cover?",
    answer:
      "They include all operational expenses: local taxes, insurance, garden service, Wi-Fi, maintenance, and administration.",
    defaultOpen: false, // Collapse initially
  },
  {
    question: "Can I finance my share with a mortgage or company funds?",
    answer:
      "No. Only private capital can be used. Financing must be arranged independently.",
    defaultOpen: false, // Collapse initially
  },
  {
    question: "Can the price of my investment increase?",
    answer:
      "No. Unlike other co-sharing models, you know the full investment upfront — no surprises, thus the investment price is fixed at €150,000 and will not increase due to inflation or unforeseen costs.",
    defaultOpen: false, // Collapse initially
  },
  {
    question: "Do I know what I'm buying before committing?",
    answer:
      "Absolutely. With Vipp Residences, the location, architecture, interior and floorplans are all defined and communicated before purchase. What you see is what you get — a home designed by iconic architects in a known destination.",
    defaultOpen: false, // Collapse initially
  },
  {
    question: "Can I store personal belongings at the residence?",
    answer:
      "Yes. Each owner has access to a dedicated owners closet, allowing you to safely store personal items between stays. This ensures convenience and comfort without the need to bring everything each time.",
    defaultOpen: false, // Collapse initially
  },
];

export default function LuxuryFaqSection({
  faqs = DEFAULT_FAQS,
  className = "",
}) {
  const safeFaqs = useMemo(() => (faqs?.length ? faqs : DEFAULT_FAQS), [faqs]);

  const [openItems, setOpenItems] = useState(() =>
    safeFaqs.map((item) => !!item.defaultOpen),
  );

  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const bgGlowRef = useRef(null);
  const bgBeamRef = useRef(null);
  const bgNoiseRef = useRef(null);

  const lineRef = useRef(null);
  const titleRef = useRef(null);

  const itemRefs = useRef([]);
  const buttonRefs = useRef([]);
  const answerOuterRefs = useRef([]);
  const answerInnerRefs = useRef([]);
  const iconRefs = useRef([]);
  const dividerRefs = useRef([]);

  useEffect(() => {
    setOpenItems(safeFaqs.map((item) => !!item.defaultOpen));
  }, [safeFaqs]);

  const animateItemState = (index, isOpen, immediate = false) => {
    const outer = answerOuterRefs.current[index];
    const inner = answerInnerRefs.current[index];
    const icon = iconRefs.current[index];
    const button = buttonRefs.current[index];

    if (!outer || !inner || !icon || !button) return;

    const contentHeight = inner.offsetHeight;

    if (immediate) {
      gsap.set(outer, {
        height: isOpen ? contentHeight : 0,
        opacity: isOpen ? 1 : 0,
      });

      gsap.set(inner, {
        y: isOpen ? 0 : -8,
        opacity: isOpen ? 1 : 0,
      });

      gsap.set(icon, {
        rotate: isOpen ? 180 : 0,
      });

      gsap.set(button, {
        color: isOpen ? "rgba(14,14,18,0.96)" : "rgba(24,24,28,0.82)",
      });

      return;
    }

    gsap.killTweensOf([outer, inner, icon, button]);

    gsap.to(outer, {
      height: isOpen ? contentHeight : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.4, // Faster transition
      ease: "power2.inOut", // Smoother ease
    });

    gsap.to(inner, {
      y: isOpen ? 0 : -10,
      opacity: isOpen ? 1 : 0,
      duration: 0.3, // Faster transition
      ease: "power2.out", // Smoother ease
    });

    gsap.to(icon, {
      rotate: isOpen ? 180 : 0,
      duration: 0.3, // Faster transition
      ease: "power2.out", // Smoother ease
    });

    gsap.to(button, {
      color: isOpen ? "rgba(14,14,18,0.96)" : "rgba(24,24,28,0.82)",
      duration: 0.2, // Faster transition
      ease: "power2.out", // Smoother ease
    });
  };

  const toggleItem = (index) => {
    setOpenItems((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  useEffect(() => {
    openItems.forEach((isOpen, index) => {
      animateItemState(index, isOpen, false);
    });
  }, [openItems]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      safeFaqs.forEach((_, index) => {
        animateItemState(index, !!openItems[index], true);
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(titleRef.current, {
        y: 28,
        opacity: 0,
        filter: "blur(8px)",
      });

      gsap.set(itemRefs.current.filter(Boolean), {
        y: 16,
        opacity: 0,
      });

      gsap.set(dividerRefs.current.filter(Boolean), {
        scaleX: 0,
        transformOrigin: "left center",
        opacity: 0.38,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" }, // Faster easing for smoothness
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.5, // Faster transition
      })
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7, // Faster transition
          },
          "-=0.3",
        )
        .to(
          dividerRefs.current.filter(Boolean),
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.5, // Faster transition
            stagger: 0.035, // Faster stagger
          },
          "-=0.3",
        )
        .to(
          itemRefs.current.filter(Boolean),
          {
            y: 0,
            opacity: 1,
            duration: 0.5, // Faster transition
            stagger: 0.05,
          },
          "-=0.5",
        );

      if (bgGlowRef.current) {
        gsap.to(bgGlowRef.current, {
          backgroundPosition: "54% 0%, 82% 86%, 50% 50%",
          duration: 8, // Slightly faster glow
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (bgBeamRef.current) {
        gsap.to(bgBeamRef.current, {
          xPercent: 5,
          yPercent: -3,
          rotate: 2.5,
          duration: 8, // Slightly faster beam
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (bgNoiseRef.current) {
        gsap.to(bgNoiseRef.current, {
          opacity: 0.12,
          duration: 2.8, // Slightly faster noise
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      itemRefs.current.forEach((item, index) => {
        const button = buttonRefs.current[index];
        const icon = iconRefs.current[index];

        if (!item || !button || !icon) return;

        const enter = () => {
          gsap.to(button, {
            x: 2,
            duration: 0.18, // Faster hover transition
            ease: "power2.out",
          });
          gsap.to(icon, {
            x: -2,
            duration: 0.18, // Faster hover transition
            ease: "power2.out",
          });
        };

        const leave = () => {
          gsap.to(button, {
            x: 0,
            duration: 0.2, // Faster hover transition
            ease: "power2.out",
          });
          gsap.to(icon, {
            x: 0,
            duration: 0.2, // Faster hover transition
            ease: "power2.out",
          });
        };

        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);

        item._enter = enter;
        item._leave = leave;
      });
    }, section);

    return () => {
      itemRefs.current.forEach((item) => {
        if (!item?._enter || !item?._leave) return;
        item.removeEventListener("mouseenter", item._enter);
        item.removeEventListener("mouseleave", item._leave);
      });
      ctx.revert();
    };
  }, [safeFaqs]);

  return (
    <section
      ref={sectionRef}
      className={[
        "relative isolate overflow-hidden bg-[#e7d9d4] text-[#111215]",
        className,
      ].join(" ")}>
      {/* base gradient */}
      {/* <div className='absolute inset-0 bg-[linear-gradient(180deg,#e3e3e3_0%,#d6d6d6_45%,#d9d9d9_100%)]' /> */}

      {/* brighter crossing lights */}
      <div className='absolute inset-0 opacity-100'>
        <div className='absolute left-[-10%] top-[4%] h-[52%] w-[75%] rotate-[24deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.40)_22%,rgba(255,255,255,0.15)_44%,rgba(255,255,255,0)_70%)] blur-[22px]' />

        <div className='absolute right-[-8%] top-[2%] h-[54%] w-[75%] -rotate-[23deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.36)_26%,rgba(255,255,255,0.14)_48%,rgba(255,255,255,0)_74%)] blur-[24px]' />

        <div className='absolute left-[6%] bottom-[-6%] h-[58%] w-[78%] -rotate-[22deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.30)_25%,rgba(255,255,255,0.12)_46%,rgba(255,255,255,0)_72%)] blur-[26px]' />

        <div className='absolute right-[2%] bottom-[0%] h-[54%] w-[72%] rotate-[22deg] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.60)_0%,rgba(255,255,255,0.28)_28%,rgba(255,255,255,0.10)_48%,rgba(255,255,255,0)_74%)] blur-[24px]' />
      </div>

      {/* subtle vignette */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.04),transparent_40%)]' />
      <div
        ref={shellRef}
        className='relative mx-auto py-[50px]  max-w-[1512px] px-[42px]'>
        <div className='pt-[50px]'>
          <div ref={lineRef} className='h-[2px] w-[30px] bg-[#0f1115]' />
          <h2
            ref={titleRef}
            className='mt-[10px] molde-expanded text-[54px] font-normal leading-[0.9] tracking-[-0.055em] text-[#0f1115] sm:text-[62px] xl:text-[66px]'>
            FAQ.
          </h2>
        </div>
        <div className=''>
          {/* faq area */}
          <div className='pt-[36px]'>
            <div className='mx-auto w-full max-w-[1064px]'>
              {safeFaqs.map((item, index) => {
                const isOpen = !!openItems[index];

                return (
                  <div
                    key={`${item.question}-${index}`}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className='group'>
                    <div
                      ref={(el) => {
                        dividerRefs.current[index] = el;
                      }}
                      className='h-px w-full bg-[rgba(16,17,20,0.065)]'
                    />

                    <button
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                      type='button'
                      onClick={() => toggleItem(index)}
                      className='flex w-full items-start justify-between gap-6 py-[9px] text-left outline-none'
                      aria-expanded={isOpen}>
                      <span className='pr-5 pt-[1px] text-[21px] font-normal leading-[1.16] tracking-[-0.03em] text-inherit sm:text-[23px] xl:text-[24px]'>
                        {item.question}
                      </span>

                      <span className='mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center'>
                        <ChevronDown
                          ref={(el) => {
                            iconRefs.current[index] = el;
                          }}
                          className='h-[14px] w-[14px] text-[#14161b]'
                          strokeWidth={1.15}
                        />
                      </span>
                    </button>

                    <div
                      ref={(el) => {
                        answerOuterRefs.current[index] = el;
                      }}
                      className='overflow-hidden'>
                      <div
                        ref={(el) => {
                          answerInnerRefs.current[index] = el;
                        }}
                        className='pb-[13px] pr-[72px]'>
                        <p className='max-w-[980px] text-[14px] font-medium leading-[1.16] tracking-[0.008em] text-[#17191d]/92 sm:text-[15px] xl:text-[16px]'>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className='h-px w-full bg-[rgba(16,17,20,0.065)]' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
