import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  User,
  Plus,
  Edit2,
  Trash2,
  FileText,
  Briefcase,
  LogOut,
  ChevronRight,
  Sparkles,
  Eye,
  CheckCircle,
  HelpCircle,
  Image as ImageIcon,
  DollarSign,
  MapPin,
  Calendar,
  X,
  CornerDownRight,
  Info,
  Upload,
  Link
} from "lucide-react";
import { Project } from "../data/projectsData";
import { DetailedBlogPost } from "../data/blogData";
import { ToastType } from "./Toast";

interface AdminPanelProps {
  onBackToHome: () => void;
  projects: Project[];
  blogs: DetailedBlogPost[];
  onUpdateProjects: (updated: Project[]) => void;
  onUpdateBlogs: (updated: DetailedBlogPost[]) => void;
  addToast: (type: ToastType, title: string, message: string) => void;
}

// Preset images to make adding items super quick and visual
const PRESET_IMAGES = [
  { label: "Healthy Food & Nutrition", url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800" },
  { label: "Clean Water & Borehole", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800" },
  { label: "Child Literacy & Education", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800" },
  { label: "Pediatric Clinical Care", url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800" },
  { label: "Community Support & Help", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800" }
];

export default function AdminPanel({
  onBackToHome,
  projects,
  blogs,
  onUpdateProjects,
  onUpdateBlogs,
  addToast
}: AdminPanelProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("charitics_admin_logged") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"projects" | "blogs">("projects");
  const [projectSearch, setProjectSearch] = useState("");
  const [blogSearch, setBlogSearch] = useState("");

  // Editor Modal States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<DetailedBlogPost | null>(null);

  // Form Field States (Project)
  const [pTitle, setPTitle] = useState("");
  const [pSubtitle, setPSubtitle] = useState("");
  const [pCategory, setPCategory] = useState<"Care" | "Medical" | "Nutrition" | "Water" | "Education">("Care");
  const [pImage, setPImage] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pLocation, setPLocation] = useState("");
  const [pDate, setPDate] = useState("");
  const [pTargetAmount, setPTargetAmount] = useState<number>(10000);
  const [pRaisedAmount, setPRaisedAmount] = useState<number>(0);
  const [pHighlighted, setPHighlighted] = useState(false);
  const [pAuthor, setPAuthor] = useState("");
  const [pTags, setPTags] = useState("");
  const [pChallengeSolution, setPChallengeSolution] = useState("");
  const [pFinalResult, setPFinalResult] = useState("");

  // Form Field States (Blog)
  const [bTitle, setBTitle] = useState("");
  const [bExcerpt, setBExcerpt] = useState("");
  const [bCategory, setBCategory] = useState("");
  const [bDate, setBDate] = useState("");
  const [bImage, setBImage] = useState("");
  const [bAuthor, setBAuthor] = useState("");
  const [bQuote, setBQuote] = useState("");
  const [bTags, setBTags] = useState("");
  const [bContentParagraphs, setBContentParagraphs] = useState("");

  // Local File Upload states
  const [pInputMode, setPInputMode] = useState<"file" | "url">("file");
  const [bInputMode, setBInputMode] = useState<"file" | "url">("file");
  const [pDragActive, setPDragActive] = useState<boolean>(false);
  const [bDragActive, setBDragActive] = useState<boolean>(false);

  // Helper for FileReader uploads
  const handleImageUpload = (file: File, type: "project" | "blog") => {
    if (!file.type.startsWith("image/")) {
      addToast("warning", "Invalid File Type", "Please select a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        if (type === "project") {
          setPImage(result);
        } else {
          setBImage(result);
        }
        addToast("success", "Image Loaded", "Your local file has been encoded and applied.");
      }
    };
    reader.onerror = () => {
      addToast("error", "Upload Failed", "Failed to read the local image file.");
    };
    reader.readAsDataURL(file);
  };

  // Handles Admin Login
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("charitics_admin_logged", "true");
      setLoginError("");
      addToast("success", "Login Successful", "Welcome back to the administrator panel.");
    } else {
      setLoginError("Invalid admin username or password. Please try again.");
      addToast("error", "Access Denied", "Please use the correct credentials displayed in the helper box.");
    }
  };

  // Handles Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("charitics_admin_logged");
    addToast("info", "Logged Out", "You have successfully closed your administration session.");
  };

  // FILTERED PROJECTS
  const filteredProjects = useMemo(() => {
    return projects.filter((p) =>
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.location.toLowerCase().includes(projectSearch.toLowerCase())
    );
  }, [projects, projectSearch]);

  // FILTERED BLOGS
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) =>
      b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(blogSearch.toLowerCase())
    );
  }, [blogs, blogSearch]);

  // OPEN PROJECT MODAL FOR ADD/EDIT
  const openProjectModal = (project: Project | null = null) => {
    if (project) {
      setEditingProject(project);
      setPTitle(project.title);
      setPSubtitle(project.subtitle || "");
      setPCategory(project.category);
      setPImage(project.image);
      setPDescription(project.description);
      setPLocation(project.location);
      setPDate(project.date || "12 July, 2026");
      setPTargetAmount(project.targetAmount);
      setPRaisedAmount(project.raisedAmount);
      setPHighlighted(!!project.highlighted);
      setPAuthor(project.author || "Admin");
      setPTags(project.tags || "");
      setPChallengeSolution(project.challengeSolution || "");
      setPFinalResult(project.finalResult || "");
    } else {
      setEditingProject(null);
      setPTitle("");
      setPSubtitle("");
      setPCategory("Care");
      setPImage(PRESET_IMAGES[0].url);
      setPDescription("");
      setPLocation("Rangpur Zoo Region");
      setPDate("11 July, 2026");
      setPTargetAmount(25000);
      setPRaisedAmount(0);
      setPHighlighted(false);
      setPAuthor("Admin");
      setPTags("Sanitation, Care");
      setPChallengeSolution("Setting up distribution structures off-grid posed critical challenges, especially regarding localized logistics and material transport.");
      setPFinalResult("The installation was successfully deployed, serving hundreds of individuals and improving water-borne safety by 40%.");
    }
    setIsProjectModalOpen(true);
  };

  // SAVE PROJECT HANDLER (ADD / EDIT)
  const handleSaveProject = (e: FormEvent) => {
    e.preventDefault();
    if (!pTitle.trim() || !pDescription.trim() || !pLocation.trim()) {
      addToast("warning", "Missing Fields", "Please populate all mandatory fields.");
      return;
    }

    if (editingProject) {
      // EDIT
      const updated = projects.map((p) => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            title: pTitle,
            subtitle: pSubtitle,
            category: pCategory,
            image: pImage,
            description: pDescription,
            location: pLocation,
            date: pDate,
            targetAmount: Number(pTargetAmount),
            raisedAmount: Number(pRaisedAmount),
            highlighted: pHighlighted,
            author: pAuthor,
            tags: pTags,
            challengeSolution: pChallengeSolution,
            finalResult: pFinalResult
          };
        }
        return p;
      });
      onUpdateProjects(updated);
      addToast("success", "Project Updated", `"${pTitle}" has been updated successfully.`);
    } else {
      // ADD NEW
      const newProject: Project = {
        id: `project-${Date.now()}`,
        title: pTitle,
        subtitle: pSubtitle,
        category: pCategory,
        image: pImage,
        colSpan: "lg:col-span-4 md:col-span-5", // default
        aspectRatio: "aspect-[4/5]",
        description: pDescription,
        location: pLocation,
        date: pDate,
        targetAmount: Number(pTargetAmount),
        raisedAmount: Number(pRaisedAmount),
        highlighted: pHighlighted,
        author: pAuthor,
        tags: pTags,
        challengeSolution: pChallengeSolution,
        finalResult: pFinalResult
      };
      onUpdateProjects([newProject, ...projects]);
      addToast("success", "Project Created", `"${pTitle}" was successfully launched.`);
    }
    setIsProjectModalOpen(false);
  };

  // DELETE PROJECT
  const handleDeleteProject = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete project: "${name}"? This action cannot be undone.`)) {
      const updated = projects.filter((p) => p.id !== id);
      onUpdateProjects(updated);
      addToast("success", "Project Deleted", `"${name}" was successfully deleted from campaigns.`);
    }
  };

  // OPEN BLOG MODAL FOR ADD/EDIT
  const openBlogModal = (blog: DetailedBlogPost | null = null) => {
    if (blog) {
      setEditingBlog(blog);
      setBTitle(blog.title);
      setBExcerpt(blog.excerpt);
      setBCategory(blog.category);
      setBDate(blog.date);
      setBImage(blog.image);
      setBAuthor(blog.author);
      setBQuote(blog.quote || "");
      setBTags(blog.tags ? blog.tags.join(", ") : "");
      setBContentParagraphs(blog.content ? blog.content.join("\n\n") : "");
    } else {
      setEditingBlog(null);
      setBTitle("");
      setBExcerpt("");
      setBCategory("Charity");
      setBDate("11 July");
      setBImage(PRESET_IMAGES[2].url);
      setBAuthor("Admin");
      setBQuote("Every contribution, no matter the size, represents a step toward universal human dignity and access.");
      setBTags("Education, Giving");
      setBContentParagraphs(
        "Access to basic education unlocks hours of growth and keeps community youth in clean, productive environments.\n\nOur field volunteers have established localized training spaces where interactive tools help children acquire essential computational skills."
      );
    }
    setIsBlogModalOpen(true);
  };

  // SAVE BLOG HANDLER (ADD / EDIT)
  const handleSaveBlog = (e: FormEvent) => {
    e.preventDefault();
    if (!bTitle.trim() || !bExcerpt.trim() || !bContentParagraphs.trim()) {
      addToast("warning", "Missing Fields", "Please populate all mandatory fields.");
      return;
    }

    const paragraphs = bContentParagraphs
      .split("\n\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const tagArray = bTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingBlog) {
      // EDIT
      const updated = blogs.map((b) => {
        if (b.id === editingBlog.id) {
          return {
            ...b,
            title: bTitle,
            excerpt: bExcerpt,
            category: bCategory,
            date: bDate,
            image: bImage,
            author: bAuthor,
            quote: bQuote,
            tags: tagArray,
            content: paragraphs
          };
        }
        return b;
      });
      onUpdateBlogs(updated);
      addToast("success", "Blog Post Updated", `"${bTitle}" has been saved.`);
    } else {
      // ADD NEW
      const newBlog: DetailedBlogPost = {
        id: `blog-${Date.now()}`,
        title: bTitle,
        excerpt: bExcerpt,
        category: bCategory,
        date: bDate,
        image: bImage,
        author: bAuthor,
        quote: bQuote,
        tags: tagArray,
        content: paragraphs,
        comments: []
      };
      onUpdateBlogs([newBlog, ...blogs]);
      addToast("success", "Blog Post Published", `"${bTitle}" is now live in editorial journals.`);
    }
    setIsBlogModalOpen(false);
  };

  // DELETE BLOG POST
  const handleDeleteBlog = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete blog: "${name}"?`)) {
      const updated = blogs.filter((b) => b.id !== id);
      onUpdateBlogs(updated);
      addToast("success", "Blog Post Deleted", `"${name}" was successfully removed.`);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-24 text-[#0a1118]" id="admin-view-root">
      
      {/* CASE A: LOGIN SCREEN */}
      {!isAuthenticated ? (
        <section className="py-20 flex items-center justify-center px-4" id="admin-login-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl space-y-8 relative"
          >
            {/* Login Header Accent */}
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-[#ff5e14]/10 text-[#ff5e14] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-black text-[#0a1118]">
                Admin Portal
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-sans">
                Sign in to manage active NGO campaigns and news articles.
              </p>
            </div>

            {/* Hint Box (Extremely helpful for preview/testing!) */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex gap-3 text-amber-900 text-xs font-sans leading-relaxed">
              <Sparkles className="w-4 h-4 text-[#ff5e14] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#ff5e14] block mb-1">Quick Evaluation Hint</span>
                Use username <strong className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">admin</strong> and password <strong className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">admin123</strong> to log in instantly.
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5" id="login-form">
              {loginError && (
                <div className="text-xs text-red-600 font-semibold bg-red-50 border border-red-200 p-3 rounded-xl">
                  {loginError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-gray-200 rounded-2xl pl-11 pr-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e14]/15 focus:border-[#ff5e14] font-sans"
                    id="login-username"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="Enter admin123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-gray-200 rounded-2xl pl-11 pr-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5e14]/15 focus:border-[#ff5e14] font-sans"
                    id="login-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0a1118] hover:bg-[#ff5e14] text-white font-display font-bold text-sm py-4 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group shadow-md"
                id="login-submit-btn"
              >
                <span>Access Dashboard</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Back button */}
            <div className="text-center pt-2">
              <button
                onClick={onBackToHome}
                className="text-xs font-display font-bold text-gray-400 hover:text-[#ff5e14] transition-colors"
              >
                ← Return to Public Website
              </button>
            </div>
          </motion.div>
        </section>
      ) : (
        /* CASE B: FULL ADMIN DASHBOARD */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id="admin-dashboard-container">
          
          {/* Dashboard Header */}
          <div className="bg-[#0a1118] text-white rounded-[32px] p-6 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-5 pointer-events-none">
              <Sparkles className="w-full h-full text-white" />
            </div>
            
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 text-xs font-display font-bold text-[#ff5e14] uppercase tracking-widest">
                <CheckCircle className="w-4 h-4 fill-[#ff5e14] text-white" />
                <span>Authorized Management Portal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight">
                Charitics Executive Terminal
              </h1>
              <p className="text-sm text-gray-300 max-w-xl font-sans">
                Welcome back, Administrator. Real-time controls to deploy emergency funding campaigns and news diaries.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
              <button
                onClick={onBackToHome}
                className="bg-white/10 hover:bg-white/15 text-white font-display font-bold text-xs px-5 py-3 rounded-full transition-all"
                id="dashboard-back-btn"
              >
                Public Website
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-display font-bold text-xs px-5 py-3 rounded-full flex items-center gap-2 transition-all"
                id="dashboard-logout-btn"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="admin-quick-stats">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex items-center gap-5">
              <div className="w-12 h-12 bg-[#ff5e14]/10 rounded-2xl flex items-center justify-center text-[#ff5e14] shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Total Campaigns</span>
                <span className="text-2xl font-display font-black text-secondary">{projects.length} Active</span>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">News Diaries</span>
                <span className="text-2xl font-display font-black text-secondary">{blogs.length} Published</span>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex items-center gap-5">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block">Aggregated Goal</span>
                <span className="text-2xl font-display font-black text-secondary">
                  ${projects.reduce((acc, p) => acc + p.targetAmount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Tab Selection Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200/60 pb-5">
            <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-gray-200/50 shadow-xs">
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs transition-all ${
                  activeTab === "projects"
                    ? "bg-[#0a1118] text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                id="tab-select-projects"
              >
                <Briefcase className="w-4 h-4" />
                <span>Campaigns ({projects.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("blogs")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs transition-all ${
                  activeTab === "blogs"
                    ? "bg-[#0a1118] text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                id="tab-select-blogs"
              >
                <FileText className="w-4 h-4" />
                <span>Editorial Blogs ({blogs.length})</span>
              </button>
            </div>

            {/* Action buttons depending on tab */}
            {activeTab === "projects" ? (
              <button
                onClick={() => openProjectModal(null)}
                className="bg-[#ff5e14] hover:bg-[#ff5e14]/90 text-white font-display font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 shadow-md transition-all self-stretch sm:self-auto cursor-pointer"
                id="add-project-btn"
              >
                <Plus className="w-4 h-4" />
                <span>Deploy New Campaign</span>
              </button>
            ) : (
              <button
                onClick={() => openBlogModal(null)}
                className="bg-[#ff5e14] hover:bg-[#ff5e14]/90 text-white font-display font-bold text-xs px-6 py-3 rounded-full flex items-center gap-2 shadow-md transition-all self-stretch sm:self-auto cursor-pointer"
                id="add-blog-btn"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Blog Post</span>
              </button>
            )}
          </div>

          {/* TAB CONTENT: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6" id="projects-management-view">
              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Filter campaigns by title, category, or location..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                  id="search-projects-control"
                />
              </div>

              {/* Projects Grid */}
              {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-[32px] p-12 text-center text-gray-400 border border-dashed border-gray-200 space-y-2">
                  <Briefcase className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-sm font-semibold">No active projects found.</p>
                  <p className="text-xs text-gray-400">Try modifying your search or click "Deploy New Campaign" to add one.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="admin-projects-grid">
                  {filteredProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white rounded-[32px] border border-gray-100 p-6 flex gap-5 hover:shadow-md transition-all relative group overflow-hidden"
                      id={`manage-project-card-${proj.id}`}
                    >
                      {/* Flag for Highlighted */}
                      {proj.highlighted && (
                        <span className="absolute top-0 right-0 bg-[#ff5e14] text-white text-[9px] font-display font-extrabold uppercase px-3.5 py-1 rounded-bl-2xl shadow-sm tracking-wider">
                          Featured
                        </span>
                      )}

                      {/* Image Preview */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200/50">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col justify-between flex-1 min-w-0 space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-display font-extrabold text-[#ff5e14] uppercase tracking-wider">
                            <span>{proj.category}</span>
                            <span>•</span>
                            <span className="text-gray-400 font-sans font-normal lowercase">{proj.location}</span>
                          </div>
                          <h3 className="font-display font-bold text-base text-[#0a1118] truncate pr-10">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-2 pr-4 leading-relaxed">
                            {proj.description}
                          </p>
                        </div>

                        {/* Budget progress */}
                        <div className="space-y-1 pr-4">
                          <div className="flex justify-between text-[10px] font-sans text-gray-500">
                            <span>Raised: ${proj.raisedAmount.toLocaleString()}</span>
                            <span className="font-bold">Goal: ${proj.targetAmount.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#ff5e14] h-full"
                              style={{ width: `${Math.min(100, (proj.raisedAmount / proj.targetAmount) * 100)}%` }}
                            />
                          </div>
                        </div>

                        {/* Actions row */}
                        <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                          <button
                            onClick={() => openProjectModal(proj)}
                            className="text-[#ff5e14] hover:bg-[#ff5e14]/5 rounded-lg px-3 py-1.5 text-xs font-display font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
                            id={`edit-project-btn-${proj.id}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Modify</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            className="text-red-500 hover:bg-red-50 rounded-lg px-3 py-1.5 text-xs font-display font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                            id={`delete-project-btn-${proj.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Discard</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: BLOGS */}
          {activeTab === "blogs" && (
            <div className="space-y-6" id="blogs-management-view">
              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Filter blog posts by title, category, or author..."
                  value={blogSearch}
                  onChange={(e) => setBlogSearch(e.target.value)}
                  className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-2.5 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                  id="search-blogs-control"
                />
              </div>

              {/* Blogs List */}
              {filteredBlogs.length === 0 ? (
                <div className="bg-white rounded-[32px] p-12 text-center text-gray-400 border border-dashed border-gray-200 space-y-2">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="text-sm font-semibold">No blog posts found.</p>
                  <p className="text-xs text-gray-400">Try adjusting your search criteria or write a new public journal diary.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="admin-blogs-grid">
                  {filteredBlogs.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-[32px] border border-gray-100 p-6 flex gap-5 hover:shadow-md transition-all relative group"
                      id={`manage-blog-card-${post.id}`}
                    >
                      {/* Image Preview */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200/50">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col justify-between flex-1 min-w-0 space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-display font-extrabold text-[#ff5e14] uppercase tracking-wider">
                            <span>{post.category}</span>
                            <span>•</span>
                            <span className="text-gray-400 font-sans font-normal lowercase">By {post.author}</span>
                          </div>
                          <h3 className="font-display font-bold text-base text-[#0a1118] truncate pr-4">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-2 pr-4 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Date info */}
                        <div className="text-[10px] font-mono text-gray-400">
                          Published: {post.date}
                        </div>

                        {/* Actions row */}
                        <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                          <button
                            onClick={() => openBlogModal(post)}
                            className="text-[#ff5e14] hover:bg-[#ff5e14]/5 rounded-lg px-3 py-1.5 text-xs font-display font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
                            id={`edit-blog-btn-${post.id}`}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Modify</span>
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(post.id, post.title)}
                            className="text-red-500 hover:bg-red-50 rounded-lg px-3 py-1.5 text-xs font-display font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto"
                            id={`delete-blog-btn-${post.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Discard</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ----------------- MODAL SECTION ----------------- */}

      {/* 1. PROJECT CREATION / MODIFICATION MODAL */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="project-form-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProjectModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-gray-100"
            >
              {/* Header */}
              <div className="bg-[#0a1118] text-white p-6 flex items-center justify-between border-b border-white/5">
                <div>
                  <h2 className="text-xl font-display font-black">
                    {editingProject ? "Modify Campaign Settings" : "Deploy New Funding Campaign"}
                  </h2>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">
                    Fill in detailed operational structures for this humanitarian program.
                  </p>
                </div>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/15 text-white/80 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
                
                {/* 1. Row: Title & Subtitle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <span>Campaign Title *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Clean Safe Drinking Water"
                      value={pTitle}
                      onChange={(e) => setPTitle(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subtitle / Short Hook</label>
                    <input
                      type="text"
                      placeholder="e.g. Solar Wells & Sand Filtration"
                      value={pSubtitle}
                      onChange={(e) => setPSubtitle(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                </div>

                {/* 2. Row: Category & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Operational Pillar *</label>
                    <select
                      value={pCategory}
                      onChange={(e) => setPCategory(e.target.value as any)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    >
                      <option value="Care">Care & Shelter</option>
                      <option value="Medical">Medical Treatment</option>
                      <option value="Nutrition">Nutrition & Meals</option>
                      <option value="Water">Pure Water Supply</option>
                      <option value="Education">Quality Education</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Regional Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mek'ele Foothills, Ethiopia"
                      value={pLocation}
                      onChange={(e) => setPLocation(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                </div>

                {/* 3. Row: Date & Author */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Launch Date</label>
                    <input
                      type="text"
                      placeholder="e.g. 11 July, 2026"
                      value={pDate}
                      onChange={(e) => setPDate(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Field Coordinator / Author</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Athena Jones"
                      value={pAuthor}
                      onChange={(e) => setPAuthor(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                </div>

                {/* 4. Row: Target Amount & Raised Amount */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Required Funding ($ USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                      <input
                        type="number"
                        required
                        min={100}
                        value={pTargetAmount}
                        onChange={(e) => setPTargetAmount(Number(e.target.value))}
                        className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl pl-8 pr-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Initially Gathered ($ USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                      <input
                        type="number"
                        min={0}
                        value={pRaisedAmount}
                        onChange={(e) => setPRaisedAmount(Number(e.target.value))}
                        className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl pl-8 pr-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Row: Image Selection */}
                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Campaign Image *</label>
                    <div className="flex gap-1.5 p-1 bg-gray-100 rounded-xl text-[10px] font-display font-bold">
                      <button
                        type="button"
                        onClick={() => setPInputMode("file")}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          pInputMode === "file"
                            ? "bg-white text-[#0a1118] shadow-xs"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        Local File
                      </button>
                      <button
                        type="button"
                        onClick={() => setPInputMode("url")}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          pInputMode === "url"
                            ? "bg-white text-[#0a1118] shadow-xs"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        Web URL & Presets
                      </button>
                    </div>
                  </div>

                  {pInputMode === "file" ? (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setPDragActive(true);
                      }}
                      onDragLeave={() => setPDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setPDragActive(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleImageUpload(e.dataTransfer.files[0], "project");
                        }
                      }}
                      className={`border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden ${
                        pDragActive
                          ? "border-[#ff5e14] bg-[#ff5e14]/5"
                          : pImage
                          ? "border-emerald-200 bg-emerald-50/10 hover:border-[#ff5e14]"
                          : "border-gray-200 bg-[#f8f9fa] hover:border-[#ff5e14]"
                      }`}
                      onClick={() => document.getElementById("project-file-input")?.click()}
                    >
                      <input
                        type="file"
                        id="project-file-input"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0], "project");
                          }
                        }}
                      />
                      {pImage ? (
                        <div className="space-y-4 w-full">
                          <div className="relative w-full max-w-xs h-36 mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm animate-fade-in">
                            <img
                              src={pImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white text-xs font-bold font-sans">Click to replace</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 font-sans flex items-center justify-center gap-1.5">
                            {pImage.startsWith("data:") ? (
                              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Local Image Loaded
                              </span>
                            ) : (
                              <span className="font-semibold text-[#ff5e14] flex items-center gap-1">
                                <Link className="w-3.5 h-3.5" /> Web URL Loaded
                              </span>
                            )}
                            <span>• Click area to change</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 py-4">
                          <div className="w-12 h-12 bg-[#ff5e14]/10 rounded-full flex items-center justify-center text-[#ff5e14] mx-auto animate-pulse">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-[#0a1118]">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">
                              PNG, JPG, JPEG or WEBP (Images under 1.5MB recommended)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="url"
                        placeholder="Enter Unsplash image link or choose preset below"
                        value={pImage.startsWith("data:") ? "" : pImage}
                        onChange={(e) => setPImage(e.target.value)}
                        className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                      />
                      {/* Preset quick buttons */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {PRESET_IMAGES.map((img) => (
                          <button
                            key={img.label}
                            type="button"
                            onClick={() => {
                              setPImage(img.url);
                              addToast("info", "Asset Selected", `Loaded image template for: ${img.label}`);
                            }}
                            className={`text-[10px] font-display font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                              pImage === img.url
                                ? "bg-[#ff5e14] text-white border-[#ff5e14]"
                                : "bg-white text-gray-500 border-gray-200 hover:border-[#ff5e14]"
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. Fields: Main Description & Short Tags */}
                <div className="grid grid-cols-1 gap-5 border-t border-gray-100 pt-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Description Overview *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the campaign mission, targeted families, and localized solutions..."
                      value={pDescription}
                      onChange={(e) => setPDescription(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl p-4 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans resize-none"
                    ></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Pure Water, Family, Emergency Support"
                      value={pTags}
                      onChange={(e) => setPTags(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                </div>

                {/* 7. Advanced details: Challenge & Solution, Final Result */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-gray-100 pt-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Logistics Challenge & Solution</label>
                    <textarea
                      rows={3}
                      placeholder="What roadblocks did your team face, and how were they solved?..."
                      value={pChallengeSolution}
                      onChange={(e) => setPChallengeSolution(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl p-4 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans resize-none"
                    ></textarea>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Measurable Final Outcome</label>
                    <textarea
                      rows={3}
                      placeholder="What was the lasting result or percentage metric upgrade?..."
                      value={pFinalResult}
                      onChange={(e) => setPFinalResult(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl p-4 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Featured checkbox */}
                <div className="flex items-center gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="highlighted-toggle"
                    checked={pHighlighted}
                    onChange={(e) => setPHighlighted(e.target.checked)}
                    className="w-4.5 h-4.5 text-[#ff5e14] rounded-sm focus:ring-[#ff5e14]/20 border-gray-300"
                  />
                  <label htmlFor="highlighted-toggle" className="text-xs font-display font-extrabold text-secondary uppercase tracking-wide cursor-pointer">
                    Feature on Frontpage Hero Highlights
                  </label>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-display font-bold text-xs px-5 py-3 rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#ff5e14] hover:bg-[#ff5e14]/90 text-white font-display font-bold text-xs px-6 py-3 rounded-full shadow-md transition-colors cursor-pointer"
                  >
                    {editingProject ? "Apply Updates" : "Deploy Active Campaign"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. BLOG CREATION / MODIFICATION MODAL */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="blog-form-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBlogModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-gray-100"
            >
              {/* Header */}
              <div className="bg-[#0a1118] text-white p-6 flex items-center justify-between border-b border-white/5">
                <div>
                  <h2 className="text-xl font-display font-black">
                    {editingBlog ? "Modify Journal Article" : "Compose New Public Editorial Journal"}
                  </h2>
                  <p className="text-xs text-gray-400 font-sans mt-0.5">
                    Publish impact reports, transparency diaries, or field announcements.
                  </p>
                </div>
                <button
                  onClick={() => setIsBlogModalOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/15 text-white/80 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <form onSubmit={handleSaveBlog} className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
                
                {/* 1. Row: Title & Author */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Article Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Unlocking Potential: The Water Connection"
                      value={bTitle}
                      onChange={(e) => setBTitle(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Author Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Esther Howard"
                      value={bAuthor}
                      onChange={(e) => setBAuthor(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                </div>

                {/* 2. Row: Category & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category Category *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sanitation, Nutrition, Charity"
                      value={bCategory}
                      onChange={(e) => setBCategory(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Publish Date Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. 11 July, 15 Dec"
                      value={bDate}
                      onChange={(e) => setBDate(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                    />
                  </div>
                </div>

                {/* 3. Row: Image selection */}
                <div className="space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Cover Image *</label>
                    <div className="flex gap-1.5 p-1 bg-gray-100 rounded-xl text-[10px] font-display font-bold">
                      <button
                        type="button"
                        onClick={() => setBInputMode("file")}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          bInputMode === "file"
                            ? "bg-white text-[#0a1118] shadow-xs"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        Local File
                      </button>
                      <button
                        type="button"
                        onClick={() => setBInputMode("url")}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          bInputMode === "url"
                            ? "bg-white text-[#0a1118] shadow-xs"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        Web URL & Presets
                      </button>
                    </div>
                  </div>

                  {bInputMode === "file" ? (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setBDragActive(true);
                      }}
                      onDragLeave={() => setBDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setBDragActive(false);
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleImageUpload(e.dataTransfer.files[0], "blog");
                        }
                      }}
                      className={`border-2 border-dashed rounded-2xl p-6 transition-all flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden ${
                        bDragActive
                          ? "border-[#ff5e14] bg-[#ff5e14]/5"
                          : bImage
                          ? "border-emerald-200 bg-emerald-50/10 hover:border-[#ff5e14]"
                          : "border-gray-200 bg-[#f8f9fa] hover:border-[#ff5e14]"
                      }`}
                      onClick={() => document.getElementById("blog-file-input")?.click()}
                    >
                      <input
                        type="file"
                        id="blog-file-input"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0], "blog");
                          }
                        }}
                      />
                      {bImage ? (
                        <div className="space-y-4 w-full">
                          <div className="relative w-full max-w-xs h-36 mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm animate-fade-in">
                            <img
                              src={bImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <p className="text-white text-xs font-bold font-sans">Click to replace</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 font-sans flex items-center justify-center gap-1.5">
                            {bImage.startsWith("data:") ? (
                              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Local Image Loaded
                              </span>
                            ) : (
                              <span className="font-semibold text-[#ff5e14] flex items-center gap-1">
                                <Link className="w-3.5 h-3.5" /> Web URL Loaded
                              </span>
                            )}
                            <span>• Click area to change</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 py-4">
                          <div className="w-12 h-12 bg-[#ff5e14]/10 rounded-full flex items-center justify-center text-[#ff5e14] mx-auto animate-pulse">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-[#0a1118]">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">
                              PNG, JPG, JPEG or WEBP (Images under 1.5MB recommended)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="url"
                        placeholder="Enter Unsplash image link or choose preset below"
                        value={bImage.startsWith("data:") ? "" : bImage}
                        onChange={(e) => setBImage(e.target.value)}
                        className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                      />
                      {/* Preset quick buttons */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {PRESET_IMAGES.map((img) => (
                          <button
                            key={img.label}
                            type="button"
                            onClick={() => {
                              setBImage(img.url);
                              addToast("info", "Asset Selected", `Loaded image template for: ${img.label}`);
                            }}
                            className={`text-[10px] font-display font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                              bImage === img.url
                                ? "bg-[#ff5e14] text-white border-[#ff5e14]"
                                : "bg-white text-gray-500 border-gray-200 hover:border-[#ff5e14]"
                            }`}
                          >
                            {img.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Row: Excerpt & Quote */}
                <div className="space-y-1.5 border-t border-gray-100 pt-4">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Short Abstract Excerpt *</label>
                  <input
                    type="text"
                    required
                    placeholder="Summarize the core impact topic in 1-2 lines..."
                    value={bExcerpt}
                    onChange={(e) => setBExcerpt(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Highlighted Quote</label>
                  <input
                    type="text"
                    placeholder="A strong quote that stands out in the center of the article..."
                    value={bQuote}
                    onChange={(e) => setBQuote(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                  />
                </div>

                {/* 5. Row: Tags Comma separated */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tag Keywords (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Advocacy, Clean Water, School Support"
                    value={bTags}
                    onChange={(e) => setBTags(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl px-4 py-3 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans"
                  />
                </div>

                {/* 6. Textarea: Content paragraphs (split by double newline) */}
                <div className="space-y-1.5 border-t border-gray-100 pt-4">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Full Journal Body Content *</span>
                    <span className="text-[10px] text-[#ff5e14] font-mono lowercase">Separate paragraphs using a double enter/return</span>
                  </label>
                  <textarea
                    required
                    rows={8}
                    placeholder="Type or paste full editorial content here. Use a double newline (Enter twice) to create separate paragraphs..."
                    value={bContentParagraphs}
                    onChange={(e) => setBContentParagraphs(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-gray-200/80 rounded-xl p-4 text-sm text-[#0a1118] focus:outline-none focus:border-[#ff5e14] font-sans resize-y"
                  ></textarea>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsBlogModalOpen(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-display font-bold text-xs px-5 py-3 rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#ff5e14] hover:bg-[#ff5e14]/90 text-white font-display font-bold text-xs px-6 py-3 rounded-full shadow-md transition-colors cursor-pointer"
                  >
                    {editingBlog ? "Publish Updates" : "Publish Blog Post"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}