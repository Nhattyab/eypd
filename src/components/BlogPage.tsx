import { useState, useMemo, useEffect } from "react";
import { DetailedBlogPost } from "../types";
import { Search, Calendar, User, MessageSquare, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "motion/react";

interface BlogPageProps {
  blogs: DetailedBlogPost[];
  onBlogSelect: (blog: DetailedBlogPost) => void;
  onBackToHome?: () => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const CATEGORIES = [
  "All",
  "News",
  "Press Releases",
  "Stories",
  "Advocacy Messages",
  "Donation",
  "Medical Care",
  "Pure Water",
  "Nutrition",
  "Education"
];

const normalizeCat = (c: string) => c.toLowerCase().trim();

const isCategoryMatch = (postCat: string, selCat: string) => {
  if (!selCat || selCat === "All") return true;
  const p = normalizeCat(postCat || "");
  const s = normalizeCat(selCat);

  if (p === s) return true;
  if (s === "news" && p.includes("news")) return true;
  if ((s === "press releases" || s === "press release") && p.includes("press")) return true;
  if ((s === "stories" || s === "story") && (p.includes("stor") || p.includes("story"))) return true;
  if ((s === "advocacy messages" || s === "advocacy") && p.includes("advoc")) return true;

  return p.includes(s) || s.includes(p);
};

export default function BlogPage({
  blogs,
  onBlogSelect,
  onBackToHome,
  selectedCategory: propCategory = "All",
  onCategoryChange
}: BlogPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(propCategory);

  useEffect(() => {
    if (propCategory) {
      setSelectedCategory(propCategory);
    }
  }, [propCategory]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (onCategoryChange) {
      onCategoryChange(cat);
    }
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (b.content && b.content.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory = isCategoryMatch(b.category, selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchTerm, selectedCategory]);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* 1. Header Banner with Breadcrumbs */}
      <section
        className="relative bg-secondary py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="about-hero-banner"
      >
        {/* Banner background photo with dark overlay */}
        <div className="absolute inset-0 z-0">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md shadow-emerald-600/10"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search journals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-gray-50/50"
            />
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any articles matching your filters. Try checking back later or create a new journal entry from the Admin Panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200/80 transition-all flex flex-col h-full group"
              >
                {/* Image overlay */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <img
                    src={post.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600"}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      By {post.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-950 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <button
                      onClick={() => onBlogSelect(post)}
                      className="inline-flex items-center gap-1.5 text-primary hover:text-emerald-700 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                      {post.comments ? post.comments.length : 0}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}