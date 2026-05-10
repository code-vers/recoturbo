/* eslint-disable @next/next/no-img-element */
"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

const DEFAULT_CONTENT = {
  eyebrow: "",
  title: "OUR LOCATION",
  description: "",
  leftLabel: "UK MAP",
  rightLabel: "BAHRAIN MAP",
  leftMapImage: "/UK.png",
  rightMapImage: "/Baharain.png",
};

// Locations to mark on the map
const MAP_LOCATIONS = [
  {
    name: "United Kingdom",
    lat: 51.5074,
    lng: -0.1278,
    label: "UK",
  },
  {
    name: "Bahrain",
    lat: 26.2235,
    lng: 50.5876,
    label: "BH",
  },
];

function InteractiveMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    // Dynamically load Leaflet CSS
    const linkEl = document.createElement("link");
    linkEl.rel = "stylesheet";
    linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(linkEl);

    // Dynamically load Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      const L = window.L;
      if (!mapRef.current || mapInstanceRef.current) return;

      // Init map centered between UK and Bahrain
      const map = L.map(mapRef.current, {
        center: [35, 20],
        zoom: 3,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Custom dark/muted tile layer matching the section's warm palette
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 19,
        },
      ).addTo(map);

      // Custom SVG pin icon factory
      const createPin = (label) => {
        const svgSize = 56;
        const svgStr = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${svgSize}" height="${svgSize + 12}" viewBox="0 0 ${svgSize} ${svgSize + 12}">
            <defs>
              <filter id="shadow-${label}" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#00000040"/>
              </filter>
            </defs>
            <!-- Pin circle -->
            <circle
              cx="${svgSize / 2}"
              cy="${svgSize / 2}"
              r="${svgSize / 2 - 4}"
              fill="#111111"
              filter="url(#shadow-${label})"
            />
            <!-- Inner ring -->
            <circle
              cx="${svgSize / 2}"
              cy="${svgSize / 2}"
              r="${svgSize / 2 - 9}"
              fill="none"
              stroke="#e7d9d4"
              stroke-width="1.5"
            />
            <!-- Label text -->
            <text
              x="${svgSize / 2}"
              y="${svgSize / 2 + 5}"
              text-anchor="middle"
              font-family="sans-serif"
              font-size="11"
              font-weight="600"
              letter-spacing="1"
              fill="#e7d9d4"
            >${label}</text>
            <!-- Tail -->
            <polygon
              points="${svgSize / 2 - 7},${svgSize - 5} ${svgSize / 2 + 7},${svgSize - 5} ${svgSize / 2},${svgSize + 12}"
              fill="#111111"
            />
          </svg>
        `;
        return L.divIcon({
          html: svgStr,
          className: "",
          iconSize: [svgSize, svgSize + 12],
          iconAnchor: [svgSize / 2, svgSize + 12],
          popupAnchor: [0, -(svgSize + 14)],
        });
      };

      // Add markers with custom popups
      MAP_LOCATIONS.forEach(({ lat, lng, name, label }) => {
        const marker = L.marker([lat, lng], {
          icon: createPin(label),
        }).addTo(map);

        marker.bindPopup(
          `<div style="
            font-family: sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #111111;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            padding: 4px 6px;
          ">${name}</div>`,
          {
            closeButton: false,
            className: "custom-map-popup",
            offset: [0, -4],
          },
        );

        marker.on("mouseover", () => marker.openPopup());
        marker.on("mouseout", () => marker.closePopup());
      });

      // Draw a subtle dashed arc line between the two locations
      const ukLatLng = [MAP_LOCATIONS[0].lat, MAP_LOCATIONS[0].lng];
      const bhLatLng = [MAP_LOCATIONS[1].lat, MAP_LOCATIONS[1].lng];

      // Generate intermediate arc points
      const arcPoints = [];
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = ukLatLng[0] + (bhLatLng[0] - ukLatLng[0]) * t;
        const lng = ukLatLng[1] + (bhLatLng[1] - ukLatLng[1]) * t;
        // Add a slight curve by offsetting latitude in the middle
        const curve = Math.sin(Math.PI * t) * 8;
        arcPoints.push([lat + curve, lng]);
      }

      L.polyline(arcPoints, {
        color: "#111111",
        weight: 1.5,
        opacity: 0.35,
        dashArray: "6, 8",
        lineCap: "round",
      }).addTo(map);

      // Fit map to show both markers with padding
      map.fitBounds(
        [
          [ukLatLng[0], ukLatLng[1]],
          [bhLatLng[0], bhLatLng[1]],
        ],
        { padding: [60, 80] },
      );
    };

    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className='w-full h-full'
      style={{ background: "#ddd5cc" }}
    />
  );
}

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
  const mapBoxRef = useRef(null);

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

      gsap.set(mapBoxRef.current, { opacity: 0, y: 32 });

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
          mapBoxRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          "-=0.5",
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
    <>
      {/* Leaflet popup style override */}
      <style>{`
        .custom-map-popup .leaflet-popup-content-wrapper {
          background: #e7d9d4;
          border: 1px solid #111111;
          border-radius: 0;
          box-shadow: 2px 4px 12px rgba(0,0,0,0.18);
          padding: 0;
        }
        .custom-map-popup .leaflet-popup-tip {
          background: #e7d9d4;
        }
        .custom-map-popup .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-control-zoom a {
          background: #111111 !important;
          color: #e7d9d4 !important;
          border: none !important;
        }
        .leaflet-control-zoom a:hover {
          background: #333 !important;
        }
      `}</style>

      <section
        ref={sectionRef}
        className={[
          "relative w-full px-4 overflow-hidden bg-[#e7d9d4]",
          className,
        ].join(" ")}>
        <div className='mx-auto w-full max-w-[1880px]'>
          {/* Top content */}
          <div className='max-w-[1640px] mx-auto w-full'>
            <div className='grid grid-cols-1 gap-y-10 pb-0 pt-[68px] lg:grid-cols-[1fr_1fr] md:gap-x-[56px]'>
              <div className=''>
                <div
                  ref={introLineRef}
                  className='h-[2px] w-[33px] ml-[2.5px] md:ml-1.5 bg-[#111111]'
                />
                <h2
                  ref={titleRef}
                  className='pt-[36px] molde-expanded text-[30px] max-md:text-[22px] font-normal uppercase leading-[30px] md:leading-[50px] text-[#111111] md:text-[50px]'>
                  {safeContent.title}
                </h2>
              </div>

              <div className='flex justify-center items-center'>
                <p
                  ref={descRef}
                  className='pt-[0px] text-[18px] font-normal leading-[25px] text-[#252525]'>
                  {safeContent.description}
                </p>
              </div>
            </div>
          </div>

          {/* ── Map Box ── */}
          <div
            ref={mapBoxRef}
            className='w-full max-w-[1630px] h-[600px] my-10 mx-auto relative overflow-hidden'
            style={{
              border: "1px solid rgba(17,17,17,0.15)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
            }}>
            <InteractiveMap />

            {/* Subtle corner labels */}
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 20,
                zIndex: 800,
                pointerEvents: "none",
                fontFamily: "sans-serif",
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "#111111",
                opacity: 0.5,
                textTransform: "uppercase",
              }}>
              Interactive Map
            </div>
          </div>

          {/* Bottom maps */}
          <div
            ref={cardsWrapRef}
            className='grid grid-cols-1 gap-0 pt-[88px] py-10 md:grid-cols-2 hidden'>
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
    </>
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
        "relative h-[360px] mx-1.5 my-1.5 md:my-0 overflow-hidden sm:h-[430px] md:h-[520px] lg:h-[882px]",
        withDivider ? "md:border-l md:border-l-[#e7d9d4]" : "",
      ].join(" ")}>
      <div
        data-map-image
        className='absolute inset-0 scale-100'
        style={{ transformOrigin: "center center" }}>
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

      <div className='absolute inset-0 flex items-center justify-center px-8 text-center'>
        <div
          ref={labelRef}
          className='text-[44px] molde-expanded font-light uppercase leading-none tracking-[-0.045em] text-black sm:text-[58px] md:text-[68px] lg:text-[62px] xl:text-[64px]'>
          {label}
        </div>
      </div>
    </div>
  );
}
