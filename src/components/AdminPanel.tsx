import React, { useState, useEffect } from "react";
import { Project, DetailedBlogPost, ProjectContentSection, ContactMessage, AppNotification } from "../types";
import {
  FolderHeart,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Upload,
  Layers,
  Heart,
  DollarSign,
  Calendar,
  MapPin,
  Tag,
  Quote,
  Loader2,
  ListPlus,
  Mail,
  Bell,
  LogOut,
  Inbox,
  Eye,
  CheckSquare
} from "lucide-react";

interface AdminPanelProps {
  projects: Project[];
  blogs: DetailedBlogPost[];
  onUpdateProjects: (updated: Project[]) => void;
  onUpdateBlogs: (updated: DetailedBlogPost[]) => void;
  addToast: (type: "success" | "error" | "info" | "warning", title: string, message: string) => void;
  onBackToHome?: () => void;
}

export default function AdminPanel({
  projects,
  blogs,
  onUpdateProjects,
  onUpdateBlogs,
  addToast,
  onBackToHome
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "blogs" | "contacts">("projects");

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("admin_authenticated") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Contact messages state
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isContactsLoading, setIsContactsLoading] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch initial notifications and contacts
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      fetchContacts();
    }
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const fetchContacts = async () => {
    setIsContactsLoading(true);
    try {
      const res = await fetch("/api/contacts");
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setIsContactsLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "admin" && password === "password") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      addToast("success", "Access Granted", "Successfully authenticated as administrator.");
      setLoginError("");
    } else {
      setLoginError("Invalid username or password. Please use standard administrator credentials.");
      addToast("error", "Authentication Failed", "Incorrect username or password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    addToast("info", "Logged Out", "You have successfully logged out of the admin console.");
  };

  const handleMarkNotificationsRead = async () => {
    try {
      const res = await fetch("/api/notifications/mark-read", { method: "POST" });
      if (res.ok) {
        fetchNotifications();
        addToast("success", "Notifications Read", "All notifications marked as read.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearNotifications = async () => {
    try {
      const res = await fetch("/api/notifications", { method: "DELETE" });
      if (res.ok) {
        fetchNotifications();
        addToast("success", "Notifications Cleared", "All notifications cleared.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkContactRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contacts/${id}/read`, { method: "POST" });
      if (res.ok) {
        fetchContacts();
        addToast("success", "Message Read", "Marked message as read.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchContacts();
        addToast("success", "Message Deleted", "Message deleted from database.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Loading/saving state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form toggles
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isBlogFormOpen, setIsBlogFormOpen] = useState(false);

  // Editing targets
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlog, setEditingBlog] = useState<DetailedBlogPost | null>(null);

  // Project Form States
  const [projTitle, setProjTitle] = useState("");
  const [projSubtitle, setProjSubtitle] = useState("");
  const [projCategory, setProjCategory] = useState("Care");
  const [projImage, setProjImage] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projLocation, setProjLocation] = useState("");
  const [projDate, setProjDate] = useState("");
  const [projTargetAmount, setProjTargetAmount] = useState<number>(10000);
  const [projRaisedAmount, setProjRaisedAmount] = useState<number>(0);
  const [projHighlighted, setProjHighlighted] = useState(false);
  const [projAuthor, setProjAuthor] = useState("Admin");
  const [projTags, setProjTags] = useState("");
  const [projQuote, setProjQuote] = useState("");
  const [projChallengeSolution, setProjChallengeSolution] = useState("");
  const [projFinalResult, setProjFinalResult] = useState("");
  const [projContentSections, setProjContentSections] = useState<ProjectContentSection[]>([]);

  // Temp Content Section input for Project
  const [tempSecTitle, setTempSecTitle] = useState("");
  const [tempSecParagraph, setTempSecParagraph] = useState("");

  // Blog Form States
  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogCategory, setBlogCategory] = useState("Donation");
  const [blogImage, setBlogImage] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("Admin");
  const [blogDate, setBlogDate] = useState("");
  const [blogQuote, setBlogQuote] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogContentParagraphs, setBlogContentParagraphs] = useState<string[]>([]);
  const [tempParagraph, setTempParagraph] = useState("");

  // Base64 helper
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "project" | "blog") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      addToast("warning", "File too large", "Please upload an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (type === "project") {
        setProjImage(base64String);
      } else {
        setBlogImage(base64String);
      }
      addToast("success", "Image Uploaded", "Thumbnail converted successfully.");
    };
    reader.readAsDataURL(file);
  };

  // Open creation forms
  const openNewProjectForm = () => {
    setEditingProject(null);
    setProjTitle("");
    setProjSubtitle("");
    setProjCategory("Care");
    setProjImage("");
    setProjDescription("");
    setProjLocation("");
    setProjDate(new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }));
    setProjTargetAmount(10000);
    setProjRaisedAmount(0);
    setProjHighlighted(false);
    setProjAuthor("Admin");
    setProjTags("");
    setProjQuote("");
    setProjChallengeSolution("");
    setProjFinalResult("");
    setProjContentSections([]);
    setTempSecTitle("");
    setTempSecParagraph("");
    setIsProjectFormOpen(true);
  };

  const openNewBlogForm = () => {
    setEditingBlog(null);
    setBlogTitle("");
    setBlogExcerpt("");
    setBlogCategory("Donation");
    setBlogImage("");
    setBlogAuthor("Admin");
    setBlogDate(new Date().toLocaleDateString("en-US", { day: "numeric", month: "short" }));
    setBlogQuote("");
    setBlogTags("");
    setBlogContentParagraphs([]);
    setTempParagraph("");
    setIsBlogFormOpen(true);
  };

  // Load project for edit
  const startEditProject = (p: Project) => {
    setEditingProject(p);
    setProjTitle(p.title);
    setProjSubtitle(p.subtitle);
    setProjCategory(p.category);
    setProjImage(p.image);
    setProjDescription(p.description);
    setProjLocation(p.location);
    setProjDate(p.date);
    setProjTargetAmount(p.targetAmount);
    setProjRaisedAmount(p.raisedAmount);
    setProjHighlighted(Boolean(p.highlighted));
    setProjAuthor(p.author);
    setProjTags(p.tags ? p.tags.join(", ") : "");
    setProjQuote(p.quote || "");
    setProjChallengeSolution(p.challengeSolution || "");
    setProjFinalResult(p.finalResult || "");
    setProjContentSections(p.content || []);
    setTempSecTitle("");
    setTempSecParagraph("");
    setIsProjectFormOpen(true);
  };

  // Load blog for edit
  const startEditBlog = (b: DetailedBlogPost) => {
    setEditingBlog(b);
    setBlogTitle(b.title);
    setBlogExcerpt(b.excerpt);
    setBlogCategory(b.category);
    setBlogImage(b.image);
    setBlogAuthor(b.author);
    setBlogDate(b.date);
    setBlogQuote(b.quote || "");
    setBlogTags(b.tags ? b.tags.join(", ") : "");
    setBlogContentParagraphs(b.content || []);
    setTempParagraph("");
    setIsBlogFormOpen(true);
  };

  // CRUD PROJECT
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) {
      addToast("warning", "Missing fields", "Campaign title is required.");
      return;
    }

    setIsSubmitting(true);
    const parsedTags = projTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectData: Project = {
      id: editingProject ? editingProject.id : `project-${Date.now()}`,
      title: projTitle.trim(),
      subtitle: projSubtitle.trim(),
      category: projCategory,
      image: projImage || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600",
      description: projDescription.trim(),
      location: projLocation.trim(),
      date: projDate.trim(),
      targetAmount: Number(projTargetAmount),
      raisedAmount: Number(projRaisedAmount),
      highlighted: projHighlighted,
      author: projAuthor.trim(),
      tags: parsedTags,
      quote: projQuote.trim(),
      challengeSolution: projChallengeSolution.trim(),
      finalResult: projFinalResult.trim(),
      content: projContentSections,
      comments: editingProject ? editingProject.comments : [],
      colSpan: editingProject?.colSpan || "lg:col-span-4 md:col-span-6",
      aspectRatio: editingProject?.aspectRatio || "aspect-square"
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        addToast(
          "success",
          editingProject ? "Campaign Updated" : "Campaign Created",
          `Successfully saved "${projTitle.trim()}" in the database.`
        );
        setIsProjectFormOpen(false);
        setEditingProject(null);
        // Refresh project list
        const refreshedRes = await fetch("/api/projects");
        if (refreshedRes.ok) {
          const freshData = await refreshedRes.json();
          onUpdateProjects(freshData);
        }
      } else {
        const err = await response.json();
        addToast("error", "Failed to save", err.error || "Database rejection.");
      }
    } catch (err: any) {
      addToast("error", "Network Error", err.message || "Could not reach database API.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Are you absolutely sure you want to delete campaign "${title}" from the database?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (response.ok) {
        addToast("success", "Campaign Deleted", `Deleted "${title}" successfully.`);
        // Refresh project list
        const refreshedRes = await fetch("/api/projects");
        if (refreshedRes.ok) {
          const freshData = await refreshedRes.json();
          onUpdateProjects(freshData);
        }
      } else {
        addToast("error", "Failed to delete", "Database refused request.");
      }
    } catch (err: any) {
      addToast("error", "Delete Error", err.message);
    }
  };

  // CRUD BLOG
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      addToast("warning", "Missing fields", "Journal title is required.");
      return;
    }

    setIsSubmitting(true);
    const parsedTags = blogTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const postData: DetailedBlogPost = {
      id: editingBlog ? editingBlog.id : `blog-${Date.now()}`,
      title: blogTitle.trim(),
      excerpt: blogExcerpt.trim(),
      category: blogCategory,
      image: blogImage || "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600",
      author: blogAuthor.trim(),
      date: blogDate.trim(),
      quote: blogQuote.trim(),
      tags: parsedTags,
      content: blogContentParagraphs,
      comments: editingBlog ? editingBlog.comments : []
    };

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        addToast(
          "success",
          editingBlog ? "Journal Updated" : "Journal Created",
          `Successfully saved "${blogTitle.trim()}" in the database.`
        );
        setIsBlogFormOpen(false);
        setEditingBlog(null);
        // Refresh blog list
        const refreshedRes = await fetch("/api/blogs");
        if (refreshedRes.ok) {
          const freshData = await refreshedRes.json();
          onUpdateBlogs(freshData);
        }
      } else {
        const err = await response.json();
        addToast("error", "Failed to save", err.error || "Database rejection.");
      }
    } catch (err: any) {
      addToast("error", "Network Error", err.message || "Could not reach database API.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    if (!window.confirm(`Are you absolutely sure you want to delete journal entry "${title}" from the database?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (response.ok) {
        addToast("success", "Journal Deleted", `Deleted "${title}" successfully.`);
        // Refresh list
        const refreshedRes = await fetch("/api/blogs");
        if (refreshedRes.ok) {
          const freshData = await refreshedRes.json();
          onUpdateBlogs(freshData);
        }
      } else {
        addToast("error", "Failed to delete", "Database refused request.");
      }
    } catch (err: any) {
      addToast("error", "Delete Error", err.message);
    }
  };

  // Content block helpers
  const addContentSection = () => {
    if (!tempSecTitle.trim() || !tempSecParagraph.trim()) return;
    setProjContentSections([
      ...projContentSections,
      { title: tempSecTitle.trim(), paragraph: tempSecParagraph.trim() }
    ]);
    setTempSecTitle("");
    setTempSecParagraph("");
  };

  const removeContentSection = (index: number) => {
    setProjContentSections(projContentSections.filter((_, i) => i !== index));
  };

  const addBlogParagraph = () => {
    if (!tempParagraph.trim()) return;
    setBlogContentParagraphs([...blogContentParagraphs, tempParagraph.trim()]);
    setTempParagraph("");
  };

  const removeBlogParagraph = (index: number) => {
    setBlogContentParagraphs(blogContentParagraphs.filter((_, i) => i !== index));
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-55 min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8" id="admin-login-container">
        <div className="max-w-md w-full bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 sm:p-10 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-500 via-[#ff5e14] to-emerald-700" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-[#ff5e14] rounded-2xl mb-2">
              <FolderHeart className="w-8 h-8 shrink-0" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-gray-900 tracking-tight">Admin Console Access</h2>
            <p className="text-sm text-gray-500">Please authenticate to manage persistent database campaigns, journals, and contact messages.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5" id="admin-login-form">
            {loginError && (
              <div className="bg-red-50 text-red-700 text-xs font-semibold p-4 rounded-2xl border border-red-100 leading-relaxed" id="login-error-msg">
                {loginError}
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-[#f8f9fa] border border-gray-200 rounded-2xl px-5 py-4 text-sm text-[#0a1118] focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 placeholder-gray-400 font-sans transition-all"
                id="login-username-input"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="e.g. password"
                className="w-full bg-[#f8f9fa] border border-gray-200 rounded-2xl px-5 py-4 text-sm text-[#0a1118] focus:outline-none focus:ring-2 focus:ring-emerald-500/15 focus:border-emerald-500 placeholder-gray-400 font-sans transition-all"
                id="login-password-input"
              />
              <span className="text-[10px] text-gray-400 block mt-1">
                Hint: Use <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-600 font-bold">admin</span> / <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-gray-600 font-bold">password</span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0a1118] hover:bg-emerald-600 text-white font-display font-bold text-sm rounded-full py-4 px-6 transition-all duration-300 cursor-pointer shadow-lg mt-2 flex items-center justify-center gap-2"
              id="login-submit-btn"
            >
              <span>Authenticate Access</span>
              <Check className="w-4 h-4" />
            </button>

            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 font-display font-semibold text-xs rounded-full py-3.5 transition-all cursor-pointer mt-2"
                id="login-back-btn"
              >
                Back to Public Site
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">
        
        {/* Panel Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-8 sm:p-10 text-white mb-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-emerald-700/10 rounded-l-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="text-emerald-300 font-bold tracking-wider uppercase text-xs block mb-2">
              Database Core Console
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Administrative Manager</h1>
            <p className="text-emerald-100/90 mt-2 text-sm sm:text-base leading-relaxed">
              Create, read, update, and delete live campaigns and journal entries. All administrative operations are written directly to the persistent SQLite3 relational database.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            {/* Notifications Button with Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white rounded-xl transition-all cursor-pointer backdrop-blur-sm shadow-sm flex items-center justify-center"
                title="Notifications"
                id="notifications-btn"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff5e14] rounded-full animate-pulse" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 text-gray-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150" id="notifications-dropdown">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">Notifications</span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleMarkNotificationsRead}
                        className="text-[10px] text-emerald-600 hover:underline font-semibold"
                      >
                        Mark all read
                      </button>
                      <span className="text-gray-300 text-[10px]">|</span>
                      <button
                        onClick={handleClearNotifications}
                        className="text-[10px] text-red-500 hover:underline font-semibold"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-xs text-gray-400">
                        No recent notifications.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          className={`px-4 py-3 text-xs flex flex-col gap-1 transition-colors text-left hover:bg-gray-50/50 cursor-pointer ${!n.read ? 'bg-emerald-50/20 font-medium' : ''}`}
                          onClick={() => {
                            if (n.type === 'contact') {
                              setActiveTab('contacts');
                              setIsProjectFormOpen(false);
                              setIsBlogFormOpen(false);
                            }
                            setShowNotifications(false);
                          }}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-bold text-gray-900 line-clamp-1">{n.title}</span>
                            <span className="text-[9px] text-gray-400 shrink-0">{n.date}</span>
                          </div>
                          <p className="text-gray-500 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white text-xs font-bold rounded-xl transition-all cursor-pointer backdrop-blur-sm shadow-sm flex items-center gap-1.5"
              title="Logout Administrative Access"
              id="admin-logout-btn"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log out</span>
            </button>

            {/* Exit Console Button */}
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="px-4 py-3 bg-white hover:bg-gray-100 text-[#0a1118] text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                id="admin-exit-btn"
              >
                Exit Console
              </button>
            )}
          </div>

        </div>

        {/* Console Nav Tabs */}
        <div className="flex border-b border-gray-200 mb-8 bg-white p-2 rounded-2xl shadow-sm">
          <button
            onClick={() => {
              setActiveTab("projects");
              setIsProjectFormOpen(false);
              setIsBlogFormOpen(false);
            }}
            className={`flex-1 sm:flex-initial py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === "projects"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <FolderHeart className="w-4 h-4" />
            Active Campaigns ({projects.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("blogs");
              setIsProjectFormOpen(false);
              setIsBlogFormOpen(false);
            }}
            className={`flex-1 sm:flex-initial py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === "blogs"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Journals & Logs ({blogs.length})
          </button>
          <button
            onClick={() => {
              setActiveTab("contacts");
              setIsProjectFormOpen(false);
              setIsBlogFormOpen(false);
              fetchContacts();
            }}
            className={`flex-1 sm:flex-initial py-3 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === "contacts"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/15"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <Inbox className="w-4 h-4" />
            Inbox Messages ({contacts.length})
            {contacts.some(c => !c.read) && (
              <span className="w-2 h-2 bg-[#ff5e14] rounded-full shrink-0" />
            )}
          </button>

        </div>

        {/* CAMPAIGNS TAB CONTENT */}
        {activeTab === "projects" && (
          <div>
            {!isProjectFormOpen ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Registered Campaigns</h2>
                    <p className="text-sm text-gray-500">Live causes shown on the causes section and details page.</p>
                  </div>
                  <button
                    onClick={openNewProjectForm}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Create Campaign
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <FolderHeart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-base font-bold text-gray-500">No campaigns found in database.</p>
                    <p className="text-xs text-gray-400 mt-1">Click &quot;Create Campaign&quot; to populate your first persistent record.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs font-extrabold text-gray-400 uppercase bg-gray-55">
                          <th className="py-4 px-4">Campaign</th>
                          <th className="py-4 px-4">Category</th>
                          <th className="py-4 px-4">Goal Amount</th>
                          <th className="py-4 px-4">Raised Amount</th>
                          <th className="py-4 px-4">Featured</th>
                          <th className="py-4 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((p) => (
                          <tr key={p.id} className="border-b border-gray-50 last:border-0 text-sm hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4 flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.title}
                                className="w-12 h-12 object-cover rounded-xl bg-gray-100"
                              />
                              <div className="max-w-xs truncate">
                                <span className="font-bold text-gray-950 block">{p.title}</span>
                                <span className="text-xs text-gray-400 block truncate">{p.subtitle}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="bg-gray-100 text-gray-700 font-semibold px-2.5 py-1 rounded-lg text-xs">
                                {p.category}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-bold text-gray-900">${p.targetAmount.toLocaleString()}</td>
                            <td className="py-4 px-4 font-bold text-emerald-600">${p.raisedAmount.toLocaleString()}</td>
                            <td className="py-4 px-4">
                              {p.highlighted ? (
                                <span className="bg-amber-50 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-100">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-gray-400 text-xs">No</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="inline-flex gap-2">
                                <button
                                  onClick={() => startEditProject(p)}
                                  className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(p.id, p.title)}
                                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              // CAMPAIGN EDIT / CREATE FORM
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                  <div>
                    <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs block mb-1">
                      Campaign Editor
                    </span>
                    <h2 className="text-2xl font-black text-gray-900">
                      {editingProject ? `Edit: ${editingProject.title}` : "Create New Campaign"}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsProjectFormOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-8">
                  
                  {/* Grid Layout of parameters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Campaign Title</label>
                      <input
                        type="text"
                        value={projTitle}
                        onChange={(e) => setProjTitle(e.target.value)}
                        placeholder="e.g. Clean drinking water wells"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Campaign Subtitle</label>
                      <input
                        type="text"
                        value={projSubtitle}
                        onChange={(e) => setProjSubtitle(e.target.value)}
                        placeholder="e.g. Solar powered biosand filtration"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                      <select
                        value={projCategory}
                        onChange={(e) => setProjCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      >
                        <option value="Care">Care</option>
                        <option value="Medical">Medical</option>
                        <option value="Nutrition">Nutrition</option>
                        <option value="Water">Water</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Author Name</label>
                      <input
                        type="text"
                        value={projAuthor}
                        onChange={(e) => setProjAuthor(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Target Amount ($)</label>
                      <input
                        type="number"
                        value={projTargetAmount}
                        onChange={(e) => setProjTargetAmount(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                        min="1"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Raised Amount ($)</label>
                      <input
                        type="number"
                        value={projRaisedAmount}
                        onChange={(e) => setProjRaisedAmount(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Location Name</label>
                      <input
                        type="text"
                        value={projLocation}
                        onChange={(e) => setProjLocation(e.target.value)}
                        placeholder="e.g. Mek'ele District Foothills"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Launch Date</label>
                      <input
                        type="text"
                        value={projDate}
                        onChange={(e) => setProjDate(e.target.value)}
                        placeholder="e.g. 15 July, 2026"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  {/* Highlighted option */}
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <input
                      type="checkbox"
                      id="projHighlighted"
                      checked={projHighlighted}
                      onChange={(e) => setProjHighlighted(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <label htmlFor="projHighlighted" className="text-sm text-gray-700 font-bold">
                      Highlight Campaign (Features on top banners and widget selectors)
                    </label>
                  </div>

                  {/* Thumbnail Cover Image & File input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Campaign Cover Image</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <div className="w-24 h-24 rounded-2xl bg-white border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {projImage ? (
                          <img src={projImage} alt="Cover preview" className="w-full h-full object-cover" />
                        ) : (
                          <Upload className="w-8 h-8 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-grow w-full">
                        <input
                          type="text"
                          value={projImage}
                          onChange={(e) => setProjImage(e.target.value)}
                          placeholder="Or paste direct image URL here..."
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 mb-3 bg-white"
                        />
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-emerald-200 inline-flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            Upload JPG/PNG
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "project")}
                              className="hidden"
                            />
                          </label>
                          <span className="text-xs text-gray-400">(Max 2MB. Converted to secure Base64 format)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Short Introduction</label>
                    <textarea
                      rows={3}
                      value={projDescription}
                      onChange={(e) => setProjDescription(e.target.value)}
                      placeholder="Enter primary pitch, goals, or summary details of the campaign..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      required
                    />
                  </div>

                  {/* Story parameters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">The Challenge & Solution Narrative</label>
                      <textarea
                        rows={4}
                        value={projChallengeSolution}
                        onChange={(e) => setProjChallengeSolution(e.target.value)}
                        placeholder="What bottlenecks did you face? How was it resolved?"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Final Outcomes & Impact Results</label>
                      <textarea
                        rows={4}
                        value={projFinalResult}
                        onChange={(e) => setProjFinalResult(e.target.value)}
                        placeholder="What specific quantitative outputs or milestones have been accomplished?"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  {/* Inline quote */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Inspirational Callout Quote</label>
                    <input
                      type="text"
                      value={projQuote}
                      onChange={(e) => setProjQuote(e.target.value)}
                      placeholder="e.g. 'Clean water transforms a settlement's health indicators...'"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Search Tags</label>
                    <input
                      type="text"
                      value={projTags}
                      onChange={(e) => setProjTags(e.target.value)}
                      placeholder="e.g. Solar Well, Pure Water, Filtration (comma-separated)"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                    />
                  </div>

                  {/* Advanced Multi-section block builder */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <ListPlus className="w-4 h-4 text-emerald-600" />
                      Detailed Content Sections ({projContentSections.length})
                    </h3>
                    
                    {projContentSections.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {projContentSections.map((sec, i) => (
                          <div key={i} className="flex justify-between items-start bg-white p-4 rounded-xl border border-gray-150">
                            <div>
                              <strong className="text-sm text-gray-900 block">{sec.title}</strong>
                              <p className="text-xs text-gray-500 mt-1">{sec.paragraph}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeContentSection(i)}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-white p-4 rounded-xl border border-gray-150 space-y-3">
                      <span className="text-xs font-bold text-gray-600 uppercase">Add block:</span>
                      <input
                        type="text"
                        placeholder="Section Title (e.g. Clinical Screen Progress)"
                        value={tempSecTitle}
                        onChange={(e) => setTempSecTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs"
                      />
                      <textarea
                        placeholder="Detailed block text paragraphs..."
                        value={tempSecParagraph}
                        onChange={(e) => setTempSecParagraph(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={addContentSection}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-all"
                      >
                        Append Content Section
                      </button>
                    </div>
                  </div>

                  {/* Save actions */}
                  <div className="flex gap-4 border-t border-gray-100 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Save Campaign
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsProjectFormOpen(false)}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* JOURNALS TAB CONTENT */}
        {activeTab === "blogs" && (
          <div>
            {!isBlogFormOpen ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Registered Journals & Logs</h2>
                    <p className="text-sm text-gray-500">Live editorial papers and regional study documents.</p>
                  </div>
                  <button
                    onClick={openNewBlogForm}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Create Journal
                  </button>
                </div>

                {blogs.length === 0 ? (
                  <div className="text-center py-16 text-gray-400">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-base font-bold text-gray-500">No journal posts found in database.</p>
                    <p className="text-xs text-gray-400 mt-1">Click &quot;Create Journal&quot; to populate your first persistent narrative record.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs font-extrabold text-gray-400 uppercase">
                          <th className="py-4 px-4">Journal Post</th>
                          <th className="py-4 px-4">Category</th>
                          <th className="py-4 px-4">Author</th>
                          <th className="py-4 px-4">Published Date</th>
                          <th className="py-4 px-4">Comments</th>
                          <th className="py-4 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((b) => (
                          <tr key={b.id} className="border-b border-gray-50 last:border-0 text-sm hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4 flex items-center gap-3">
                              <img
                                src={b.image}
                                alt={b.title}
                                className="w-12 h-12 object-cover rounded-xl bg-gray-100"
                              />
                              <span className="font-bold text-gray-950 block max-w-xs truncate">{b.title}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="bg-gray-100 text-gray-700 font-semibold px-2.5 py-1 rounded-lg text-xs">
                                {b.category}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-medium text-gray-700">{b.author}</td>
                            <td className="py-4 px-4 text-gray-500">{b.date}</td>
                            <td className="py-4 px-4 font-bold text-emerald-600">{b.comments ? b.comments.length : 0}</td>
                            <td className="py-4 px-4 text-right">
                              <div className="inline-flex gap-2">
                                <button
                                  onClick={() => startEditBlog(b)}
                                  className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(b.id, b.title)}
                                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              // JOURNAL EDIT / CREATE FORM
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                  <div>
                    <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs block mb-1">
                      Journal Editor
                    </span>
                    <h2 className="text-2xl font-black text-gray-900">
                      {editingBlog ? `Edit: ${editingBlog.title}` : "Create New Journal"}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsBlogFormOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveBlog} className="space-y-8">
                  
                  {/* Grid fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Journal Title</label>
                      <input
                        type="text"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g. School lunch regimes and academic study outcomes"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                      <select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      >
                        <option value="Donation">Donation</option>
                        <option value="Medical Care">Medical Care</option>
                        <option value="Pure Water">Pure Water</option>
                        <option value="Nutrition">Nutrition</option>
                        <option value="Education">Education</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Author Name</label>
                      <input
                        type="text"
                        value={blogAuthor}
                        onChange={(e) => setBlogAuthor(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Publication Date</label>
                      <input
                        type="text"
                        value={blogDate}
                        onChange={(e) => setBlogDate(e.target.value)}
                        placeholder="e.g. 15 July"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      />
                    </div>
                  </div>

                  {/* Thumbnail Cover Image & File input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cover Image</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
                      <div className="w-24 h-24 rounded-2xl bg-white border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {blogImage ? (
                          <img src={blogImage} alt="Cover preview" className="w-full h-full object-cover" />
                        ) : (
                          <Upload className="w-8 h-8 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-grow w-full">
                        <input
                          type="text"
                          value={blogImage}
                          onChange={(e) => setBlogImage(e.target.value)}
                          placeholder="Or paste direct cover image URL..."
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 mb-3 bg-white"
                        />
                        <div className="flex items-center gap-2">
                          <label className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-emerald-200 inline-flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            Upload Cover JPG/PNG
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "blog")}
                              className="hidden"
                            />
                          </label>
                          <span className="text-xs text-gray-400">(Max 2MB. Converted to secure Base64)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Short Abstract / Excerpt</label>
                    <textarea
                      rows={2}
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="Enter a 1-2 sentence quick summary snippet..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                      required
                    />
                  </div>

                  {/* Inline quote */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Callout Quote</label>
                    <textarea
                      rows={2}
                      value={blogQuote}
                      onChange={(e) => setBlogQuote(e.target.value)}
                      placeholder="e.g. 'Empowering women with basic boreholes increases class attendance...'"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tags</label>
                    <input
                      type="text"
                      value={blogTags}
                      onChange={(e) => setBlogTags(e.target.value)}
                      placeholder="e.g. Education, Pure Water, Community (comma-separated)"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50/50"
                    />
                  </div>

                  {/* Multi-paragraph narratives list */}
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      Editorial Narrative Paragraphs ({blogContentParagraphs.length})
                    </h3>
                    
                    {blogContentParagraphs.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {blogContentParagraphs.map((par, i) => (
                          <div key={i} className="flex justify-between items-start bg-white p-4 rounded-xl border border-gray-150">
                            <p className="text-xs text-gray-600 leading-relaxed">Paragraph {i + 1}: {par}</p>
                            <button
                              type="button"
                              onClick={() => removeBlogParagraph(i)}
                              className="p-1.5 text-gray-400 hover:text-red-500 rounded shrink-0 ml-4"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-white p-4 rounded-xl border border-gray-150 space-y-3">
                      <span className="text-xs font-bold text-gray-600 uppercase">Add Paragraph:</span>
                      <textarea
                        placeholder="Type full narrative text block here..."
                        value={tempParagraph}
                        onChange={(e) => setTempParagraph(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-xs"
                        rows={3}
                      />
                      <button
                        type="button"
                        onClick={addBlogParagraph}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-all"
                      >
                        Append Paragraph
                      </button>
                    </div>
                  </div>

                  {/* Save actions */}
                  <div className="flex gap-4 border-t border-gray-100 pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Save Journal
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsBlogFormOpen(false)}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
 
        {/* CONTACT MESSAGES TAB CONTENT */}
        {activeTab === "contacts" && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6" id="admin-contacts-panel">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-900">Inbox Messages</h2>
                <p className="text-sm text-gray-500">Persistent contact queries and messages submitted via the public contact form.</p>
              </div>
              <button
                onClick={fetchContacts}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all"
                id="refresh-contacts-btn"
              >
                Refresh Inbox
              </button>
            </div>

            {isContactsLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4" id="contacts-loading-spinner">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                <p className="text-sm text-gray-500 font-medium">Syncing database messages...</p>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-16 text-gray-400" id="contacts-empty-state">
                <Inbox className="w-12 h-12 mx-auto mb-3 text-gray-300 animate-pulse" />
                <p className="text-base font-bold text-gray-500">Your Inbox is clear.</p>
                <p className="text-xs text-gray-400 mt-1">When visitors submit messages through the contact form, they will appear here in real time.</p>
              </div>
            ) : (
              <div className="space-y-4" id="contacts-list">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    className={`p-6 rounded-2xl border transition-all duration-350 flex flex-col md:flex-row justify-between items-start gap-4 ${
                      !c.read
                        ? "bg-emerald-50/20 border-emerald-200/60 shadow-xs animate-pulse-subtle"
                        : "bg-white border-gray-150 hover:border-gray-300"
                    }`}
                  >
                    <div className="space-y-3 flex-1 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display font-black text-gray-950 text-base">{c.name}</span>
                        <span className="text-xs text-gray-400">&lt;{c.email}&gt;</span>
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-mono">{c.date}</span>
                        {!c.read && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            New
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Subject</span>
                        <p className="font-bold text-gray-900 text-sm">{c.subject || "No Subject"}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Message</span>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-sans bg-gray-50/50 p-4 rounded-xl border border-gray-100">{c.message}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 self-stretch md:self-auto justify-end shrink-0 pt-2 md:pt-0">
                      {!c.read && (
                        <button
                          onClick={() => handleMarkContactRead(c.id)}
                          className="p-2.5 text-emerald-600 hover:text-white hover:bg-emerald-600 bg-emerald-50 rounded-xl transition-all font-semibold text-xs flex items-center gap-1"
                          title="Mark as Read"
                          id={`mark-read-btn-${c.id}`}
                        >
                          <CheckSquare className="w-4 h-4" />
                          <span>Mark Read</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteContact(c.id)}
                        className="p-2.5 text-gray-500 hover:text-white hover:bg-red-600 bg-gray-50 rounded-xl transition-all font-semibold text-xs flex items-center gap-1"
                        title="Delete Message"
                        id={`delete-msg-btn-${c.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
 
       </div>
     </div>
   );
 }