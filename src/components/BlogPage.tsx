import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { User, Tag, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { DetailedBlogPost, initialBlogs } from "../data/blogData";

// @ts-ignore
import refugeeChildPortrait from "../assets/images/refugee_child_portrait_1782472576507.jpg";

interface BlogPageProps {
  onBlogSelect: (blog: DetailedBlogPost) => void;
  onBackToHome: () => void;
}

export default function BlogPage({ onBlogSelect, onBackToHome }: BlogPageProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(initialBlogs.length / postsPerPage);

  // Get current posts
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return initialBlogs.slice(startIndex, startIndex + postsPerPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 350, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-transparent min-h-screen text-gray-800" id="blog-listing-page">
      
      {/* 1. Header Banner with Breadcrumbs */}
      <section
        className="relative bg-secondary py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="blogs-hero-banner"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={refugeeChildPortrait}
            alt="Blogs Banner Background"
            className="w-full h-full object-cover opacity-20 filter grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111e38] via-[#10352c] to-[#0e4d2d] z-10" />
        </div>

        <div className="relative z-20 space-y-4 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            Blogs
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-display font-bold text-gray-300">
            <button
              onClick={onBackToHome}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-primary font-black">»</span>
            <span className="text-white">Blogs</span>
          </div>
        </div>
      </section>

      {/* 2. Main Blogs Grid */}
      <section className="py-24 bg-white" id="blogs-grid-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" id="blogs-asymmetric-grid">
            {currentPosts.map((post, idx) => {
              // Parse date into "15" and "Dec"
              const [day, month] = post.date.split(" ");

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="bg-[#f8f9fa] rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                  id={`blog-card-${post.id}`}
                >
                  {/* Media Block */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating Date Badge exactly like the image */}
                    <div className="absolute bottom-4 right-4 bg-primary text-white rounded-xl py-2 px-3.5 shadow-lg text-center flex flex-col items-center justify-center min-w-[50px]">
                      <span className="font-display font-black text-lg leading-none">{day}</span>
                      <span className="font-sans font-bold text-[10px] uppercase tracking-wider leading-none mt-0.5">{month}</span>
                    </div>
                  </div>

                  {/* Text Info Block */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4 bg-[#f8f9fa]">
                    <div className="space-y-3">
                      {/* Metadata line */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 font-display font-semibold">
                        <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                          <User className="w-4 h-4 text-primary" />
                          <span>By {post.author}</span>
                        </span>
                        <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                          <Tag className="w-4 h-4 text-primary" />
                          <span>{post.category}</span>
                        </span>
                      </div>

                      <h3 
                        onClick={() => onBlogSelect(post)}
                        className="font-display font-extrabold text-lg sm:text-xl text-secondary hover:text-primary cursor-pointer transition-colors leading-snug line-clamp-2"
                      >
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Read More button with solid line separator */}
                    <div className="pt-4 border-t border-gray-200/60">
                      <button
                        onClick={() => onBlogSelect(post)}
                        className="inline-flex items-center gap-2 text-secondary hover:text-primary font-display font-extrabold text-xs group/btn transition-colors cursor-pointer"
                        id={`blog-readmore-btn-${post.id}`}
                      >
                        <span className="uppercase tracking-wider">Read More</span>
                        <ArrowRight className="w-4 h-4 text-primary group-hover/btn:translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 3. Pagination Controls like the image: [ <- 1 2 3 -> ] */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3.5 mt-16" id="blogs-pagination">
              {/* Prev Arrow */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                  currentPage === 1
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-secondary hover:bg-secondary hover:text-white cursor-pointer"
                }`}
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-11 h-11 rounded-full font-display font-bold text-sm transition-all cursor-pointer flex items-center justify-center ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "bg-white text-secondary hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Arrow */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                  currentPage === totalPages
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-secondary hover:bg-secondary hover:text-white cursor-pointer"
                }`}
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
