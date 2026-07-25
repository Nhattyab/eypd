import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { campaignsData, eventsData, testimonialsData, blogPostsData, volunteerFaqData } from "./data";
import { Campaign, Event, BlogPost, Project, DetailedBlogPost } from "./types";

// Component imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Values from "./components/Values";
import Services from "./components/Services";
import Causes from "./components/Causes";
import DonationWidget from "./components/DonationWidget";
import StatsCounter from "./components/StatsCounter";
import EventSchedule from "./components/EventSchedule";
import Volunteer from "./components/Volunteer";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import LatestNews from "./components/LatestNews";
import Partners from "./components/Partners";
import Policies from "./components/Policies";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import BackToTop from "./components/BackToTop";
import CheckoutModal from "./components/CheckoutModal";
import AboutPage from "./components/AboutPage";
import ProjectsPage from "./components/ProjectsPage";
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import BlogPage from "./components/BlogPage";
import BlogDetailsPage from "./components/BlogDetailsPage";
import ContactPage from "./components/ContactPage";
import AdminPanel from "./components/AdminPanel";
import PolicyDetailsPage from "./components/PolicyDetailsPage";
import ResourcesPage from "./components/ResourcesPage";
import DonationPage from "./components/DonationPage";
import { policiesData, PolicyItem } from "./data/policiesData";
import { ToastContainer, ToastMessage, ToastType } from "./components/Toast";
import { useMemo } from "react";

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [checkoutCampaign, setCheckoutCampaign] = useState<Campaign | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // States for prefilling the dedicated DonationPage
  const [selectedDonationCampaign, setSelectedDonationCampaign] = useState<{ id?: string; name?: string } | undefined>(undefined);
  const [donationAmountPreset, setDonationAmountPreset] = useState<number | undefined>(undefined);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<DetailedBlogPost | null>(null);
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>("All");

  // Dynamic projects and blogs states backed by SQLite3
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<DetailedBlogPost[]>([]);

  const [currentView, setCurrentViewInternal] = useState<"home" | "about" | "projects" | "project-details" | "blog" | "blog-details" | "contact" | "admin" | "policy-details" | "resources" | "donate">(() => {
    const path = window.location.pathname;
    if (path === "/about") return "about";
    if (path === "/projects") return "projects";
    if (path === "/blog") return "blog";
    if (path === "/contact") return "contact";
    if (path === "/admin") return "admin";
    if (path === "/resources") return "resources";
    if (path === "/donate") return "donate";
    if (path === "/project-details") return "project-details";
    if (path === "/blog-details") return "blog-details";
    if (path === "/policy-details") return "policy-details";
    return "home";
  });

  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(() => {
    const path = window.location.pathname;
    if (path === "/policy-details") {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) {
        return policiesData.find((p) => p.id === id) || policiesData[1];
      }
      return policiesData[1]; // default to youth declaration
    }
    return null;
  });

  const setCurrentView = useCallback((
    view: "home" | "about" | "projects" | "project-details" | "blog" | "blog-details" | "contact" | "admin" | "policy-details" | "resources" | "donate",
    entityId?: string
  ) => {
    setCurrentViewInternal(view);
    if (view === "blog") {
      setSelectedBlogCategory(entityId || "All");
    }
    if (view === "policy-details") {
      const polId = entityId || "policy-2";
      const found = policiesData.find((p) => p.id === polId);
      if (found) setSelectedPolicy(found);
    }
    let path = "/";
    if (view === "about") path = "/about";
    else if (view === "projects") path = "/projects";
    else if (view === "project-details") {
      path = entityId ? `/project-details?id=${entityId}` : "/project-details";
    }
    else if (view === "blog") path = "/blog";
    else if (view === "blog-details") {
      path = entityId ? `/blog-details?id=${entityId}` : "/blog-details";
    }
    else if (view === "contact") path = "/contact";
    else if (view === "admin") path = "/admin";
    else if (view === "resources") path = "/resources";
    else if (view === "donate") path = "/donate";
    else if (view === "policy-details") {
      path = `/policy-details?id=${entityId || "policy-2"}`;
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
  }, []);

  // Synchronize selection with URL when database projects/blogs are loaded or when route changes
  useEffect(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (path === "/project-details" && id && projects.length > 0) {
      const found = projects.find((p) => p.id === id);
      if (found) {
        setSelectedProject(found);
      }
    }
    if (path === "/blog-details" && id && blogs.length > 0) {
      const found = blogs.find((b) => b.id === id);
      if (found) {
        setSelectedBlog(found);
      }
    }
  }, [projects, blogs, currentView]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      if (path === "/about") setCurrentViewInternal("about");
      else if (path === "/projects") setCurrentViewInternal("projects");
      else if (path === "/project-details") {
        setCurrentViewInternal("project-details");
        if (id && projects.length > 0) {
          const found = projects.find((p) => p.id === id);
          if (found) setSelectedProject(found);
        }
      }
      else if (path === "/blog") setCurrentViewInternal("blog");
      else if (path === "/blog-details") {
        setCurrentViewInternal("blog-details");
        if (id && blogs.length > 0) {
          const found = blogs.find((b) => b.id === id);
          if (found) setSelectedBlog(found);
        }
      }
      else if (path === "/contact") setCurrentViewInternal("contact");
      else if (path === "/admin") setCurrentViewInternal("admin");
      else if (path === "/resources") setCurrentViewInternal("resources");
      else if (path === "/donate") setCurrentViewInternal("donate");
      else if (path === "/policy-details") {
        setCurrentViewInternal("policy-details");
        if (id) {
          const found = policiesData.find((p) => p.id === id);
          if (found) setSelectedPolicy(found);
        }
      } else {
        setCurrentViewInternal("home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [projects, blogs]);

  // Sync state with SQLite3 database on mount
  useEffect(() => {
    let active = true;
    async function loadDbData() {
      try {
        const [projRes, blogRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/blogs")
        ]);
        if (projRes.ok && blogRes.ok) {
          const projs = await projRes.json();
          const blgs = await blogRes.json();
          if (active) {
            setProjects(projs);
            setBlogs(blgs);
          }
        }
      } catch (err) {
        console.error("Error loading sqlite data:", err);
      }
    }
    loadDbData();
    return () => {
      active = false;
    };
  }, []);

  const handleUpdateProjects = useCallback(async (updated: Project[]) => {
    setProjects((prevProjects) => {
      // Find deleted projects
      const deleted = prevProjects.filter(p => !updated.some(u => u.id === p.id));
      for (const p of deleted) {
        fetch(`/api/projects/${p.id}`, { method: "DELETE" }).catch(err => console.error("Failed to delete project:", err));
      }

      // Sync creations and updates
      for (const p of updated) {
        fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(p)
        }).catch(err => console.error("Failed to upsert project:", err));
      }
      return updated;
    });
  }, []);

  const handleUpdateBlogs = useCallback(async (updated: DetailedBlogPost[]) => {
    setBlogs((prevBlogs) => {
      // Find deleted blogs
      const deleted = prevBlogs.filter(b => !updated.some(u => u.id === b.id));
      for (const b of deleted) {
        fetch(`/api/blogs/${b.id}`, { method: "DELETE" }).catch(err => console.error("Failed to delete blog:", err));
      }

      // Sync creations and updates
      for (const b of updated) {
        fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(b)
        }).catch(err => console.error("Failed to upsert blog:", err));
      }
      return updated;
    });
  }, []);

  // Map dynamic state arrays to formats expected by static-typed home components
  const homeCampaigns: Campaign[] = useMemo(() => {
    return projects.map((p) => ({
      id: p.id,
      title: p.title,
      image: p.image,
      category: p.category,
      raised: p.raisedAmount,
      goal: p.targetAmount,
      description: p.description
    }));
  }, [projects]);

  const homeBlogPosts: BlogPost[] = useMemo(() => {
    return blogs.map((b) => ({
      id: b.id,
      title: b.title,
      excerpt: b.excerpt,
      date: b.date,
      category: b.category,
      image: b.image,
      author: b.author
    }));
  }, [blogs]);

  // Helper to trigger stylish toasts
  const addToast = useCallback((type: ToastType, title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Auto dismiss toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Smooth scroll handler
  const handleScrollToSection = useCallback((sectionId: string) => {
    const scroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // height of fixed navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        return true;
      }
      return false;
    };

    if (!scroll()) {
      // Retry if the element wasn't found immediately (due to route transitions/animations)
      setTimeout(scroll, 150);
    }
  }, []);

  // Event handlers
  const handleQuickDonateSubmit = useCallback((amount: number, isKidSupport: boolean) => {
    // Map to a suitable prefilled campaign
    if (isKidSupport) {
      setSelectedDonationCampaign({ id: "project-1", name: "Family Survival & Burden Relief" });
    } else {
      setSelectedDonationCampaign({ id: "general", name: "General Peace & Development Fund" });
    }
    setDonationAmountPreset(amount);
    setCurrentView("donate");
    window.scrollTo({ top: 0, behavior: "smooth" });
    addToast(
      "info",
      "Donation Page Loaded",
      `We've initialized your secure donation form with $${amount.toLocaleString()}. Please complete your secure protocol details below.`
    );
  }, [addToast]);

  const handleVolunteerApply = useCallback((data: { name: string; email: string; phone: string; message: string }) => {
    addToast(
      "success",
      "Application Submitted",
      `Welcome to the team, ${data.name}! Your application has been logged. Our outreach lead will email you within 48 hours.`
    );
  }, [addToast]);

  const handleNewsletterSubscribe = useCallback((email: string) => {
    addToast(
      "success",
      "Subscription Successful",
      `Thank you! ${email} has been subscribed to our monthly impact reports and priority campaign logs.`
    );
  }, [addToast]);

  const handleEventRegister = useCallback((evt: Event) => {
    addToast(
      "info",
      "Event Registered",
      `You have requested details for "${evt.title}". An informational schedule and venue access guide have been sent to your contact inbox.`
    );
  }, [addToast]);

  const handleBlogPostRead = useCallback((post: BlogPost) => {
    const detailedBlog = blogs.find(b => b.id === post.id) || blogs[0];
    if (detailedBlog) {
      setSelectedBlog(detailedBlog);
      setCurrentView("blog-details", detailedBlog.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
      addToast(
        "info",
        "Journal Loaded",
        `Displaying "${detailedBlog.title}". Full editorial document and photorealistic community logs are available in our public database.`
      );
    }
  }, [blogs, addToast, setCurrentView]);

  // Open dedicated donation page for a specific campaign card
  const handleOpenCheckout = useCallback((campaign: Campaign) => {
    setSelectedDonationCampaign({ id: campaign.id, name: campaign.title });
    setDonationAmountPreset(undefined);
    setCurrentView("donate");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCheckoutSuccess = useCallback((amount: number, campaignTitle: string) => {
    addToast(
      "success",
      "Payment Successful",
      `Thank you! Sponsoring $${amount.toLocaleString()} for "${campaignTitle}" was processed successfully. Together we protect lives.`
    );
    if (checkoutCampaign) {
      setProjects((prevProjects) => {
        const updated = prevProjects.map((p) => {
          if (p.id === checkoutCampaign.id) {
            const updatedProject = { ...p, raisedAmount: p.raisedAmount + amount };
            // Sync to SQLite
            fetch("/api/projects", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedProject)
            }).catch(err => console.error("Failed to sync checkout donation:", err));
            return updatedProject;
          }
          return p;
        });
        return updated;
      });
    }
  }, [checkoutCampaign, addToast]);

  const handleNavbarJoinClick = useCallback(() => {
    if (currentView !== "home") {
      setCurrentView("home");
      setTimeout(() => {
        handleScrollToSection("volunteer");
      }, 100);
    } else {
      handleScrollToSection("volunteer");
    }
    addToast(
      "info",
      "Join as Volunteer",
      "Please fill out our short volunteer form below to submit your field application."
    );
  }, [currentView, handleScrollToSection, addToast]);

  const handleAboutUsExploreClick = useCallback(() => {
    setCurrentView("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFooterNavigation = useCallback((sectionId: string) => {
    if (sectionId === "about") {
      setCurrentView("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "projects") {
      setCurrentView("projects");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "news" || sectionId === "blog") {
      setCurrentView("blog");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "contact") {
      setCurrentView("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (currentView !== "home") {
        setCurrentView("home");
        setTimeout(() => {
          handleScrollToSection(sectionId);
        }, 100);
      } else {
        handleScrollToSection(sectionId);
      }
    }
  }, [currentView, handleScrollToSection]);

  return (
    <div className="relative min-h-screen bg-Transparent selection:bg-primary/20" id="main-app-container">
      {/* Dynamic Floating Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Checkout modal pop-up */}
      <CheckoutModal
        campaign={checkoutCampaign}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />

      {/* Primary Sticky Header Navigation */}
      {currentView !== "admin" && (
        <Navbar
          onDonateClick={() => {
            setSelectedDonationCampaign(undefined);
            setDonationAmountPreset(undefined);
            setCurrentView("donate");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onNavigate={handleScrollToSection}
          onJoinClick={handleNavbarJoinClick}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      )}

      {/* Main Content Area */}
      <main id="main-sections-wrapper">
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section 1: Hero section */}
              <Hero
                onDonateClick={() => {
                  setSelectedDonationCampaign(undefined);
                  setDonationAmountPreset(undefined);
                  setCurrentView("donate");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onExploreClick={() => {
                  setCurrentView("about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Section 2: About Us section */}
              <AboutUs onExploreClick={handleAboutUsExploreClick} />

              {/* Section 3: Core Pillars & Values Accordions Column Grid */}
              <Values />

              {/* Section 4: Services Grid Section*/}
              <Services />

              {/* Section 5: Projects section */}
              <Causes 
                campaigns={homeCampaigns} 
                onDonateClick={handleOpenCheckout} 
                onViewAllProjects={() => {
                  setCurrentView("projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Section 6: Donation Widget */}
              <section className="py-20 bg-white" id="quick-donation">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <DonationWidget onDonateSubmit={handleQuickDonateSubmit} />
                </div>
              </section>

              {/* Section 7: Stats section */}
              <StatsCounter />

              {/* Section 8: Blog section */}
              <LatestNews 
                posts={homeBlogPosts} 
                onPostClick={handleBlogPostRead} 
                onViewAllNews={() => {
                  setCurrentView("blog");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Section 9: Policies & Documents Grif section*/}
              <Policies 
                onPolicySelect={(policy) => {
                  setSelectedPolicy(policy);
                  setCurrentView("policy-details", policy.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onViewAllResources={() => {
                  setCurrentView("resources");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />

              {/* Section 10: Dedicated Partner Brands section */}
              <Partners />

              {/* Section 11: Call to Action */}
              <CTA 
                onDonateClick={() => {
                  setSelectedDonationCampaign(undefined);
                  setDonationAmountPreset(undefined);
                  setCurrentView("donate");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onPartnerClick={() => handleScrollToSection("contact")}
              />
            </motion.div>
          )}

          {currentView === "about" && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage
                onDonateClick={() => {
                  setSelectedDonationCampaign(undefined);
                  setDonationAmountPreset(undefined);
                  setCurrentView("donate");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onJoinClick={handleNavbarJoinClick}
                onBackToHome={() => setCurrentView("home")}
                campaigns={homeCampaigns}
                onDonateCampaignClick={(campaign) => {
                  if (campaign) {
                    setSelectedDonationCampaign({ id: campaign.id, name: campaign.title });
                  }
                  setDonationAmountPreset(undefined);
                  setCurrentView("donate");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onViewAllProjects={() => {
                  setCurrentView("projects");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onPolicySelect={(policy) => {
                  setSelectedPolicy(policy);
                  setCurrentView("policy-details", policy.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onViewAllResources={() => {
                  setCurrentView("resources");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onQuickDonateSubmit={handleQuickDonateSubmit}
              />
            </motion.div>
          )}

          {currentView === "projects" && (
            <motion.div
              key="projects-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsPage
                projects={projects}
                onDonateClick={(proj) => {
                  if (proj) {
                    setSelectedDonationCampaign({ id: proj.id, name: proj.title });
                  } else {
                    setSelectedDonationCampaign(undefined);
                  }
                  setDonationAmountPreset(undefined);
                  setCurrentView("donate");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onJoinClick={handleNavbarJoinClick}
                onBackToHome={() => setCurrentView("home")}
                onProjectSelect={(proj) => {
                  setSelectedProject(proj);
                  setCurrentView("project-details", proj.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </motion.div>
          )}
 
          {currentView === "project-details" && (
            <motion.div
              key="project-details-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {!selectedProject ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5CB815]"></div>
                  <p className="text-gray-500 font-medium text-sm">Loading Project Details...</p>
                </div>
              ) : (
                <ProjectDetailsPage
                  project={projects.find((p) => p.id === selectedProject.id) || selectedProject}
                  projects={projects}
                  onNavigateToProject={(proj) => {
                    setSelectedProject(proj);
                    setCurrentView("project-details", proj.id);
                    window.scrollTo({ top: 0 });
                  }}
                  onDonateClick={(proj) => {
                    if (proj) {
                      setSelectedDonationCampaign({ id: proj.id, name: proj.title });
                    } else if (selectedProject) {
                      setSelectedDonationCampaign({ id: selectedProject.id, name: selectedProject.title });
                    }
                    setDonationAmountPreset(undefined);
                    setCurrentView("donate");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onBackToHome={() => setCurrentView("home")}
                  onBackToProjects={() => {
                    setCurrentView("projects");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onUpdateProjects={handleUpdateProjects}
                />
              )}
            </motion.div>
          )}
 
          {currentView === "blog" && (
            <motion.div
              key="blog-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BlogPage
                blogs={blogs}
                selectedCategory={selectedBlogCategory}
                onCategoryChange={setSelectedBlogCategory}
                onBlogSelect={(blogItem) => {
                  setSelectedBlog(blogItem);
                  setCurrentView("blog-details", blogItem.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onBackToHome={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </motion.div>
          )}
 
          {currentView === "blog-details" && (
            <motion.div
              key="blog-details-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {!selectedBlog ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5CB815]"></div>
                  <p className="text-gray-500 font-medium text-sm">Loading Journal Details...</p>
                </div>
              ) : (
                <BlogDetailsPage
                  blog={selectedBlog}
                  blogs={blogs}
                  onNavigateToBlog={(blogItem) => {
                    setSelectedBlog(blogItem);
                    setCurrentView("blog-details", blogItem.id);
                    window.scrollTo({ top: 0 });
                  }}
                  onBackToBlogs={() => {
                    setCurrentView("blog");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onBackToHome={() => {
                    setCurrentView("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  addToast={addToast}
                  onUpdateBlogs={handleUpdateBlogs}
                />
              )}
            </motion.div>
          )}

          {currentView === "contact" && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ContactPage
                onBackToHome={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                addToast={addToast}
              />
            </motion.div>
          )}

          {currentView === "resources" && (
            <motion.div
              key="resources-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ResourcesPage
                onPolicySelect={(policy) => {
                  setSelectedPolicy(policy);
                  setCurrentView("policy-details", policy.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onBackToHome={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                addToast={addToast}
              />
            </motion.div>
          )}

          {currentView === "policy-details" && selectedPolicy && (
            <motion.div
              key="policy-details-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <PolicyDetailsPage
                policy={selectedPolicy}
                onBack={() => {
                  setCurrentView("resources");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                addToast={addToast}
              />
            </motion.div>
          )}

          {currentView === "donate" && (
            <motion.div
              key="donate-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DonationPage
                onBackToHome={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                addToast={addToast}
                selectedCampaignName={selectedDonationCampaign?.name}
                selectedCampaignId={selectedDonationCampaign?.id}
                initialAmount={donationAmountPreset}
                onDonationSuccess={async () => {
                  try {
                    const res = await fetch("/api/projects");
                    if (res.ok) {
                      const projs = await res.json();
                      setProjects(projs);
                    }
                  } catch (e) {
                    console.error("Failed to refresh projects after donation:", e);
                  }
                }}
              />
            </motion.div>
          )}

          {currentView === "admin" && (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AdminPanel
                onBackToHome={() => {
                  setCurrentView("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                projects={projects}
                blogs={blogs}
                onUpdateProjects={handleUpdateProjects}
                onUpdateBlogs={handleUpdateBlogs}
                addToast={addToast}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global double-row footer */}
      {currentView !== "admin" && (
        <Footer
          onNewsletterSubmit={handleNewsletterSubscribe}
          onNavigate={handleFooterNavigation}
        />
      )}

      {/* Scroll to Top Floating Button */}
      <BackToTop />
    </div>
  );
}