import React from "react";
import { motion } from "motion/react";
import { Heart, Target, Eye, ChevronsRight } from "lucide-react";
// @ts-ignore
import handsHoldingHeartImage from "../assets/images/hands_holding_heart_1782473086845.jpg";

interface AboutUsProps {
  onExploreClick: () => void;
}

export default function AboutUs({ onExploreClick }: AboutUsProps) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12  items-center">
          {/* Left Media Side with Hands Heart Image */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start" id="about-media-left">
            {/* Custom organic heart/circle image cutout as shown in the screenshot */}
            <div className="relative z-10 w-full max-w-md aspect-square rounded-[50%] overflow-hidden bg-orange-50/50 hover:scale-[1.01] transition-transform duration-500 shadow-xl border border-orange-100">
              <img
                src={handsHoldingHeartImage}
                alt="Hands holding red wooden heart"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlaid Years of Experience orange badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-6 right-2 md:right-24 bg-[#478b1b] text-white px-4 py-6 rounded-3xl shadow-2xl z-20 text-center max-w-[140px]"
              id="about-floating-experience"
            >
              <div className="font-display font-black text-5xl tracking-tight">9+</div>
              <div className="text-xs font-display font-bold uppercase tracking-wider mt-1.5 leading-snug">
                Years of Experience
              </div>
            </motion.div>
          </div>

          {/* Right Content Side matching the screenshot */}
          <div className="lg:col-span-6 space-y-6" id="about-content-right">
            <div className="space-y-4">
              <div className="flex items-center gap-2 justify-start" id="about-tagline">
                <Heart className="w-4 h-4 text-[#478b1b] fill-[#478b1b]" />
                <span className="font-display font-black text-[#478b1b] uppercase tracking-wider text-xs sm:text-sm">
                  Who We Are
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[#0a1118] leading-[1.15] tracking-tight" id="about-main-headline">
                A Movement Built by Young Ethiopians, for Ethiopia
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans" id="about-paragraph">
            EYPD — Ethiopian Youth for Peace and Development — is a youth-led civil society organization working at the intersection of peace, livelihoods, climate resilience, and inclusive advocacy across Ethiopia since 2015.
            We do not just convene — we act. From humanitarian response in crisis-affected communities to national policy advocacy, EYPD operates where it matters most: on the ground, with people most affected by conflict and inequality.            </p>

            {/* Mission & Vision blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4" id="about-features-grid">
              {/* Our Mission */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#fbf7f0] flex items-center justify-center shrink-0 shadow-sm border border-orange-50">
                  <Target className="w-6 h-6 text-[#478b1b]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm sm:text-base text-[#0a1118]">Our Mission</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-normal">We equip young people to lead advocacy, sustained peace, resilience, livelihoods, and community-led action.</p>
                </div>
              </div>

              {/* Our Vision */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#fbf7f0] flex items-center justify-center shrink-0 shadow-sm border border-orange-50">
                  <Eye className="w-6 h-6 text-[#478b1b]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm sm:text-base text-[#0a1118]">Our Vision</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-normal">A cohesive, inclusive Ethiopia where every young person belongs and thrives.</p>
                </div>
              </div>
            </div>

            {/* Action CTA matching the screenshot */}
            <div className="pt-6" id="about-bottom-cta">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-3 bg-[#478b1b] hover:bg-[#3a7316] text-white font-display font-bold pl-2 pr-8 py-2.5 rounded-full shadow-xl hover:shadow-[#478b1b]/20 hover:-translate-y-0.5 transition-all duration-200 group/btn cursor-pointer"
                id="about-explore-btn"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md group-hover/btn:translate-x-1 transition-transform duration-300">
                  <ChevronsRight className="w-5 h-5 text-[#478b1b]" />
                </div>
                <span className="text-sm">Explore More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
