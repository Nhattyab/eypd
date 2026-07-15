import React from "react";
import { motion } from "motion/react";

interface PartnerItem {
  id: string;
  content: React.ReactNode;
}

const partnersData: PartnerItem[] = [
  {
    id: "MOWSA",
    content: (
      <div className="flex items-center justify-center text-gray-400 group-hover:text-gray-800 transition-colors duration-300 select-none">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 mr-2 text-gray-400 group-hover:text-gray-800 transition-colors duration-300 shrink-0"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span className="font-sans font-bold text-lg tracking-tight">MOWSA</span>
      </div>
    )
  },
  {
    id: "Oxfam Ethiopia",
    content: (
      <div className="flex items-center justify-center text-gray-400 group-hover:text-gray-800 transition-colors duration-300 select-none">
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 mr-2 text-gray-400 group-hover:text-gray-800 transition-colors duration-300 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M6 10l10 14 10-14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 10l5 7 5-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-sans font-medium text-xl tracking-tight">Oxfam Ethiopia"</span>
      </div>
    )
  },
  {
    id: "UNHCR Ethiopia",
    content: (
      <div className="flex items-center justify-center select-none">
        <span className="font-sans font-black italic text-2xl tracking-tighter text-gray-400 group-hover:text-gray-800 transition-colors duration-300 uppercase">
          UNHCR Ethiopia
        </span>
      </div>
    )
  },
  {
    id: "Adwa Memorial Museum",
    content: (
      <div className="flex items-center justify-center select-none">
        <span className="font-sans font-extrabold tracking-[0.1em] text-lg text-gray-400 group-hover:text-gray-800 transition-colors duration-300 uppercase">
          Adwa Memorial Museum
        </span>
      </div>
    )
  },
  {
    id: "Oxfam Italy",
    content: (
      <div className="flex items-center justify-center text-gray-400 group-hover:text-gray-800 transition-colors duration-300 select-none">
        <span className="font-sans font-medium text-lg tracking-tight lowercase">Oxfam Italy</span>
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 ml-1.5 text-gray-400 group-hover:text-gray-800 transition-colors duration-300 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M12 12c-2-3-4-3-4 0s2 3 4 0M12 12c2-3 4-3 4 0s-2 3-4 0" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8v8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        </svg>
      </div>
    )
  },
  {
    id: "Wari Communications",
    content: (
      <div className="flex items-center justify-center text-gray-400 group-hover:text-gray-800 transition-colors duration-300 select-none">
        <span className="font-sans font-medium text-lg tracking-tight lowercase">Wari Communications</span>
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 ml-1.5 text-gray-400 group-hover:text-gray-800 transition-colors duration-300 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M12 12c-2-3-4-3-4 0s2 3 4 0M12 12c2-3 4-3 4 0s-2 3-4 0" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8v8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        </svg>
      </div>
    )
  }
];

export default function Partners() {
  return (
    <section className="py-14 bg-[#f8f9fa] border-y border-gray-200/40 relative overflow-hidden" id="partners-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <span className="font-display font-black text-[#478b1b] uppercase tracking-wider text-xs sm:text-sm">
                Our Partners
              </span>              
          {/* Main Headline */}
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-secondary leading-tight tracking-tight mb-4"
            id="cta-headline"
          >
            Working Together for < br/>Ethiopian Youth
          </h2>
  
          {/* Supporting Subtitle Paragraph */}
          <p 
            className="text-gray-600 text-sm sm:text-base lg:text-lg font-sans max-w-3xl mx-auto leading-relaxed mb-5"
            id="cta-subtitle"
          >
              We partner with government bodies, international organizations, < br/> civil society, and the private sector.          </p>
        </div>        

        <div className="relative w-full overflow-hidden" id="marquee-container">
          
          {/* Elegant fading edge masks on left and right sides */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f8f9fa] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f8f9fa] to-transparent pointer-events-none z-10" />

          {/* Infinite Moving Track using Motion */}
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: [0, "-50%"] }}
            transition={{
              ease: "linear",
              duration: 22,
              repeat: Infinity,
            }}
            id="marquee-track"
          >
            {/* First Set of Brand Cards */}
            <div className="flex gap-6 shrink-0 items-center">
              {partnersData.map((partner) => (
                <div
                  key={`set1-${partner.id}`}
                  className="bg-white border border-gray-200/60 p-6 flex items-center justify-center h-24 w-48 sm:w-56 rounded-xl shadow-sm hover:border-gray-300 transition-all duration-300 group cursor-pointer"
                  id={`marquee-set1-${partner.id}`}
                >
                  {partner.content}
                </div>
              ))}
            </div>

            {/* Second identical set of Brand Cards for seamless infinite looping */}
            <div className="flex gap-6 shrink-0 items-center">
              {partnersData.map((partner) => (
                <div
                  key={`set2-${partner.id}`}
                  className="bg-white border border-gray-200/60 p-6 flex items-center justify-center h-24 w-48 sm:w-56 rounded-xl shadow-sm hover:border-gray-300 transition-all duration-300 group cursor-pointer"
                  id={`marquee-set2-${partner.id}`}
                >
                  {partner.content}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
