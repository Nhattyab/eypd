import { useState, useEffect } from "react";
import { Testimonial } from "../types";
import { MessageSquare, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-surface-main relative overflow-hidden" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-accent/15 text-primary border border-primary/20 text-xs font-display font-bold uppercase px-3 py-1 rounded-full">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Donor Testimonials</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary leading-tight" id="testimonials-title">
              What They Are Talking About Charitics
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-2 self-start md:self-end">
            <button
              onClick={handlePrev}
              className="p-3 bg-white hover:bg-primary text-secondary hover:text-white border border-border-main hover:border-primary rounded-full shadow-sm transition-all duration-200 cursor-pointer"
              id="testimonial-prev-btn"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-white hover:bg-primary text-secondary hover:text-white border border-border-main hover:border-primary rounded-full shadow-sm transition-all duration-200 cursor-pointer"
              id="testimonial-next-btn"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[340px]" id="testimonial-carousel-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Image Column */}
              <div className="md:col-span-4 relative flex justify-center">
                <div className="relative w-56 h-56 rounded-full overflow-hidden border-8 border-white shadow-xl z-10 bg-secondary">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Floating quotation marks circle backdrop */}
                <div className="absolute top-0 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg z-20">
                  <Quote className="w-5 h-5 fill-white" />
                </div>
              </div>

              {/* Text Review Column */}
              <div className="md:col-span-8 bg-white p-8 sm:p-10 rounded-3xl border border-border-main shadow-sm relative space-y-5 flex flex-col justify-between">
                {/* Stars */}
                <div className="flex gap-1" id="stars-row">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>

                {/* Comment review */}
                <p className="text-sm sm:text-base text-text-muted italic leading-relaxed font-sans">
                  "{testimonials[currentIndex].comment}"
                </p>

                {/* Author Info */}
                <div className="border-t border-border-main pt-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-display font-extrabold text-sm sm:text-base text-secondary">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-xs font-display font-semibold text-text-muted mt-0.5">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>

                  <Quote className="w-12 h-12 text-primary/10 fill-primary/10 hidden sm:block shrink-0" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center gap-2.5 mt-10" id="testimonial-indicators">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? "w-7 bg-primary" : "w-2.5 bg-border-main"
              }`}
              id={`testimonial-dot-${idx}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
