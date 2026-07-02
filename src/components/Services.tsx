import React from "react";
import { motion } from "motion/react";

import img1 from "../assets/images/pattern1.png";
import img2 from "../assets/images/pattern2.png";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  backgroundImage: string;
  icon: React.ReactNode;
}

const servicesData: ServiceCard[] = [
  {
    id: "service-help",
    title: "Peace & Reconciliation",
    description: "Grassroots dialogue platforms and community reconciliation programs across conflict-affected regions of Ethiopia.",
    backgroundImage: img1,
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12 transition-colors duration-300"
      >
        {/* Hand outline holding/supporting the dove */}
        <path d="M16 42h18c3.5 0 6.5-2.5 6.5-6s-3-6-6.5-6H25M16 42v-8h-4M20 34v8" />
        {/* Dove outline */}
        <path d="M25 25c4-5 11-7 15-5 1 1 1.5 2 1.5 3s-2.5 4-5.5 5c4 .5 7.5 2 9.5 4.5s-1.5 3.5-3.5 3.5c-4 .5-8-.5-11-2.5" />
        <path d="M32 19c1-2 3-3.5 5-3.5" />
      </svg>
    ),
  },
  {
    id: "service-educate",
    title: "Livelihoods & Resilience",
    description: "Skills development, economic empowerment, and climate resilience for youth in vulnerable communities.",
    backgroundImage: img2,
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12 transition-colors duration-300"
      >
        {/* Main card/cheque */}
        <rect x="18" y="26" width="28" height="18" rx="2" />
        {/* 1000 text inside the card */}
        <text
          x="32"
          y="37"
          fontSize="6.5"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
        >
          1000
        </text>
        <path d="M22 40h20" opacity="0.6" />
        {/* Hearts floating on top-left */}
        <path d="M16 18c-1.5-1.5-3.5-.5-3.5 1.5s2 3.5 3.5 4.5c1.5-1 3.5-2.5 3.5-4.5s-2-3-3.5-1.5z" />
        <path d="M24 14c-1-1-2-.3-2 1s1.3 2.3 2 3c.7-.7 2-1.7 2-3s-1-2-2-1z" opacity="0.8" />
        {/* Pen on the right side */}
        <path d="M48 20v14M46 20h4M48 20l-1.5-4h3L48 20z" />
      </svg>
    ),
  },
  {
    id: "service-build",
    title: "Advocacy & Leadership",
    description: "Youth leadership programs, civic education, and policy advocacy to amplify youth voices at all levels.",
    backgroundImage: img1,
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12 transition-colors duration-300"
      >
        {/* Central Globe */}
        <circle cx="32" cy="24" r="8.5" />
        <path d="M23.5 24h17M32 15.5c2 2.5 3 5 3 8.5s-1 6-3 8.5M32 15.5c-2 2.5-3 5-3 8.5s1 6 3 8.5" opacity="0.7" />
        {/* Two hands holding the globe */}
        <path d="M21 33c-3 1.5-5 4-5 8v3h12" />
        <path d="M43 33c3 1.5 5 4 5 8v3h-12" />
        <path d="M28 39h8" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "service-nourish",
    title: "Humanitarian Response",
    description: "Emergency support and community resilience in crisis-affected areas with international humanitarian partners.",
    backgroundImage: img2,
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12 transition-colors duration-300"
      >
        {/* Outer Heart */}
        <path d="M32 46C18 36 14 26 22 18c6-6 10-2 10-2s4-4 10 2c8 8 4 18-10 28z" />
        {/* Clasped fingers/hands inside the heart */}
        <path d="M24 28l6 6M28 24l6 6M32 20l6 6M36 24l4-4" opacity="0.85" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="py-16 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header: Subtitle, Title, and Dot Indicator matching mockup */}
      <div className="flex items-end justify-between border-b border-gray-200/60 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 justify-start" id="about-tagline">
            <span className="font-display font-black text-[#478b1b] uppercase tracking-wider text-xs sm:text-sm">
              THEMATIC AREAS
            </span>
          </div>
          <h2 className="text-xl sm:text-xl lg:text-2xl font-display font-black text-[#0a1118] leading-[1.15] tracking-tight" id="about-main-headline">
            Where We Focus
          </h2>
        </div>
      </div>  

       <div className="max-w-6xl mx-auto ">
        {/* 4-Column Grid layout of beautiful cards matching the mockup/video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="services-cards-grid ">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-[#111e2d] rounded-[14px] overflow-hidden group flex flex-col items-center justify-center text-center py-10 px-6 min-h-[280px] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
              id={`service-card-${service.id}`}
            >
              {/* Background Image that zooms in slightly on hover */}
              <img
                src={service.backgroundImage}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.42] group-hover:scale-110 transition-transform duration-700 pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Dark/Warm vignette overlay matching the premium look */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-primary/30 z-0 opacity-100 transition-opacity duration-300 group-hover:opacity-95" />

              {/* Card Content Wrapper (relative z-10 for pointer events/stacking) */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full w-full space-y-6">
                
                {/* Perfect circular icon container with smooth background color switch */}
                <div 
                  className="w-18 h-18 rounded-full bg-[#478b1b] text-white group-hover:bg-white group-hover:text-[#478b1b] flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all transition-colors duration-500"
                  id={`service-icon-circle-${service.id}`}
                >
                  <div className="p-1">
                    {service.icon}
                  </div>
                </div>

                {/* Typography: Title & Subtitle styled with high contrast serif paired fonts */}
                <div className="space-y-2">
                  <h3 className="font-serif font-extrabold text-lg text-white/85 group-hover:text-white transition-colors duration-500 tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed font-sans font-medium opacity-90 max-w-[250px] mx-auto">
                    {service.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
       </div>
      </div>
    </section>
  );
}
