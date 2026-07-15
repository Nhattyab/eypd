import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { 
  User, 
  Tag,
  MapPin, 
  Search, 
  Calendar, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  CornerDownRight, 
  MessageSquare, 
  Send 
} from "lucide-react";
import { 
  DetailedBlogPost, 
  categoriesWithCounts, 
  tagCloudList, 
  initialBlogs, 
} from "../data/blogData";

// @ts-ignore
import imgChildren from "../assets/images/quality_education_1782473853014.jpg";
// @ts-ignore
import imgPortrait from "../assets/images/refugee_child_portrait_1782472576507.jpg";

interface BlogDetailsPageProps {
  blog: DetailedBlogPost;
  onNavigateToBlog: (blog: DetailedBlogPost) => void;
  onBackToBlogs: () => void;
  onBackToHome: () => void;
  addToast: (type: "success" | "info" | "warning" | "error", title: string, message: string) => void;
}

export default function BlogDetailsPage({
  blog,
  onNavigateToBlog,
  onBackToBlogs,
  onBackToHome,
  addToast
}: BlogDetailsPageProps) {
  const [sidebarSearch, setSidebarSearch] = useState("");
  
  // Form States
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentSubject, setCommentSubject] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!sidebarSearch.trim()) return;
    
    // Find a blog post matching search
    const found = initialBlogs.find(b => 
      b.title.toLowerCase().includes(sidebarSearch.toLowerCase()) 
    );

    if (found) {
      onNavigateToBlog(found);
      addToast("success", "Blog Found", `Loaded: "${found.title}"`);
      setSidebarSearch("");
    } else {
      addToast("info", "No Results", `Could not find any blogs matching "${sidebarSearch}"`);
    }
  };

  const handleCategoryClick = (catName: string) => {
    // Navigate or filter blogs
    addToast("info", `Category Selected`, `Viewing posts in "${catName}" category.`);
  };

  const handleTagClick = (tag: string) => {
    addToast("info", `Tag Selected`, `Filtering articles with tag: #${tag}`);
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentEmail.trim() || !commentMessage.trim()) {
      addToast("warning", "Missing Fields", "Please fill in all required fields to post a comment.");
      return;
    }

  
    
    // Reset Form
    setCommentName("");
    setCommentEmail("");
    setCommentSubject("");
    setCommentMessage("");
  };

  // Get 3 recent posts (excluding current if possible)
  const recentPosts = initialBlogs
    .filter(b => b.id !== blog.id)
    .slice(0, 3);

  return (
    <div className="bg-transparent min-h-screen text-gray-800" id="blog-details-container">
      
      {/* 1. Page Header with Breadcrumbs */}
      <section
        className="relative bg-secondary py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="blog-details-hero-banner"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={blog.image}
            alt="Blog Details Background"
            className="w-full h-full object-cover opacity-25 filter grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111e38] via-[#10352c] to-[#0e4d2d] z-10" />
        </div>

        <div className="relative z-20 space-y-4 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            Blog Details
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-display font-bold text-gray-300">
            <button
              onClick={onBackToHome}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-primary font-black">»</span>
            <button
              onClick={onBackToBlogs}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Blogs
            </button>
            <span className="text-primary font-black">»</span>
            <span className="text-white truncate max-w-[180px] sm:max-w-xs">Blog Details</span>
          </div>
        </div>
      </section>

      {/* 2. Main Two-Column Content Layout (Sidebar LEFT, Content RIGHT) */}
      <section className="py-14 bg-white" id="blog-details-content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* ================= LEFT SIDEBAR ================= */}
            <aside className="lg:col-span-4 space-y-10" id="blog-details-sidebar">
         
              {/* Widget 2: Categories */}
              <div className="bg-[#f8f9fa] rounded-3xl p-6 sm:p-8 border border-gray-100/60 shadow-sm space-y-5">
                <h4 className="font-display font-black text-xl text-secondary pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[3px] after:bg-primary">
                  Categories
                </h4>
                <div className="space-y-3">
                  {categoriesWithCounts.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white border border-gray-100 text-left hover:border-[#ff5e14] text-secondary font-display font-bold text-sm transition-all duration-200 group hover:shadow-sm"
                    >
                      <span className="group-hover:text-[#ff5e14] transition-colors">{cat.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 py-0.5 px-2.5 rounded-full group-hover:bg-[#ff5e14]/10 group-hover:text-[#ff5e14] transition-all">
                        ({cat.count})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Widget 3: Recent Posts */}
              <div className="bg-[#f8f9fa] rounded-3xl p-6 sm:p-8 border border-gray-100/60 shadow-sm space-y-5">
                <h4 className="font-display font-black text-xl text-secondary pb-3 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[3px] after:bg-primary">
                  Recent Posts
                </h4>
                <div className="space-y-5">
                  {recentPosts.map((post) => (
                    <div 
                      key={post.id} 
                      onClick={() => {
                        onNavigateToBlog(post);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="flex gap-4 group cursor-pointer"
                    >
                      <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-display font-bold">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{post.date}</span>
                        </div>
                        <h5 className="font-display font-extrabold text-xs sm:text-sm text-secondary group-hover:text-[#ff5e14] transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* ================= RIGHT MAIN CONTENT ================= */}
            <main className="lg:col-span-8 space-y-10" id="blog-details-main-body">
              
              {/* Blog Article Core */}
              <article className="space-y-6" id="blog-article-body">
                {/* Major Image Block */}
                <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 border border-gray-100 shadow-md">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-6 text-xs sm:text-sm text-gray-500 font-display font-bold pt-2">
                  <span className="flex items-center gap-2">
                    <User className="w-4.5 h-4.5 text-primary" />
                    <span>By {blog.author}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-primary" />
                    <span>{blog.location}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Tag className="w-4.5 h-4.5 text-primary" />
                    <span>{blog.category}</span>
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-secondary leading-tight">
                  {blog.title}
                </h2>

                {/* Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                  {blog.content.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Quote */}
                <div className="border-l-4 border-[#2c6e49] pl-4 py-1.5 bg-[#fcfdfd] italic text-base sm:text-lg text-[#2c6e49] font-sans font-semibold rounded-r-lg">
                    <p>{blog.quote}</p>
                </div>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                  {blog.lastparagraph}
                </p>

                {/* Tags and Share footer row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 border-y border-gray-200 gap-4 mt-12 text-sm">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 text-secondary font-display font-black">
                    <span className="uppercase tracking-wider text-xs">Tags:</span>
                    {blog.tags.map((t, idx) => (
                      <span key={t} className="text-gray-500 font-sans font-medium text-xs sm:text-sm">
                        {t}{idx < blog.tags.length - 1 ? "  |  " : ""}
                      </span>
                    ))}
                  </div>

                  {/* Share */}
                  <div className="flex items-center gap-3 text-secondary font-display font-black">
                    <span className="uppercase tracking-wider text-xs">Share:</span>
                    <div className="flex items-center gap-2">
                      <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#ff5e14] hover:border-[#ff5e14] transition-all">
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#ff5e14] hover:border-[#ff5e14] transition-all">
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#ff5e14] hover:border-[#ff5e14] transition-all">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#ff5e14] hover:border-[#ff5e14] transition-all">
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </main>

          </div>
        </div>
      </section>

    </div>
  );
}
