import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = "+" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 1500; // ms
    const increment = Math.ceil(end / (duration / 16)); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-primary block mt-2 tracking-tight">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const stats = [
    {
      id: "stat-1",
      value: 250,
      title: "Youth delegates at Addis Forum 2025",
      bgImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=350",
      icon: (
        <svg
          className="w-12 h-12 text-white/90 group-hover:text-[#7bc74d] transition-colors duration-300"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Main Central Person */}
          <path d="M32 44c-6 0-11 4-11 9h22c0-5-5-9-11-9z" />
          <circle cx="32" cy="33" r="5" />
          
          {/* Left Person */}
          <path d="M19 46c-4.5 0-8 3-8 7h11c0-4-3-7-3-7z" opacity="0.7" />
          <circle cx="19" cy="37" r="4" opacity="0.7" />
          
          {/* Right Person */}
          <path d="M45 46c0 0-3-3-3-7h11c0 4-3.5 7-8 7z" opacity="0.7" />
          <circle cx="45" cy="37" r="4" opacity="0.7" />

          {/* Three stars bursting above head */}
          <path d="M32 12l1 2 2 .3-1.5 1.5.3 2-1.8-1-1.8 1 .3-2-1.5-1.5 2-.3z" fill="currentColor" className="text-white/80" />
          <path d="M18 16l.8 1.5 1.6.2-1.2 1.2.3 1.6-1.5-.8-1.5.8.3-1.6-1.2-1.2 1.6-.2z" fill="currentColor" className="text-white/60" />
          <path d="M46 16l.8 1.5 1.6.2-1.2 1.2.3 1.6-1.5-.8-1.5.8.3-1.6-1.2-1.2 1.6-.2z" fill="currentColor" className="text-white/60" />
        </svg>
      ),
    },
    {
      id: "stat-2",
      value: 9,
      title: "Years of youth-led work in Ethiopia",
      bgImage: "https://images.unsplash.com/photo-1559027615-cd4467ea2696?q=80&w=350",
      icon: (
        <svg
          className="w-12 h-12 text-white/90 group-hover:text-[#7bc74d] transition-colors duration-300"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Cooperative stack of four joined/linked hands */}
          <path d="M22 36l-8-8 6-6 8 8m-6-6l10-10 6 6-10 10" />
          <path d="M42 28l8 8-6 6-8-8m6 6L32 50l-6-6 10-10" />
          <circle cx="32" cy="32" r="14" stroke="currentColor" strokeDasharray="3 3" opacity="0.5" />
        </svg>
      ),
    },
    {
      id: "stat-3",
      value: 11,
      title: "Regions and communities reached",
      bgImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=350",
      icon: (
        <svg
          className="w-12 h-12 text-white/90 group-hover:text-[#7bc74d] transition-colors duration-300"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Isometric box opening up with floating checkmark */}
          <path d="M32 14L14 22l18 8 18-8-18-8z" />
          <path d="M14 22v18l18 8V30" />
          <path d="M50 22v18l-18 8V30" />
          <path d="M14 22l9-8m27 8l-9-8" opacity="0.8" />
          
          {/* Floating circular badge with a checkmark */}
          <circle cx="32" cy="22" r="6" fill="#478b1b" />
          <path d="M29.5 22l1.5 1.5 2.5-3" stroke="white" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "stat-4",
      value: 15,
      title: "Institutional partners and collaborators",
      bgImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=350",
      icon: (
        <svg
          className="w-12 h-12 text-white/90 group-hover:text-[#7bc74d] transition-colors duration-300"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Line handshake with globe/community background */}
          <path d="M16 36l8-8a4 4 0 016 0l4 4a4 4 0 006 0l8-8" />
          <path d="M20 40l6-6m-4 10l8-8" />
          <path d="M44 24l-6 6" />
          <circle cx="32" cy="32" r="18" stroke="currentColor" strokeDasharray="3 3" opacity="0.4" />
          <path d="M14 32h36M32 14c4 4 6 10 6 18s-2 14-6 18" opacity="0.3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-[#111e38] via-[#10352c] via-[#0e4d2d] to-[#111e38] z-0 relative overflow-hidden" id="stats-counter-section">
      
      {/* Topography Contour Line Watermark Background Paths */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none z-0" id="stats-topography-lines">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,150 C150,50 350,220 550,110 C750,0 950,170 1150,120 C1350,70 1550,280 1750,120" fill="none" stroke="white" strokeWidth="2.5" />
          <path d="M-100,280 C150,180 350,350 550,240 C750,130 950,300 1150,250 C1350,200 1550,410 1750,250" fill="none" stroke="white" strokeWidth="2" />
          <path d="M-100,410 C150,310 350,480 550,370 C750,260 950,430 1150,380 C1350,330 1550,540 1750,380" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M-100,540 C150,440 350,610 550,500 C750,390 950,560 1150,510 C1350,460 1550,670 1750,510" fill="none" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 justify-items-center" id="stats-counter-grid">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="w-full aspect-square max-w-[260px] rounded-full flex flex-col items-center justify-center p-8 text-center group cursor-pointer relative transition-transform duration-500 hover:scale-[1.03]"
              id={stat.id}
            >
              
              {/* === BORDER ANIMATIONS === */}
              {/* Outer dashed spinning ring */}
              <div className="absolute -inset-2.5 rounded-full border border-dashed border-[#478b1b]/15 group-hover:border-[#7bc74d]/50 transition-all duration-700 animate-[spin_40s_linear_infinite]" />
              
              {/* Inner dotted reverse-spinning ring */}
              <div className="absolute -inset-1 rounded-full border border-dotted border-white/5 group-hover:border-white/10 transition-all duration-700 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Core solid animated border */}
              <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-[#478b1b] transition-colors duration-500 z-10 pointer-events-none" />

              {/* === HOVER BACKGROUND IMAGE WITH DARK MASK === */}
              <div className="absolute inset-0 rounded-full overflow-hidden z-0">
                {/* Background image container that expands and reveals on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-500 ease-out"
                  style={{ backgroundImage: `url('${stat.bgImage}')` }}
                />
                
                {/* Dark slate color filter for visual compliance and high text contrast */}
                <div className="absolute inset-0 bg-[#131921]/90 group-hover:bg-[#0f151e]/85 transition-colors duration-500" />
              </div>

              {/* === CORE CONTENT (Elevated above bg image and filters) === */}
              <div className="relative z-20 flex flex-col items-center justify-center space-y-1.5">
                {/* Icon Holder with bounce & glow effect */}
                <div className="mb-2.5 transform group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-300 filter group-hover:drop-shadow-[0_4px_12px_rgba(123,199,77,0.3)]" id={`stat-icon-${stat.id}`}>
                  {stat.icon}
                </div>

                {/* Counter & Label */}
                <div className="space-y-0.5">
                  <Counter value={stat.value} />
                  <span className="text-xs sm:text-sm font-sans font-semibold text-white/70 tracking-normal block group-hover:text-white transition-colors duration-300 uppercase tracking-wider text-[11px]">
                    {stat.title}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}