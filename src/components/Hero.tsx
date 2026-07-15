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
      className="relative min-h-screen bg-secondary text-white flex flex-col justify-center overflow-hidden"
      id="home"
    >
      {/* Full-bleed Background Image with multi-direction fades using the primary color */}
      <div className="absolute inset-0 z-0 overflow-hidden" id="hero-bg-container">
        <img
          src={refugeeChildImage}
          alt="Humanitarian Focus Portrait"
          className="w-full h-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Fades using the primary and secondary colors */}
        {/* 1. Right to Left Fade (Primary color blend & Dark slate overlay for text readability) */}
        <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-secondary via-secondary/45 to-transparent z-10" />
        <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-primary/50 via-primary/20 to-transparent mix-blend-multiply z-10 pointer-events-none" />

        {/* 2. Left to Right Fade (Fade out on the right edge so it blends into the screen) */}
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary/80 via-secondary/50 to-transparent z-10 pointer-events-none" />

        {/* 3. Top and Bottom Fades (Primary and Secondary gradients) */}
        {/* Top Fade (Fade in/out from top) */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-secondary to-transparent z-10" />
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/25 to-transparent mix-blend-screen z-10 pointer-events-none" />

        {/* Bottom Fade (Fade in/out to bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary/30 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-secondary/45 to-transparent mix-blend-screen z-10 pointer-events-none" />
      </div>
    

        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28 w-full pt-32 pb-24 relative z-20">
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
              className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white leading-[1.12] tracking-tight"
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
              className="text-white/80 text-sm sm:text-base leading-relaxed max-w-xl font-sans"
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
              {/* Customized Explore Pill Link/Button */}
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onExploreClick();
              }}
              className="flex items-center gap-3 bg-primary hover:bg-primary/95 text-white font-display font-bold pl-2 pr-8 py-2.5 rounded-full shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200 group/btn cursor-pointer inline-flex"
              id="hero-explore-btn"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md group-hover/btn:translate-x-1 transition-transform duration-300">
                <ChevronsRight className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm">Explore More About Us</span>
            </a>
            </motion.div>
          </div>
        </div>
    </section>
  );
}
