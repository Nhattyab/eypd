import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  DollarSign,
  Calendar,
  MapPin,
  Maximize2,
  MessageSquare,
  CornerDownRight,
  Send
} from "lucide-react";
import { Project, ProjectComment, initialProjects } from "../data/projectsData";

interface ProjectDetailsPageProps {
  project: Project;
  onNavigateToProject: (proj: Project) => void;
  onDonateClick: () => void;
  onBackToHome: () => void;
  onBackToProjects: () => void;
  projects?: Project[];
}

export default function ProjectDetailsPage({
  project,
  onNavigateToProject,
  onDonateClick,
  onBackToHome,
  onBackToProjects,
  projects = initialProjects
}: ProjectDetailsPageProps) {
  // Find index of current project to handle slider navigation and pagination
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  
  // Comments Form State
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentSubject, setCommentSubject] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  
  // Local Comments State
  const [localComments, setLocalComments] = useState<ProjectComment[]>([]);
  const [commentCount, setCommentCount] = useState(0);

  // Sync comments when project change
  useEffect(() => {
    const comments = project.comments || [];
    setLocalComments(comments);
    
    // Count main comments + replies
    const total = comments.reduce((acc, c) => {
      return acc + 1 + (c.replies?.length || 0);
    }, 0);
    setCommentCount(total);
  }, [project]);

  // Previous/Next handlers
  const handlePrevProject = () => {
    if (projects.length === 0) return;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    onNavigateToProject(projects[prevIndex]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextProject = () => {
    if (projects.length === 0) return;
    const nextIndex = (currentIndex + 1) % projects.length;
    onNavigateToProject(projects[nextIndex]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Submit Project Comment Handler
  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentEmail.trim() || !commentMessage.trim()) {
      return;
    }

    const newComment: ProjectComment = {
      id: `proj-comment-${Date.now()}`,
      name: commentName,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?q=80&w=150`,
      date: "Just now",
      content: commentMessage,
      replies: []
    };

    const updatedComments = [...localComments, newComment];
    setLocalComments(updatedComments);
    setCommentCount(prev => prev + 1);

    // Save back to project object in memory if possible
    project.comments = updatedComments;

    // Reset Form
    setCommentName("");
    setCommentEmail("");
    setCommentSubject("");
    setCommentMessage("");
  };

  return (
    <div className="bg-white min-h-screen text-gray-800" id="project-details-page-wrapper">
      
      {/* 1. Header Banner with Breadcrumbs */}
      <section
        className="relative bg-secondary py-42 text-white flex flex-col items-center justify-center text-center overflow-hidden"
        id="project-details-hero"
      >
        {/* Banner background photo with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt="Project Details Banner Background"
            className="w-full h-full object-cover opacity-20 filter grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 to-secondary z-10" />
        </div>

        <div className="relative z-20 space-y-4 max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight">
            Project Details
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
              onClick={onBackToProjects}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Projects
            </button>
            <span className="text-primary font-black">»</span>
            <span className="text-white">Project Details</span>
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Large Main Feature Image Slider with Side Arrows Overlay */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group border border-gray-100 bg-gray-50" id="project-slider-wrapper">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[300px] sm:h-[450px] md:h-[550px] lg:h-[650px] object-cover"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle bottom dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrevProject}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-secondary hover:bg-[#478b1b] hover:text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 z-10 cursor-pointer"
            aria-label="Previous image"
            id="slider-prev-btn"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNextProject}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-secondary hover:bg-[#478b1b] hover:text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 z-10 cursor-pointer"
            aria-label="Next image"
            id="slider-next-btn"
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* 3. Primary Grid Layout: Left Content, Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-16" id="project-details-grid">
          
          {/* Left Column: Extensive Descriptive Content */}
          <div className="lg:col-span-8 space-y-10 text-left" id="project-details-content-left">
            
            {/* Main Title Block */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-secondary tracking-tight leading-[1.15]">
                {project.title}
              </h2>
              <div className="h-1 w-20 bg-[#478b1b] rounded-full" />
            </div>

            {/* Dynamic content paragraphs (adopted from blog details) */}
            <div className="space-y-8 text-sm sm:text-base text-gray-500 leading-relaxed font-sans">
              <p className="font-medium text-gray-700 text-base sm:text-lg border-b border-gray-100 pb-6">
                {project.description}
              </p>
              
              {project.content && project.content.length > 0 ? (
                project.content.map((section, index) => {
                  const title = typeof section === "object" ? section.title : undefined;
                  const text = typeof section === "object" ? section.paragraph : section;
                  return (
                    <div key={index} className="space-y-2">
                      {title && (
                        <h4 className="text-xl font-display font-black text-secondary tracking-tight mt-6">
                          {title}
                        </h4>
                      )}
                      <p className="text-gray-500 leading-relaxed">{text}</p>
                    </div>
                  );
                })
              ) : (
                <p>
                  Netus lorem rutrum arcu dignissim at sit morbi phasellus nascetur eget potenti vestibulum is cras. Tempor nonummy metus lobortis. Sociis velit etiam, dapibus. Lectus ve pellentesque a cras posuere tempor facilisi habitant lectus rutrum pede quisque hendrerit mauris ad to elementum fringilla facilisi volutpat fusce pharetra.
                </p>
              )}
            </div>

            {/* Dynamic Quote Box (adopted from blog details) */}
            {project.quote && (
              <div className="relative border-l-4 border-[#478b1b] bg-[#478b1b]/5 p-6 rounded-r-3xl my-8">
                <p className="font-display font-black text-base sm:text-lg text-secondary leading-relaxed italic">
                  "{project.quote}"
                </p>
                <div className="absolute right-6 bottom-4 text-[#478b1b] opacity-10 font-serif text-6xl pointer-events-none select-none">
                  ”
                </div>
              </div>
            )}

            {/* Action Support Block */}
            <div className="bg-emerald-50/45 rounded-3xl p-6 sm:p-8 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 flex-1">
                <h4 className="font-display font-black text-lg text-secondary">
                  Ready to back this vital initiative?
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-sans">
                  Your 100% tax-deductible donation ensures continuous operation in this district.
                </p>
              </div>
              <button
                onClick={onDonateClick}
                className="px-6 py-3 rounded-full bg-[#478b1b] hover:bg-[#3d7517] text-white font-display font-black text-xs uppercase tracking-wider transition-colors shadow-md shadow-emerald-900/10 whitespace-nowrap cursor-pointer"
              >
                Donate Now
              </button>
            </div>

            {/* Tags footer section (Adopted from blog page) */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 border-y border-gray-100 gap-4 mt-12 text-sm">
                <div className="flex flex-wrap items-center gap-2 text-secondary font-display font-black">
                  <span className="uppercase tracking-wider text-xs text-[#478b1b]">Tags:</span>
                  {project.tags.map((t, idx) => (
                    <span key={t} className="text-gray-500 font-sans font-medium text-xs sm:text-sm bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Comments Section (Adopted from blog page) */}
            <div className="space-y-8 pt-8" id="project-comments-wrapper">
              <h3 className="font-display font-black text-2xl text-secondary flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-[#478b1b]" />
                <span>
                  {String(commentCount).padStart(2, '0')} Comments
                </span>
              </h3>

              <div className="space-y-6" id="comments-list">
                {localComments.length > 0 ? (
                  localComments.map((comment) => (
                    <div key={comment.id} className="space-y-6">
                      
                      {/* Main Comment */}
                      <div className="flex gap-4 sm:gap-6 bg-gray-50/50 rounded-2xl p-5 border border-gray-100 shadow-xs">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-emerald-50">
                          <img
                            src={comment.avatar}
                            alt={comment.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div>
                              <h4 className="font-display font-black text-[#478b1b] text-sm sm:text-base leading-none">
                                {comment.name}
                              </h4>
                              <span className="text-[11px] text-gray-400 font-sans font-semibold mt-1 block">
                                {comment.date}
                              </span>
                            </div>
                            <button className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-[#478b1b] font-display font-bold border border-gray-200 hover:border-[#478b1b]/20 rounded-full py-1 px-3 bg-white transition-all self-start sm:self-auto cursor-pointer">
                              <CornerDownRight className="w-3.5 h-3.5" />
                              <span>Reply</span>
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                            {comment.content}
                          </p>
                        </div>
                      </div>

                      {/* Nested Reply */}
                      {comment.replies && comment.replies.map((reply) => (
                        <div key={reply.id} className="pl-8 sm:pl-16 relative">
                          <div className="absolute top-0 bottom-0 left-4 sm:left-8 w-[2px] bg-gray-100 border-dashed" />
                          <div className="flex gap-4 sm:gap-6 bg-gray-50/30 rounded-2xl p-5 border border-gray-100 shadow-xs relative">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-emerald-50">
                              <img
                                src={reply.avatar}
                                alt={reply.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="space-y-2 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <div>
                                  <h4 className="font-display font-black text-[#478b1b] text-xs sm:text-sm leading-none">
                                    {reply.name}
                                  </h4>
                                  <span className="text-[10px] text-gray-400 font-sans font-semibold mt-1 block">
                                    {reply.date}
                                  </span>
                                </div>
                                <button className="inline-flex items-center gap-1.5 text-[10px] text-secondary hover:text-[#478b1b] font-display font-bold border border-gray-200 hover:border-[#478b1b]/20 rounded-full py-0.5 px-2.5 bg-white transition-all self-start sm:self-auto cursor-pointer">
                                  <CornerDownRight className="w-3 h-3" />
                                  <span>Reply</span>
                                </button>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                                {reply.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 italic">No comments posted yet. Be the first to leave a thought!</p>
                )}
              </div>

              {/* Leave a Comment form (Adopted from blog page) */}
              <div className="bg-[#f8f9fa] rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6" id="leave-comment-form">
                <div className="space-y-1">
                  <h3 className="font-display font-black text-2xl text-secondary">
                    Leave a Comment
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-sans font-medium">
                    Your email address will not be published. Required fields are marked *
                  </p>
                </div>

                <form onSubmit={handleCommentSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-[#478b1b]/15 focus:border-[#478b1b] placeholder-gray-400 font-sans shadow-xs"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-[#478b1b]/15 focus:border-[#478b1b] placeholder-gray-400 font-sans shadow-xs"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Subject"
                    value={commentSubject}
                    onChange={(e) => setCommentSubject(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-[#478b1b]/15 focus:border-[#478b1b] placeholder-gray-400 font-sans shadow-xs"
                  />

                  <textarea
                    required
                    rows={6}
                    placeholder="Type your message"
                    value={commentMessage}
                    onChange={(e) => setCommentMessage(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-[#478b1b]/15 focus:border-[#478b1b] placeholder-gray-400 font-sans shadow-xs resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-between gap-4 bg-secondary hover:bg-[#122234] text-white font-display font-bold text-sm rounded-xl py-4 px-7 transition-all cursor-pointer shadow-md group"
                  >
                    <span>Post Comment</span>
                    <span className="w-5 h-5 rounded-full bg-white text-secondary flex items-center justify-center group-hover:bg-[#478b1b] group-hover:text-white transition-all">
                      <Send className="w-3 h-3 rotate-45 shrink-0" />
                    </span>
                  </button>
                </form>
              </div>

            </div>

          </div>

          {/* Right Column: Beautiful Project Information Sidebar */}
          <div className="lg:col-span-4" id="project-details-sidebar">
            <div className="bg-secondary text-white p-8 sm:p-10 rounded-[2rem] shadow-xl space-y-8 relative overflow-hidden" id="info-sidebar-card">
              
              {/* Subtle design ambient blur */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#478b1b]/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="font-display font-black text-2xl text-white tracking-tight border-b border-white/10 pb-5" id="info-sidebar-title">
                Project Information
              </h3>

              {/* Information Row List */}
              <div className="space-y-5 font-display" id="info-rows-list">
                
                {/* Category Row */}
                <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5">
                  <span className="text-xs text-gray-400 font-black uppercase tracking-wider">Category</span>
                  <span className="text-xs text-gray-400 font-black uppercase tracking-wider mr-2">:</span>
                  <span className="text-sm font-bold text-white text-right flex-1">{project.category}</span>
                </div>

                {/* Author Row */}
                <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5">
                  <span className="text-xs text-gray-400 font-black uppercase tracking-wider">Author</span>
                  <span className="text-xs text-gray-400 font-black uppercase tracking-wider mr-2">:</span>
                  <span className="text-sm font-bold text-white text-right flex-1">{project.author}</span>
                </div>

                {/* Tags Row */}
                <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5">
                  <span className="text-xs text-gray-400 font-black uppercase tracking-wider">Tags</span>
                  <span className="text-xs text-gray-400 font-black uppercase tracking-wider mr-2">:</span>
                  <span className="text-sm font-bold text-white text-right flex-1">
                    {Array.isArray(project.tags) ? project.tags.join(", ") : project.tags}
                  </span>
                </div>


                {/* Date Row */}
                <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5">
                  <span className="text-xs text-gray-400 font-black uppercase tracking-wider">Date</span>
                  <span className="text-xs text-gray-400 font-black uppercase tracking-wider mr-2">:</span>
                  <span className="text-sm font-bold text-white text-right flex-1">{project.date}</span>
                </div>

              </div>

              {/* Social Follow Icons exactly matching mockup style */}
              <div className="flex items-center gap-3 pt-4" id="sidebar-socials">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#478b1b] hover:border-[#478b1b] hover:bg-white/5 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#478b1b] hover:border-[#478b1b] hover:bg-white/5 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#478b1b] hover:border-[#478b1b] hover:bg-white/5 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#478b1b] hover:border-[#478b1b] hover:bg-white/5 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* 4. Elegant Bottom Pagination Control Bar */}
        <div className="mt-16 pt-10 border-t border-gray-100 flex items-center justify-between" id="project-pagination-row">
          
          {/* Previous Project Button */}
          <button
            onClick={handlePrevProject}
            className="flex items-center gap-3.5 group text-left transition-all duration-200 text-secondary cursor-pointer"
            id="prev-project-pagination-btn"
          >
            <span className="w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center group-hover:bg-[#478b1b] group-hover:scale-105 transition-all duration-300 shadow-md">
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </span>
            <div className="hidden sm:block">
              <span className="block text-[11px] uppercase tracking-wider font-sans text-gray-400 font-bold">
                Previous Project
              </span>
              <span className="block text-sm font-display font-black text-secondary group-hover:text-[#478b1b] transition-colors">
                {projects.length > 0 ? projects[(currentIndex - 1 + projects.length) % projects.length].title : ""}
              </span>
            </div>
            <span className="sm:hidden text-xs font-display font-black uppercase tracking-wider group-hover:text-[#478b1b]">
              Prev Project
            </span>
          </button>

          {/* Next Project Button */}
          <button
            onClick={handleNextProject}
            className="flex items-center gap-3.5 group text-right transition-all duration-200 text-secondary cursor-pointer"
            id="next-project-pagination-btn"
          >
            <div className="hidden sm:block">
              <span className="block text-[11px] uppercase tracking-wider font-sans text-gray-400 font-bold">
                Next Project
              </span>
              <span className="block text-sm font-display font-black text-secondary group-hover:text-[#478b1b] transition-colors">
                {projects.length > 0 ? projects[(currentIndex + 1) % projects.length].title : ""}
              </span>
            </div>
            <span className="sm:hidden text-xs font-display font-black uppercase tracking-wider group-hover:text-[#478b1b]">
              Next Project
            </span>
            <span className="w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center group-hover:bg-[#478b1b] group-hover:scale-105 transition-all duration-300 shadow-md">
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </span>
          </button>

        </div>

      </div>

    </div>
  );
}
