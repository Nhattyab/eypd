import React, { useState } from "react";
import { DetailedBlogPost, BlogComment } from "../types";
import { ArrowLeft, Calendar, User, MessageSquare, Send, Quote, Heart, Tag, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "motion/react";

interface BlogDetailsPageProps {
  blog: DetailedBlogPost;
  blogs?: DetailedBlogPost[];
  onNavigateToBlog?: (blog: DetailedBlogPost) => void;
  onBackToBlogs: () => void;
  onBackToHome?: () => void;
  addToast?: (type: "success" | "error" | "info" | "warning", title: string, message: string) => void;
  onUpdateBlogs?: (updatedBlogs: DetailedBlogPost[]) => void; // refresh in parent state
}

export default function BlogDetailsPage({
  blog,
  blogs = [],
  onNavigateToBlog,
  onBackToBlogs,
  onBackToHome,
  addToast,
  onUpdateBlogs
}: BlogDetailsPageProps) {
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    setIsSubmittingComment(true);
    try {
      const newComment: BlogComment = {
        id: `bc-${Date.now()}`,
        name: commentName.trim(),
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(commentName.trim())}`,
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: commentContent.trim(),
      };

      const res = await fetch(`/api/blogs/${blog.id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: newComment }),
      });

      if (res.ok) {
        // Successfully added comment to server. Update state.
        const updatedBlog = {
          ...blog,
          comments: [...blog.comments, newComment],
        };
        // Fetch latest blogs to refresh state
        const refreshRes = await fetch("/api/blogs");
        if (refreshRes.ok && onUpdateBlogs) {
          const freshList = await refreshRes.json();
          onUpdateBlogs(freshList);
        }
        setCommentName("");
        setCommentContent("");
      }
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Calculate category counts dynamically
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    blogs.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    
    const displayList = [
      { name: "Charity", count: counts["Charity"] || 8 },
      { name: "Crowdfunding", count: counts["Crowdfunding"] || 11 },
      { name: "Industries", count: counts["Industries"] || 18 },
      { name: "Innovations", count: counts["Innovations"] || 11 },
      { name: "Technology", count: counts["Technology"] || 7 }
    ];

    return displayList.map(cat => ({
      name: cat.name,
      count: cat.count < 10 ? `0${cat.count}` : `${cat.count}`
    }));
  }, [blogs]);

  const recentBlogs = React.useMemo(() => {
    const filtered = blogs.filter(b => b.id !== blog.id);
    return filtered.length > 0 ? filtered.slice(0, 3) : blogs.slice(0, 3);
  }, [blogs, blog]);

  const formatRecentDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        const day = d.getDate();
        const month = d.toLocaleString("en-US", { month: "short" });
        return `${day}, ${month}`;
      }
    } catch (e) {}
    return dateStr;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <section
        className="relative bg-secondary py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="project-details-hero"
      >
        {/* Banner background photo with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={blog.image}
            alt="Project Details Banner Background"
            className="w-full h-full object-cover opacity-20 filter grayscale"
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
            <span className="text-white">Blog Details</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Back navigation */}
        <button
          onClick={onBackToBlogs}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Journals
        </button>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Sidebar (order-2 on mobile, order-1 on desktop) */}
          <div className="lg:col-span-4 order-2 lg:order-1 space-y-8 lg:sticky lg:top-28 lg:self-start">
            
            {/* Categories Widget */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="relative mb-6">
                <h3 className="text-lg sm:text-xl font-black text-[#0B301D] tracking-tight">Categories</h3>
                <div className="w-10 h-[3px] bg-[#5CB815] mt-2 rounded-full" />
              </div>
              <div className="space-y-3">
                {categoryCounts.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center justify-between bg-white hover:bg-emerald-50/20 p-3.5 px-5 rounded-xl border border-gray-100 hover:border-emerald-100/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md transition-all text-sm font-extrabold text-[#0B301D] cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[#5CB815] font-black">({cat.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="relative mb-6">
                <h3 className="text-lg sm:text-xl font-black text-[#0B301D] tracking-tight">Recent Posts</h3>
                <div className="w-10 h-[3px] bg-[#5CB815] mt-2 rounded-full" />
              </div>
              <div className="space-y-5">
                {recentBlogs.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onNavigateToBlog?.(item)}
                    className="flex gap-4 items-center group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                  >
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=120"}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover bg-gray-50 border border-gray-100/80 group-hover:scale-105 transition-transform shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] text-[#5CB815] font-black block mb-1 flex items-center gap-1 uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        {formatRecentDate(item.date)}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0B301D] group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Main Content (order-1 on mobile, order-2 on desktop) */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-8">
            
            {/* Main Article Container */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 border border-gray-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              
              {/* Cover Image */}
              <div className="rounded-[1.5rem] overflow-hidden aspect-[16/10] bg-gray-100 shadow-sm border border-gray-100 mb-6">
                <img
                  src={blog.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200"}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Meta Row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-gray-500 pb-4 border-b border-gray-100">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#5CB815]" />
                  <span>By {blog.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#5CB815]" />
                  <span>{blog.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#5CB815]" />
                  <span>{blog.category}</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B301D] leading-tight mt-6 mb-4 font-display">
                {blog.title}
              </h2>

              {/* Excerpt / Subtitle */}
              {blog.excerpt && (
                <p className="text-base sm:text-lg text-gray-600 mb-6 font-medium leading-relaxed italic">
                  {blog.excerpt}
                </p>
              )}

              {/* Main Content Body */}
              <div className="prose max-w-none text-gray-600 leading-relaxed text-base space-y-6">
                {blog.content && blog.content.length > 0 ? (
                  blog.content.map((p, idx) => (
                    <React.Fragment key={idx}>
                      <p className="leading-relaxed text-gray-700">{p}</p>
                      
                      {/* Place quote beautifully after the first paragraph if there is a quote */}
                      {idx === 0 && blog.quote && (
                        <div className="my-8 pl-5 border-l-4 border-[#5CB815] italic text-[#0B301D]/90 font-bold text-base sm:text-lg leading-relaxed">
                          "{blog.quote}"
                        </div>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <p className="italic text-gray-400">No article text provided.</p>
                )}
              </div>

              {/* Bottom Section: Tags & Share */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-100 mt-10">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black text-gray-900 uppercase tracking-wider">Tags:</span>
                  {blog.tags && blog.tags.length > 0 ? (
                    blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-extrabold text-[#0B301D]/70 hover:text-[#5CB815] transition-colors"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 font-bold">#EYPD #Community</span>
                  )}
                </div>

                {/* Share Icons */}
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-black text-gray-900 uppercase tracking-wider">Share:</span>
                  <div className="flex items-center gap-2">
                    <a href="#" className="w-8 h-8 rounded-full border border-gray-100 hover:border-[#5CB815] flex items-center justify-center text-gray-400 hover:text-[#5CB815] transition-all bg-white shadow-sm hover:scale-105">
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full border border-gray-100 hover:border-[#5CB815] flex items-center justify-center text-gray-400 hover:text-[#5CB815] transition-all bg-white shadow-sm hover:scale-105">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full border border-gray-100 hover:border-[#5CB815] flex items-center justify-center text-gray-400 hover:text-[#5CB815] transition-all bg-white shadow-sm hover:scale-105">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full border border-gray-100 hover:border-[#5CB815] flex items-center justify-center text-gray-400 hover:text-[#5CB815] transition-all bg-white shadow-sm hover:scale-105">
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Comments Board Card */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 border border-gray-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <h3 className="text-2xl font-black text-[#0B301D] mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-gray-400" />
                Comments ({blog.comments ? blog.comments.length : 0})
              </h3>

              {/* Form */}
              <form onSubmit={handlePostComment} className="mb-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100/80">
                <h4 className="text-sm font-black text-gray-800 mb-4 uppercase tracking-wider">Leave a Comment</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      placeholder="Share your encouraging feedback or supportive comments..."
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmittingComment}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5CB815] hover:bg-[#4ea211] text-white text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
                    >
                      {isSubmittingComment ? "Posting..." : "Post Comment"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              {!blog.comments || blog.comments.length === 0 ? (
                <p className="text-gray-400 text-center py-6 italic">No comments yet. Be the first to share your thoughts!</p>
              ) : (
                <div className="space-y-6">
                  {blog.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <img
                        src={comment.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(comment.name)}`}
                        alt={comment.name}
                        className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-extrabold text-gray-900 text-sm">{comment.name}</span>
                          <span className="text-xs text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}