import React from "react";
import { motion } from "motion/react";

interface CTAProps {
  onDonateClick: () => void;
  onPartnerClick?: () => void;
}

export default function CTA({ onDonateClick, onPartnerClick }: CTAProps) {
  return (
    <section className="relative py-14 overflow-hidden" id="cta-section">
      {/* Deep Blue-to-Green Gradient Backdrop with a subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111e38] via-[#10352c] to-[#0e4d2d] z-0" />
      
      {/* Decorative Dot Matrix Overlay for textured look */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" 
        style={{
          backgroundImage: "radial-gradient(circle, white 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Main Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight tracking-tight mb-4"
          id="cta-headline"
        >
          Ready to Stand With Ethiopian Youth?
        </motion.h2>

        {/* Supporting Subtitle Paragraph */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-sm sm:text-base lg:text-lg font-sans max-w-3xl mx-auto leading-relaxed mb-10"
          id="cta-subtitle"
        >
          Whether you are a funder, a partner, a young leader, or a community member — there is a place for you in EYPD.
        </motion.p>

        {/* Buttons matching the image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          id="cta-button-container"
        >
          {/* Donate Now Button */}
          <button
            onClick={onDonateClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-primary/85 hover:bg-primary text-white  font-display font-black text-sm rounded-xl shadow-lg transition-colors cursor-pointer"
            id="cta-donate-btn"
          >
            Donate Now
          </button>

          {/* Partner With Us Button */}
          <button
            onClick={onPartnerClick || onDonateClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-display font-black text-sm rounded-xl transition-all cursor-pointer"
            id="cta-partner-btn"
          >
            Partner With Us
          </button>
        </motion.div>

      </div>
    </section>
  );
}
