import { motion } from "motion/react";
import { Heart, ChevronsRight } from "lucide-react";
// @ts-ignore
import refugeeChildImage from "../assets/images/refugee_child_portrait_1782472576507.jpg";

interface HeroProps {
  onDonateClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onDonateClick, onExploreClick }: HeroProps) {
  return (
    <section
      className="relative min-h-screen bg-secondary text-white flex flex-col justify-between overflow-hidden"
      id="home"
    >
      {/* Decorative concentric background elements */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-1/2 -left-[150px] w-[500px] h-[500px] border border-white rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 -left-[250px] w-[700px] h-[700px] border border-white rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 -left-[350px] w-[900px] h-[900px] border border-white rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 -left-[450px] w-[1100px] h-[1100px] border border-white rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 -left-[550px] w-[1300px] h-[1300px] border border-white rounded-full -translate-y-1/2" />
        <div className="absolute top-1/2 -left-[650px] w-[1500px] h-[1500px] border border-white rounded-full -translate-y-1/2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen w-full relative z-10">
        {/* Left Column - Content */}
        <div className="col-span-12 lg:col-span-6 xl:col-span-7 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 pt-32 pb-20 relative z-20">
          
          {/* Subtle background hands vector illustration in the bottom-left corner */}
          <svg
            className="absolute bottom-0 left-0 w-80 h-56 text-white/5 opacity-65 pointer-events-none z-0"
            viewBox="0 0 300 200"
            fill="currentColor"
          >
            {/* Hand 1 */}
            <path d="M30,200 C40,160 20,110 32,90 C38,80 46,90 46,100 C47,90 56,80 62,95 C62,85 71,80 77,95 C77,90 86,90 82,110 C87,125 72,150 80,200 Z" />
            {/* Hand 2 */}
            <path d="M100,200 C110,145 90,95 112,70 C118,60 128,70 128,85 C133,75 143,70 149,85 C154,75 164,75 164,90 C169,85 178,85 173,110 C178,135 153,160 160,200 Z" />
            {/* Hand 3 */}
            <path d="M190,200 C200,165 180,125 192,100 C198,90 208,100 208,115 C213,105 223,100 229,115 C234,105 244,105 244,120 C249,115 258,115 253,135 C258,155 233,170 240,200 Z" />
          </svg>

          <div className="space-y-6 max-w-2xl relative z-10 text-left">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-1.5 justify-start"
              id="hero-tagline-container"
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="font-display font-extrabold text-primary uppercase tracking-wider text-xs sm:text-sm">
                Youth-Led · Peace-Driven · Community-Rooted
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white leading-[1.12] tracking-tight"
              id="hero-main-title"
            >
              Until Every <br />
              Young Person <br />
              <span className="text-primary">Thrives</span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl font-sans"
              id="hero-desc"
            >
              A youth-led civil society organization advancing peace, livelihoods, resilience, and inclusive development across Ethiopia.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 pt-4"
              id="hero-cta-group"
            >
              {/* Customized Donation Pill Button */}
              <button
                onClick={onDonateClick}
                className="flex items-center gap-3 bg-primary hover:bg-primary/95 text-white font-display font-bold pl-2 pr-8 py-2.5 rounded-full shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200 group/btn cursor-pointer"
                id="hero-donate-btn"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md group-hover/btn:translate-x-1 transition-transform duration-300">
                  <ChevronsRight className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm">Make Donation</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Beautiful Organic Image Cutout */}
        <div className="col-span-12 lg:col-span-6 xl:col-span-5 relative h-[450px] lg:h-auto min-h-[450px] lg:min-h-full overflow-hidden">
          {/* Main Portrait Image */}
          <img
            src={refugeeChildImage}
            alt="Humanitarian Focus Portrait"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Organic Vertical Wave Mask Divider (Only Visible on Desktop) */}
          <div className="absolute top-0 bottom-0 left-0 w-[150px] z-10 pointer-events-none hidden lg:block">
            <svg
              className="h-full w-full text-secondary fill-current"
              viewBox="0 0 100 600"
              preserveAspectRatio="none"
            >
              {/* Highlight curve line mapping the wave */}
              <path
                d="M 0,0 C 35,50 85,150 25,300 C -25,420 40,520 85,600"
                fill="none"
                className="text-primary stroke-current"
                strokeWidth="4"
              />
              {/* Solid fill overlaying left side of image to match background */}
              <path
                d="M 0,0 C 35,50 85,150 25,300 C -25,420 40,520 85,600 L 0,600 Z"
              />
            </svg>
          </div>

          {/* Bottom Horizontal Organic Wave Baseline overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 z-10 pointer-events-none">
            <svg
              className="w-full h-full text-secondary fill-current"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M 0,100 C 30,55 70,115 100,75 L 100,100 Z" />
              <path
                d="M 0,100 C 30,55 70,115 100,75"
                fill="none"
                className="text-primary/30 stroke-current"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Top Horizontal organic wave transition for Mobile/Tablets to hide standard hard edge */}
          <div className="absolute -top-1 left-0 right-0 h-12 z-10 pointer-events-none block lg:hidden">
            <svg
              className="w-full h-full text-secondary fill-current rotate-180"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M 0,100 C 30,55 70,115 100,75 L 100,100 Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
