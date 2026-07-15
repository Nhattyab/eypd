import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { motion } from "motion/react";

interface ValueCardItem {
  id: string;
  title: string;
  description: string;
}

const mockValues: ValueCardItem[] = [
  {
    id: "val-1",
    title: "Excellence",
    description: "We believe communities deserve the highest standard of support, so we work with professionalism, evidence, and continuous learning to deliver quality results.",
  },
  {
    id: "val-2",
    title: "Integrity",
    description: "We commit to transparency, accountability, and moral courage.",
  },
  {
    id: "val-3",
    title: "Social Cohesion",
    description: "We are committed to building shared sense of belonging through dialogues and community-led action.",
  },
  {
    id: "val-4",
    title: "Inclusion",
    description: "We stand for equitable participation, ensuring women, displaced people, and marginalised youth are meaningfully included in decisions and opportunities",
  },
  {
    id: "val-5",
    title: "Sustainability",
    description: "We commit to empowering people, growing green enterprises, and strengthening resilience, without compromising the earth that sustain us. ",
  },
  {
    id: "val-6",
    title: "Partnership",
    description: "We value partnership by sharing power, listening first, and building trusted alliances that strengthen locally led change.",
  },
];

export default function Values() {
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3 columns of 2 cards each.
  // On mobile we show 1 column at a time (total 3 columns -> max index is 2).
  // On desktop we show 2 columns at a time (total 3 columns -> max index is 1).
  const maxIndex = isMobile ? 2 : 1;

  useEffect(() => {
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [isMobile, maxIndex, startIndex]);

  const nextSlide = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Stack the 6 values into 3 columns (each with 2 cards)
  const columns = [
    [mockValues[0], mockValues[1]],
    [mockValues[2], mockValues[3]],
    [mockValues[4], mockValues[5]],
  ];

  return (
    <section className="py-18 bg-gradient-to-r from-[#111e38] via-[#10352c] via-[#0e4d2d] to-[#111e38] z-0 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Responsive Grid layout containing Left Cards Grid (2/3) and Right Glowing Card (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 items-stretch" id="values-events-container">
          
          {/* Left Column (2/3 width) - Contains Header and 2x2 visible cards (Carousel) */}
          <div className="lg:col-span-2 flex flex-col justify-between space-y-8" id="values-left-col">
            
            {/* Header: Subtitle, Title, and Dot Indicator matching mockup */}
            <div className="flex items-end justify-between border-b border-gray-200/60 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 justify-start" id="about-tagline">
                  <Heart className="w-4 h-4 text-[#478b1b] fill-[#478b1b]" />
                  <span className="font-display font-black text-[#478b1b] uppercase tracking-wider text-xs sm:text-sm">
                    CORE VALUES
                  </span>
                </div>
                <h2 className="text-xl sm:text-xl lg:text-2xl font-display font-black text-white leading-[1.15] tracking-tight" id="about-main-headline">
                  Our Foundational Values
                </h2>
              </div>
              
              {/* Slider Next & Prev with Dot indicators */}
              <div className="flex items-center gap-4 mb-2 shrink-0">
                {/* Dots matching slide position (active is primary green) */}
                <div className="flex items-center gap-1.5 mr-2">
                  {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setStartIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        startIndex === idx ? "w-6 bg-[#478b1b]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow navigation buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    disabled={startIndex === 0}
                    className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-[#478b1b] hover:text-white text-gray-700 flex items-center justify-center shadow-sm disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 transition-all cursor-pointer"
                    aria-label="Previous values"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={startIndex === maxIndex}
                    className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-[#478b1b] hover:text-white text-gray-700 flex items-center justify-center shadow-sm disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-700 transition-all cursor-pointer"
                    aria-label="Next values"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="relative overflow-hidden py-2" id="events-carousel-wrapper">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                  const swipeThreshold = 50;
                  if (info.offset.x < -swipeThreshold) {
                    // Swiped left -> Next slide
                    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
                  } else if (info.offset.x > swipeThreshold) {
                    // Swiped right -> Previous slide
                    setStartIndex((prev) => Math.max(prev - 1, 0));
                  }
                }}
                animate={{ x: `-${startIndex * (isMobile ? 100 : 50)}%` }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className="flex"
                id="events-carousel-track"
              >
                {columns.map((column, colIdx) => (
                  <div
                    key={colIdx}
                    className="shrink-0 px-3 flex flex-col gap-6 sm:gap-8"
                    style={{ minWidth: isMobile ? "100%" : "50%" }}
                  >
                    {column.map((val, innerIdx) => {
                      const absoluteIdx = colIdx * 2 + innerIdx;
                      return (
                        <motion.div
                          key={val.id}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: absoluteIdx * 0.05 }}
                          className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col justify-start text-left group hover:shadow-md hover:border-gray-200/80 transition-all duration-300 relative overflow-hidden h-[150px] w-full max-w-[350px] mx-auto"
                          id={`value-card-${val.id}`}
                        >
                          {/* Top accent border that expands and turns green on hover */}
                          <div className="absolute top-0 left-0 right-0 h-[4px] bg-transparent group-hover:bg-[#478b1b] transition-all duration-300" />

                          {/* Header / Title */}
                          <h3 className="font-serif font-extrabold text-lg text-[#111e2d] group-hover:text-[#478b1b] transition-colors duration-300 tracking-tight leading-snug">
                            {val.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3">
                            {val.description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            </div>

          </div>

          {/* Right Column (1/3 width) - Vertical Callout Glowing Green Card */}
          <div className="lg:col-span-1" id="values-right-col">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-full min-h-[420px] rounded-[32px] overflow-hidden shadow-lg bg-gradient-to-br from-[#7bc74d] via-[#478b1b] to-[#1e6f3d] flex flex-col justify-between p-8 sm:p-10 text-center"
              id="upcoming-events-highlight-card"
            >
              {/* Grayscale overlay photograph representing kids in community */}
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-15"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600')" }}
              />
              
              {/* Subtle top-light gradient layer for organic glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25 pointer-events-none" />

              {/* Central Glowing Elements Container */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full my-auto space-y-6">
                
                {/* Beautiful custom double-heart outline hands SVG icon mimicking mockup exactly */}
                <div className="text-white filter drop-shadow" id="highlight-hands-icon">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  >
                    {/* Outline Hands holding the hearts */}
                    <path d="M14 44c-3-2-5-5-5-9V22a4 4 0 018 0v8h2M50 44c3-2 5-5 5-9V22a4 4 0 00-8 0v8h-2" />
                    <path d="M19 32c0 8 4 12 13 16 9-4 13-8 13-16" />
                    
                    {/* Double Hearts nested */}
                    <path d="M32 30c-4-4-8-1-8 2s4 6 8 8c4-2 8-5 8-8s-4-6-8-2z" className="text-white" strokeWidth="2.25" />
                    <path d="M32 23c-2.5-2.5-5-.5-5 1.5s2.5 3.5 5 4.5c2.5-1 5-2.5 5-4.5s-2.5-4-5-1.5z" className="text-white/80" strokeWidth="1.5" opacity="0.8" />
                  </svg>
                </div>

                {/* Main Headline */}
                <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white leading-tight tracking-tight drop-shadow-sm max-w-[280px]">
                  Let’s Make a Difference in the Lives of Other People
                </h3>
              </div>

              {/* Call to action yellow-amber button */}
              <div className="relative z-10 pt-4" id="highlight-cta-action">
                <button
                  onClick={() => handleScrollToSection("donation")}
                  className="w-full bg-white text-secondary hover:bg-primary hover:text-primary  hover:shadow-xl font-sans font-extrabold uppercase tracking-wider text-xs sm:text-sm py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md border border-white/10"
                >
                  Donate Now
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
