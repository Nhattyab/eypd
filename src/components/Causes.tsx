import React, { useState, useEffect } from "react";
import { Campaign } from "../types";
import { Heart, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// @ts-ignore
import img1 from "../assets/images/volunteer_food_delivery_1782474593369.jpg";
// @ts-ignore
import img2 from "../assets/images/elder_man_blanket_1782474613376.jpg";
// @ts-ignore
import img3 from "../assets/images/young_man_carrying_load_1782474631970.jpg";
// @ts-ignore
import img4 from "../assets/images/child_eating_bowl_1782474654974.jpg";

interface CausesProps {
  campaigns: Campaign[];
  onDonateClick: (campaign: Campaign) => void;
}

export default function Causes({ campaigns, onDonateClick }: CausesProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleCount = () => {
    if (windowWidth < 640) return 1; // mobile
    if (windowWidth < 1024) return 2; // tablet
    return 3; // large desktop
  };

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, campaigns.length - visibleCount);

 // Clamp index if visible count changes
  useEffect(() => {
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, startIndex]);

  const nextSlide = () => {
    if (startIndex < maxIndex) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  // Map generated high-fidelity humanitarian images
  const imagesList = [img1, img2, img3, img4];
  const mappedCampaigns = campaigns.map((camp, index) => ({
    ...camp,
    image: imagesList[index % imagesList.length] || camp.image,
  }));

  return (
    <section className="py-14 bg-gradient-to-r from-[#111e38] via-[#10352c] via-[#0e4d2d] to-[#111e38] z-0 relative overflow-hidden" id="projects">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Grid with Avatars & Carousel Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="flex items-center gap-2 justify-start" id="causes-tagline">
              <span className="font-display font-black text-[#478b1b] uppercase tracking-wider text-xs sm:text-sm">
                Our Projects
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white leading-[1.15] tracking-tight" id="causes-section-title">
              Projects and Flagship Initiatives
            </h2>
          </div>

          {/* Active Donors Badge & Slider Controls */}
          <div className="flex flex-wrap items-center gap-6 self-start md:self-end">

            {/* Carousel Navigation Controls */}
            <div className="flex items-center gap-3" id="causes-nav-controls">
              <button
                onClick={prevSlide}
                disabled={startIndex === 0}
                className="w-12 h-12 rounded-full border border-emerald-100 bg-white hover:bg-emerald-50 text-gray-700 flex items-center justify-center shadow-sm disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <span className="text-xl font-bold">←</span>
              </button>
              <button
                onClick={nextSlide}
                disabled={startIndex === maxIndex}
                className="w-12 h-12 rounded-full border border-emerald-100 bg-white hover:bg-emerald-50 text-gray-700 flex items-center justify-center shadow-sm disabled:opacity-40 disabled:hover:bg-white transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <span className="text-xl font-bold">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Window Container */}
        <div className="overflow-hidden w-full relative" id="causes-carousel-window">
          <motion.div
            className="flex gap-8 w-full"
            animate={{
              x: `-${startIndex * (100 / visibleCount + (visibleCount > 1 ? 1.5 : 0))}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
            }}
          >
            {mappedCampaigns.map((camp) => {

              return (
                <div
                  key={camp.id}
                  className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] xl:w-[calc(25%-24px)] shrink-0"
                  id={`cause-carousel-item-${camp.id}`}
                >
                  <motion.div
                    className="bg-white rounded-[24px] p-4 border border-gray-200 shadow-none hover:shadow-md transition-all duration-300 flex flex-col h-full group"
                    id={`cause-card-${camp.id}`}
                    whileHover={{ y: -3 }}
                  >

                     {/* Image Section */}
                    <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden mb-3 bg-gray-50">
                      <img
                        src={camp.image}
                        alt={camp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {/* Foods Category Overlay Label */}
                      <span className="absolute top-4 left-4 bg-[#478b1b] text-white text-[11px] font-sans font-extrabold uppercase px-4 py-1.5 rounded-md shadow-sm tracking-wide">
                        Foods
                      </span>
                    </div>


                    {/* Info Section */}
                    <div className="flex flex-col flex-1 justify-between">
                      <div className="space-y-2">
                        <h3 className="font-sans font-extrabold text-lg text-[#0a1118] group-hover:text-[#478b1b] transition-colors duration-300 leading-snug line-clamp-2">
                          {camp.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed line-clamp-3">
                          {camp.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

