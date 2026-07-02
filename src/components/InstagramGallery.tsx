import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function InstagramGallery() {
  const images = [
    { id: "img-1", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=300", alt: "Nutrition smile" },
    { id: "img-2", url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=300", alt: "Organic farming group" },
    { id: "img-3", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=300", alt: "Clean water borehole" },
    { id: "img-4", url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=300", alt: "Education class" },
    { id: "img-5", url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=300", alt: "Volunteer stack" },
  ];

  return (
    <section className="py-12 bg-surface-main border-y border-border-main" id="instagram-gallery-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {images.map((img) => (
            <motion.div
              key={img.id}
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-md group shrink-0"
              whileHover={{ scale: 1.05 }}
              id={`gallery-${img.id}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
